
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';

import CustomeDialog from '../../component/UI/CustomeDialog';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import { Button } from '../../component/UI';
import colors from '../../templates/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../../images/profile.svg';
import fonts from '../../utility/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Defult_User_Icon from '../../images/user-svgrepo-com.svg';
import Tracking from '../../screens/HomeScreen/Tracking'
import APIName from '../../utility/api/apiName';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import TrackStack from '../../navigation/stack/TrackStack';
import DriverDashboardStack from '../../navigation/stack/DriverDashboardStack';
import NotificaationStack from '../../navigation/stack/NotificaationStack';

import Requested from '../../component/Screens/Home'
import Ongoing from '../../component/Screens/ADD_Post';

import * as RootNavigation from '../../RootNavigation';


const User_Dashboard = props => {
    const Drawer = createDrawerNavigator();
    const [VisibleTab, setVisibleTab] = useState('Requested');
    const [tabname, settabname] = useState('Home');
    const [NotificationVisible, setNotificationVisible] = React.useState(false);
    const [username, setUsername] = useState('');

    const [driver, setdriver] = React.useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            setNotificationVisible(true)
            getStoreData();

            setTimeout(async () => {
                try {
                    const value = await AsyncStorage.getItem('@full_name');
                    setUsername(value)
                } catch (e) {
                    console.log("useFocusEffect is working UserDashboard>>", JSON.stringify(e))
                }
            }, 1000)
        }, [])
    );
    const getfull_name = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@full_name');
            if (retrievedItem !== null) {
                setUsername(retrievedItem)
                return retrievedItem;
            }
            return retrievedItem;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getStoreData = async value => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key');
            if (value !== null) {
                // value previously stored
                console.log("value>>>>>>>>", value);
                if (value == 2) {
                    setdriver(false)

                } else {
                    setdriver(true)
                }
                console.log("value>>>>>>>>", driver);
            } else {

            }
        } catch (e) {
            console.log('Exception>>' + e);
            // error reading value
        }
    };
    const getAccessToken = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@user_id');
            if (retrievedItem !== null) {
                const item = JSON.parse(retrievedItem);
                console.log('getAccessToken', 'Error retrieving data' + item);
                return item;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    // useEffect( async () => {
    //     // const getcall = async () => {
    //         setUsername(await getfull_name());
    //     // }
    //     // getcall();
    // }, []);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await getfull_name();

            // ...
        }
        fetchData();
    }, []);
    const CustomDrawerContent = (props) => {
        return (
            <View>
                <View
                    style={{
                        width: s(90),
                        height: s(85),
                        alignSelf: 'center',
                        marginTop: s(10),

                    }}>
                    {console.log("full name is ", username)}
                    <Image
                        source={require('../../images/user.png')}
                        style={{ height: s(80), width: s(80), alignSelf: 'center', alignContent: 'center' }}
                    />

                </View>
                <Text style={styles.second_contant}>{username}</Text>
                {/* <Text style={styles.email}>xyz@gmail.com</Text> */}
                <TouchableOpacity
                    onPress={() => {
                        try{
                        setVisibleTab('Requested')
                        settabname('Home');
                        props.navigation.closeDrawer()}
                        catch(error){}

                    }}>
                    <View style={{ flexDirection: 'row', margin: s(10) }}>
                        <Image
                            source={require('../../images/home.png')}
                            style={{ tintColor: colors.WHITE_COLOR, height: s(20), width: s(20) }}
                        />
                        <Text style={{ fontFamily: fonts('poppinsMedium'), textAlign: 'center', alignSelf: 'center', color: colors.WHITE_COLOR, marginLeft: s(5) }}>Home </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        console.log("working C");
                        setNotificationVisible(false)
                        // setVisibleTab('startSession')
                        props.navigation.closeDrawer()
                        {
                            driver ?
                                props.navigation.navigate("Tracking")
                                : props.navigation.navigate("DriverDashboardStack")
                        }

                    }}>


                    <View style={{ flexDirection: 'row', margin: s(10) }}>
                        <Image
                            source={require('../../images/account.png')}
                            style={{ tintColor: colors.WHITE_COLOR, height: s(20), width: s(20) }}
                        />
                        <Text style={{ fontFamily: fonts('poppinsMedium'), textAlign: 'center', alignSelf: 'center', color: colors.WHITE_COLOR, marginLeft: s(5) }}>{driver ? 'Tracking' : 'Start Session'}</Text>
                    </View>
                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row', margin: s(10) }}>
                    <Image
                        source={require('../../images/account.png')}
                        style={{ tintColor: colors.WHITE_COLOR, height: s(20), width: s(20) }}
                    />
                    <Text style={{ fontFamily: fonts('poppinsMedium'), textAlign: 'center', alignSelf: 'center', color: colors.WHITE_COLOR, marginLeft: s(5) }}>Profile </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: s(10) }}>
                    <Image
                        source={require('../../images/support.png')}
                        style={{ tintColor: colors.WHITE_COLOR, height: s(20), width: s(20) }}
                    />
                    <Text style={{ fontFamily: fonts('poppinsMedium'), textAlign: 'center', alignSelf: 'center', color: colors.WHITE_COLOR, marginLeft: s(5) }}>Support </Text>
                </View> */}
                <View style={{ flexDirection: 'row', margin: s(10) }}>
                    <Image
                        source={require('../../images/compliant.png')}
                        style={{ tintColor: colors.WHITE_COLOR, height: s(20), width: s(20) }}
                    />
                    <Text style={{ fontFamily: fonts('poppinsMedium'), textAlign: 'center', alignSelf: 'center', color: colors.WHITE_COLOR, marginLeft: s(5) }}>Privacy Policy </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.closeDrawer()
                        setModalVisible(true)
                    }}>
                    <View style={{ flexDirection: 'row', margin: s(10) }}>
                        <Image
                            source={require('../../images/power-off.png')}
                            style={{ tintColor: colors.WHITE_COLOR, height: s(20), width: s(20) }}
                        />
                        <Text style={{ fontFamily: fonts('poppinsMedium'), textAlign: 'center', alignSelf: 'center', color: colors.WHITE_COLOR, marginLeft: s(5) }}>Logout </Text>
                    </View>
                </TouchableOpacity>
            </View>



        );
    }
    const clearAsyncStorage = async () => {
        console.log('clearAsyncStorage');

        try {
            console.log('try is working');
            // await AsyncStorage.clear();
            await AsyncStorage.removeItem('@storage_Key');
            AsyncStorage.clear()
            console.log('try after  working');
            setModalVisible(false);
            RootNavigation.resetRoot('Unauthorized', { screen: 'Login' });
            // RootNavigation.navigate('Unauthorized', { screen: 'Login' });
        } catch (e) {
            console.log('async clear error', e);
        }
    };

    const HomeScreen = (props) => {
        if (VisibleTab == 'Requested' || VisibleTab == 'ongoing' || VisibleTab == 'Completed') {
            { setNotificationVisible(true) }
            return (

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    {RenderTab()}

                    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <View style={{ backgroundColor: 'transparent', height: s(40), flexDirection: 'row', position: 'absolute', bottom: 0, width: '100%' }}>
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', marginRight: s(2), marginTop: s(2) }}
                                onPress={() => {
                                    console.log("working A");
                                    setVisibleTab('Requested')
                                    settabname('Home');
                                }}>
                                <View style={{ flex: 1, justifyContent: 'center', marginRight: s(2) }}>
                                    {VisibleTab == 'Requested' ?
                                        <View style={{ width: '100%', height: s(2), backgroundColor: colors.PRIMARY_COLOR }} /> : null}

                                    <View style={{ height: s(40), justifyContent: 'center' }}>
                                        {VisibleTab == 'Requested' ?
                                            <Image
                                                source={require('../../images/home_slected.png')}
                                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(16), width: s(16), alignSelf: 'center' }}
                                            /> : <Image
                                                source={require('../../images/home.png')}
                                                style={{ tintColor: colors.SECONDARY_TEXT_COLOR, height: s(16), width: s(16), alignSelf: 'center' }}
                                            />}
                                        {VisibleTab == 'Requested' ?
                                            <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: fonts('poppinsSemibold'), fontSize: s(10), color: colors.PRIMARY_COLOR }}>Home</Text>
                                            : <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: fonts('poppinsSemibold'), fontSize: s(10), color: colors.SECONDARY_TEXT_COLOR }}>Home</Text>
                                        }
                                    </View>


                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', marginRight: s(2) }}
                                onPress={() => {
                                    console.log("working B");
                                    setVisibleTab('ongoing')
                                    settabname('Add Post');
                                    // props.navigation.navigate("Tracking")
                                }}>
                                <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: s(5) }}>
                                    {VisibleTab == 'ongoing' ?
                                        <View style={{ width: '100%', height: s(2), backgroundColor: colors.PRIMARY_COLOR }} /> : null}
                                    <View style={{ height: s(40), justifyContent: 'center' }}>
                                        {VisibleTab == 'ongoing' ?
                                            <Image
                                                source={require('../../images/more.png')}
                                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(16), width: s(16), alignSelf: 'center' }}
                                            /> : <Image
                                                source={require('../../images/more.png')}
                                                style={{ tintColor: colors.SECONDARY_TEXT_COLOR, height: s(16), width: s(16), alignSelf: 'center' }}
                                            />}
                                        {VisibleTab == 'ongoing' ?
                                            <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: fonts('poppinsSemibold'), fontSize: s(10), color: colors.PRIMARY_COLOR }}>Add Post</Text>
                                            : <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: fonts('poppinsSemibold'), fontSize: s(10), color: colors.SECONDARY_TEXT_COLOR }}>Add Post</Text>
                                        }
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', marginRight: s(2) }}
                                onPress={() => {
                                    console.log("working C");
                                    setVisibleTab('Completed')
                                    settabname('Community');
                                }}>
                                <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: s(5) }}>
                                    {VisibleTab == 'Completed' ?
                                        <View style={{ width: '100%', height: s(2), backgroundColor: colors.PRIMARY_COLOR }} /> : null}
                                    <View style={{ height: s(40), justifyContent: 'center' }}>
                                        {VisibleTab == 'Completed' ?
                                            <Image
                                                source={require('../../images/community.png')}
                                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(16), width: s(16), alignSelf: 'center' }}
                                            /> : <Image
                                                source={require('../../images/community.png')}
                                                style={{ tintColor: colors.SECONDARY_TEXT_COLOR, height: s(16), width: s(16), alignSelf: 'center' }}
                                            />}
                                        {VisibleTab == 'Completed' ?
                                            <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: fonts('poppinsSemibold'), fontSize: s(10), color: colors.PRIMARY_COLOR }}>Community</Text>
                                            : <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: fonts('poppinsSemibold'), fontSize: s(10), color: colors.SECONDARY_TEXT_COLOR }}>Community</Text>
                                        }
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <CustomeDialog
                        visible={modalVisible}
                        visibleFun={() => setModalVisible(!modalVisible)}
                        title="Logout"
                        sub_title="Are you sure .you want to logout?"
                        myCallback={(paramOne, paramTwo) => {
                            console.log('paramOne', paramOne);
                            setModalVisible(false);
                            clearAsyncStorage();
                        }}
                    />


                </View>

            )

        }
        else {
            return <Tracking {...props}

            />
        }
    }
    RenderTab = () => {
        if (VisibleTab == 'Requested') {
            return <Requested {...props}

            />
        }
        else if (VisibleTab == 'ongoing') {
            return <Ongoing {...props}

            />
        }
        // } else if (VisibleTab == 'Completed') {
        //   return <Completed {...props}
        //     searchText={searchText}
        //   />
        // }
    }
    const NotificationsScreen = ({ navigation }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>NotificationsScreen Screen</Text>
                <Button onPress={() => navigation.goBack()} title="Go back home" />
            </View>
        );
    }
    const MyDrawer = () => {
        return (

            <>
                <Drawer.Navigator

                    screenOptions={{
                        drawerStyle: {
                            backgroundColor: colors.PRIMARY_COLOR,

                        },
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen name={tabname}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Image
                                    source={require('../../images/home.png')}
                                    style={[styles.icon, { tintColor: colors.WHITE_COLOR }]}
                                />
                            )
                        }}
                        component={HomeScreen} />


                    <Drawer.Screen
                        name="Tracking"
                        component={TrackStack}
                        options={{ headerShown: false }}
                    />
                    <Drawer.Screen
                        name="DriverDashboardStack"
                        component={DriverDashboardStack}
                        options={{ headerShown: false }}
                    />


                </Drawer.Navigator>
                {NotificationVisible && driver ?
                    <View style={{ position: 'absolute', top: 0, right: 0, margin: s(15) }}>
                        <TouchableOpacity
                            onPress={() => {

                                props.navigation.navigate("NotificationStack")
                            }}>
                            <Image
                                source={require('../../images/bell.png')}
                                style={[styles.icon, { tintColor: colors.TEXT_COLOR }]}
                            />
                        </TouchableOpacity>
                    </View> : null}
            </>
        );
    }

    return (

        <NavigationContainer independent={true}

        >
            <MyDrawer />


        </NavigationContainer>




    );
};
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: colors.TEXT_COLOR,
    },
    container: {
        flex: 1,
        flexGrow: 1,

    },
    drawercontainer: {
        flex: 1,
        backgroundColor: colors.RED,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        zIndex: 0, width: s(50)
    },

    FlexGrowOne: {
        flexGrow: 1
    },
    FlexOne: {
        flex: 1
    },

    forgot_password: {
        fontSize: s(12),
        color: colors.TEXT_COLOR,
        textAlign: 'left',
        marginRight: s(20),
        marginTop: s(5),
        alignSelf: 'flex-end',
        fontFamily: fonts('poppinsMedium'),
    },

    sectionTitle: {
        fontSize: s(12),
        color: colors.TEXT_COLOR,
        fontFamily: fonts('poppinsRegular'),
        alignContent: 'center',
        margin: s(20),
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10
    },
    Title: {
        fontSize: s(20),
        color: colors.TEXT_COLOR,
        fontFamily: fonts('poppinsSemibold'),
        textAlign: 'left',
        marginLeft: s(20),
        marginTop: s(20),
        alignSelf: 'center',
    },

    button: {
        height: s(40),
        width: s(120),
        alignItems: 'center',
        textAlign: 'center',
        padding: s(7),
        borderRadius: s(5),
        backgroundColor: colors.PRIMARY_COLOR,
        fontSize: s(12),
        margin: s(20),
        alignContent: 'center',
        alignSelf: 'center',
        fontFamily: fonts('poppinsBold'),
    },
    text: {
        fontSize: s(14),
        color: colors.WHITE_COLOR,
    },
    navBar: {
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0,
        shadowColor: colors.Black_COLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 1,
    },
    input: {
        flex: 4,
        padding: s(10),
        fontSize: s(15),
        marginLeft: s(10),
        marginRight: s(10),
        borderColor: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsRegular'),
    },
    input_second: {
        padding: s(10),
        fontSize: s(15),
        fontFamily: fonts('poppinsRegular'),
        flex: 1,
        justifyContent: 'center',
    },

    label: {
        fontFamily: fonts('poppinsRegular'),
        fontSize: 12,
    },
    second_contant: {
        fontSize: s(13),
        color: colors.WHITE_COLOR,
        marginTop: s(10),
        fontFamily: fonts('poppinsMedium'),
        alignSelf: 'center',
    },
    email: {
        fontSize: s(10),
        color: colors.WHITE_COLOR,
        alignSelf: 'center',
        fontFamily: fonts('poppinsMedium'),
    },
});

export default User_Dashboard;

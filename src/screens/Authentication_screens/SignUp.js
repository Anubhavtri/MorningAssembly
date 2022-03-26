
import React, { useState, useEffect } from 'react';

import {
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    SafeAreaViewBase,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import { Button } from '../../component/UI';
import colors from '../../templates/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import APIName from '../../utility/api/apiName';
import NetworkUtils from '../../utility/apiAuth/NetworkUtils';
import loginRequest from '../../utility/apiAuth/tokenClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import fonts from '../../utility/fonts';
import GetLocation from 'react-native-get-location';
import SchoollistDialog from '../../component/UI/SchoollistDialog';
import SchoolVehiclelistDialog from '../../component/UI/SchoolVehicleDialog';

const SignUp = props => {
    const [getloader, setloader] = useState(false);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [bus_no, setBus_no] = useState('Bus No.');
    const [school_code, setSchool_Code] = useState('School Code');
    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
    const [DeviceToken, setDeviceToken] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [schoollist, setschoollist] = React.useState([]);
    const [vehiclelist, setvehiclelist] = React.useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVehicleVisible, setModalVehicleVisible] = useState(false);



    useEffect(() => {
        console.log('This will login!');
        school_list();
        getCurrentLocation();
        checkFirebaseToken();

    }, []);

    const checkFirebaseToken = async () => {
        try {
            const regToken = await messaging().getToken();
            console.log('token!-------------', regToken);
            setDeviceToken(regToken);
            StoreDeviceToken(regToken);
            return regToken;
        } catch (error) {
            console.log('error-------------', error);
        }
    };
    const loginHandler = async () => {
        if (!(await NetworkUtils.isNetworkAvailable())) {
            setloader(false);
            notifyMessage(
                'No Internet Connection! You are offline please check your internet connection',
            );
            return;
        } else {
            /* this.showLoader(); */
            var data = {
                name: name,
                mobileNo: mobile,
                password: password,
                role: props?.route?.params?.type,
                bus_number: bus_no,
                school_code: school_code,
                device_token: DeviceToken,
                platform: Platform.OS,
                lat: lat,
                long: long,
            };
            console.log('request', '' + JSON.stringify(data));
            const lient = await loginRequest();
            lient
                .post(APIName.register, data)
                .then(response => {

                    try {
                        console.log('Response data from axios', JSON.stringify(response.data));
                        setloader(false);
                        storeData(props?.route?.params?.type);
                        storeUserData(response.data.data.id, response.data.data.school_code, response.data.data.bus_number, response.data.data.access_token);
                        notifyMessage('Successfully SignUp !');
                        // props.navigation.navigate('OTP', { name: 'Jane 123456789' })
                        props.navigation.replace('Authorized', { name: 'Jane 123456789' })
                        //props.navigation.replace('Authorized', { name: 'Jane 123456789' });
                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    setloader(false);
                    //getData();
                    /*   props.navigation.navigate('Dashboard', { name: 'Jane 123456789' }); */
                })
                .catch(error => {
                    setloader(false);
                    console.log('Response >>', JSON.stringify(error.response));

                    notifyMessage('' + error?.response?.data?.message);
                });
        }
    };

    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                setlat(location.latitude);
                setlong(location.longitude);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    const school_list = async () => {
        try {
            // const client = await loggedInClient();
            const client = await loginRequest();
            console.log('APIName.drivers>>', APIName.schools);
            client
                .get(APIName.schools)
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data.data;
                        setloader(false);
                        try {
                            setloader(false)
                            console.log('Response data from compitancy_list' + JSON.stringify(data));
                            setschoollist(data);
                        } catch (error) {
                            console.log('Exception' + error.test);
                            setloader(false)
                        }

                        setloader(false);
                    } else {
                        setloader(false);
                    }

                })
                .catch(error => {
                    console.log('error' + error);
                    setloader(false);
                });
        } catch (error) {
            console.log("catch is working >>>>", JSON.stringify(error));
            setloader(false);
        }
    };
    const bus_list = async (id) => {
        try {
            // const client = await loggedInClient();
            const client = await loginRequest();
            console.log('APIName.drivers>>', APIName.school_vehicals+'?school_id='+id);
            client.get(APIName.school_vehicals+'?school_id='+id)
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data.data;
                        setloader(false);
                        try {
                            setloader(false)
                            console.log('Response data from bus_list' + JSON.stringify(data));
                            setvehiclelist(data);
                        } catch (error) {
                            console.log('Exception' + error.test);
                            setloader(false)
                        }

                        setloader(false);
                    } else {
                        setloader(false);
                    }

                })
                .catch(error => {
                    console.log('error' + error);
                    setloader(false);
                });
        } catch (error) {
            console.log("catch is working >>>>", JSON.stringify(error));
            setloader(false);
        }
    };
    // //
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.FlexGrowOne}
            >

                <ScrollView contentContainerStyle={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flex: 1 }}>



                        <Image
                            style={{
                                resizeMode: 'stretch',
                                height: '30%', width: '100%',
                                backgroundColor: 'transparent',

                            }}
                            source={require('../../images/logo.png')} />
                        <Text style={styles.Title}>
                            Sign Up
                        </Text>

                        <View style={{ flexDirection: 'row', margin: s(10) }}>

                            <View style={{ borderTopLeftRadius: s(5), borderBottomLeftRadius: s(5), borderTopRightRadius: s(5), borderBottomRightRadius: s(5), borderWidth: s(0.5), borderLeftWidth: s(0.5), borderColor: colors.WHITE_COLOR, flex: 4 }}>
                                <TextInput
                                    theme={{ colors: { primary: colors.WHITE_COLOR } }}
                                    style={styles.input}
                                    placeholder='Name'
                                    placeholderTextColor={colors.WHITE_COLOR}
                                    fontFamily={fonts('poppinsRegular')}
                                    mode="outlined"
                                    returnKeyType={'next'}
                                    outlineColor={colors.WHITE_COLOR}
                                    selectionColor='transparent'
                                    underlineColor='transparent'
                                    underlineColorAndroid='transparent'
                                    value={name}
                                    onChangeText={text => setName(text)}
                                    keyboardType="text"


                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', margin: s(10) }}>

                            <View style={{ borderTopLeftRadius: s(5), borderBottomLeftRadius: s(5), borderTopRightRadius: s(5), borderBottomRightRadius: s(5), borderWidth: s(0.5), borderLeftWidth: s(0.5), borderColor: colors.WHITE_COLOR, flex: 4 }}>
                                <TextInput
                                    theme={{ colors: { primary: colors.WHITE_COLOR } }}
                                    style={styles.input}
                                    placeholder='Enter Mobile Number'
                                    placeholderTextColor={colors.WHITE_COLOR}
                                    fontFamily={fonts('poppinsRegular')}
                                    mode="outlined"
                                    returnKeyType={'next'}
                                    outlineColor={colors.WHITE_COLOR}
                                    selectionColor='transparent'
                                    underlineColor='transparent'
                                    underlineColorAndroid='transparent'
                                    value={mobile}
                                    onChangeText={text => setMobile(text)}
                                    keyboardType="numeric"


                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', margin: s(10) }}>

                            <View style={{ borderTopLeftRadius: s(5), borderBottomLeftRadius: s(5), borderTopRightRadius: s(5), borderBottomRightRadius: s(5), borderWidth: s(0.5), borderLeftWidth: s(0.5), borderColor: colors.WHITE_COLOR, flex: 4 }}>
                                <TextInput
                                    theme={{ colors: { primary: colors.WHITE_COLOR } }}
                                    style={styles.input}
                                    placeholder='Password'
                                    placeholderTextColor={colors.WHITE_COLOR}
                                    fontFamily={fonts('poppinsRegular')}
                                    mode="outlined"
                                    password={true}
                                    secureTextEntry={hidePass ? true : false}
                                    returnKeyType={'next'}
                                    outlineColor={colors.WHITE_COLOR}
                                    selectionColor='transparent'
                                    underlineColor='transparent'
                                    underlineColorAndroid='transparent'
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    keyboardType="text"


                                />
                            </View>

                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    justifyContent: 'center',
                                    flex: 1

                                }}>
                                {hidePass == true ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log('click');
                                            setHidePass(false);
                                        }}>
                                        <View style={{ height: s(50), width: s(40), alignSelf: 'center', justifyContent: 'center' }}>
                                            {/* <Disable_eye_Icon
                                                style={{ marginRight: s(20), marginTop: s(5), alignSelf: 'center', alignContent: 'center' }}

                                            /> */}

                                            <Image
                                                style={{
                                                    height: s(20), width: s(30),
                                                    marginRight: s(20), marginTop: s(5), alignSelf: 'center', alignContent: 'center'
                                                }}
                                                source={require('../../images/Active_eye_icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log('click');
                                            setHidePass(true);
                                        }}>
                                        <View style={{ height: s(50), width: s(40), alignSelf: 'center', justifyContent: 'center' }}>

                                            {/* <Active_eye_Icon
                                                style={{ marginRight: s(20), marginTop: s(5), alignSelf: 'center', alignContent: 'center' }}

                                            /> */}
                                            <Image
                                                style={{
                                                    height: s(20), width: s(30), marginRight: s(20), marginTop: s(5),
                                                    alignSelf: 'center', alignContent: 'center'
                                                }}

                                                source={require('../../images/Disable_eye_icon.png')} />

                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', margin: s(10) }}>

                            <View style={{ borderTopLeftRadius: s(5), borderBottomLeftRadius: s(5), borderTopRightRadius: s(5), borderBottomRightRadius: s(5), borderWidth: s(0.5), borderLeftWidth: s(0.5), borderColor: colors.WHITE_COLOR, flex: 4 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisible(true)
                                    }}>
                                    <Text
                                        theme={{ colors: { primary: colors.WHITE_COLOR } }}
                                        style={styles.input}
                                        placeholder='School Code'
                                        placeholderTextColor={colors.WHITE_COLOR}
                                        fontFamily={fonts('poppinsRegular')}
                                        mode="outlined"
                                        returnKeyType={'done'}
                                        outlineColor={colors.WHITE_COLOR}
                                        selectionColor='transparent'
                                        underlineColor='transparent'
                                        underlineColorAndroid='transparent'
                                        value={school_code}
                                        onChangeText={text => setSchool_Code(text)}
                                        keyboardType="text"


                                    >{school_code}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', margin: s(10) }}>

                            <View style={{ borderTopLeftRadius: s(5), borderBottomLeftRadius: s(5), borderTopRightRadius: s(5), borderBottomRightRadius: s(5), borderWidth: s(0.5), borderLeftWidth: s(0.5), borderColor: colors.WHITE_COLOR, flex: 4 }}>
                            <TouchableOpacity
                                    onPress={() => {
                                        setModalVehicleVisible(true)
                                    }}>
                                <Text
                                    theme={{ colors: { primary: colors.WHITE_COLOR } }}
                                    style={styles.input}
                                    placeholder='Bus No.'
                                    placeholderTextColor={colors.WHITE_COLOR}
                                    fontFamily={fonts('poppinsRegular')}
                                    mode="outlined"
                                    returnKeyType={'next'}
                                    outlineColor={colors.WHITE_COLOR}
                                    selectionColor='transparent'
                                    underlineColor='transparent'
                                    underlineColorAndroid='transparent'
                                    value={bus_no}
                                    onChangeText={text => setBus_no(text)}
                                    keyboardType="text"


                                >{bus_no}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>




                        <Button
                            title={'Sign Up'}
                            onPress={() => {
                                console.log('Login_button+++');
                                //props.navigation.navigate('OTP', { name: 'Jane 123456789' })


                                if (name == '') {
                                    notifyMessage('This field is not Empty !');
                                } else if (mobile == '' || mobile.length != 10) {
                                    notifyMessage('Incorrect Mobile Number !');
                                } else if (password == '') {
                                    notifyMessage('This field is not Empty !');
                                } else if (bus_no == '' || bus_no == 'Bus No.') {
                                    notifyMessage('This field is not Empty !');
                                } else if (school_code == '' || school_code == 'School Code') {
                                    notifyMessage('This field is not Empty !');
                                }
                                else {
                                    console.log('if is not working');
                                    // notifyMessage('field is not Empty !')

                                    //ErrorMessage.notifyMessage(Constant.app_name)
                                    setloader(true);
                                    loginHandler();

                                }

                            }}
                        />

                    </View>
                </ScrollView>
                <Spinner
                    visible={getloader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </KeyboardAvoidingView>
            <SchoollistDialog
                visible={modalVisible}
                visibleFun={() => setModalVisible(!modalVisible)}
                title="School List"
                sub_title="Please select any one "
                data={schoollist}
                myCallback={(paramOne, paramTwo) => {
                    console.log('paramOne', paramOne+"<><><"+paramTwo);
                    setSchool_Code(paramOne);
                    setBus_no('Bus No.');
                    setModalVisible(false);
                    bus_list(paramTwo);
                    // clearAsyncStorage();
                }}
            />
            <SchoolVehiclelistDialog
                visible={modalVehicleVisible}
                visibleFun={() => setModalVehicleVisible(!modalVehicleVisible)}
                title="Vehicle List"
                sub_title="Please select any one "
                data={vehiclelist}
                myCallback={(paramOne, paramTwo) => {
                    console.log('paramOne', paramOne+"<><><"+paramTwo);
                    setBus_no(paramOne);
                    setModalVehicleVisible(false);
                  
                    // clearAsyncStorage();
                }}
            />
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: colors.WHITE_COLOR,
    },
    container: {
        flex: 1,
        backgroundColor: colors.SECONDARY_COLOR


    },

    FlexGrowOne: {
        flexGrow: 1,
        backgroundColor: colors.WHITE_COLOR,
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
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsRegular'),
        alignContent: 'center',
        margin: s(20),
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    Title: {
        fontSize: s(20),
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsBold'),
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
    FlexGrowOne: {
        flexGrow: 1
    },
    FlexOne: {
        flex: 1
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

        padding: s(10),
        fontSize: s(13),
        marginRight: s(10),
        fontFamily: fonts('poppinsRegular'),
        color: colors.WHITE_COLOR,

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
});
function notifyMessage(msg) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        alert(msg);
    }
}

const storeData = async value => {
    try {
        await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
        // saving error
    }
};
const storeUserData = async (value, School_code, Bus_no, Storage_Key) => {
    try {
        await AsyncStorage.setItem('@user_id', value);
        await AsyncStorage.setItem('@school_code', School_code);
        await AsyncStorage.setItem('@bus_no', Bus_no);
        await AsyncStorage.setItem('@access_token', 'Bearer ' + Storage_Key);

    } catch (e) {
        // saving error
    }
};
const StoreDeviceToken = async token => {
    try {
        //const jsonValue = JSON.stringify(token);
        console.log('StoreDeviceToken>>', token);
        await AsyncStorage.setItem('@deviceToken', token);
        console.log('StoreDeviceToken>> after store', token);
    } catch (e) {
        // saving error
        console.log('error>>>', JSON.stringify(e));
    }
};
export default SignUp;

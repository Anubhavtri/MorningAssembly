import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
    SafeAreaView,
    Platform,
    RefreshControl,
    Alert,
    Image,
} from 'react-native';

import { s } from 'react-native-size-matters';

import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
const Home = props => {
    const [getloader, setloader] = useState(false);
    const [latestskills_response, setlatestskills_response] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'ddfdf',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        
       
    ];

    const RenderImage = (index) => {
        if (index == 0) {
            return <Image
                source={require('../../images/1.jpg')}
                style={{ height: s(205), width: '100%', }}
            />
        }
        else if (index == 1) {
            return <Image
            source={require('../../images/2.jpg')}
            style={{ height: s(205), width: '100%', }}
        />
        } else if (index == 2) {
            return <Image
            source={require('../../images/3.jpg')}
            style={{ height: s(205), width: '100%', }}
        />
        }else if (index == 3) {
            return <Image
            source={require('../../images/4.jpg')}
            style={{ height: s(205), width: '100%', }}
        />
        }else if (index == 4) {
            return <Image
            source={require('../../images/5.jpg')}
            style={{ height: s(205), width: '100%', }}
        />
        }else if (index == 5) {
            return <Image
            source={require('../../images/6.jpg')}
            style={{ height: s(205), width: '100%', }}
        />
        }else  {
            return <Image
            source={require('../../images/image_one.jpeg')}
            style={{ height: s(205), width: '100%', }}
        /> 
        }

    }

    const renderItem_requested_skill = (item, index, props1) => {
        { console.log('renderItem_requested_skill>>', index) }
        return (
            <TouchableOpacity
                onPress={() =>
                    console.log("dkljfkldjkfj")

                }>
                <View
                    style={{
                        backgroundColor: colors.WHITE_COLOR,
                        borderRadius: s(8),

                        margin: s(5),
                        elevation: s(3),
                        marginBottom: s(10)
                    }}>
                    <View style={{ flexDirection: 'row', padding: s(5), }}>
                        <View
                            style={{
                                width: s(25),
                                height: s(25),
                                marginTop: s(5),

                            }}>
                            <Image
                                source={require('../../images/user.png')}
                                style={{ height: s(25), width: s(25), }}
                            />

                        </View>
                        <View style={{ marginTop: s(1), marginLeft: s(5), flex: 4 }}>
                            <Text style={styles.title}>Lorem ipsum</Text>
                            <Text style={styles.input_type}>11 mintues ago</Text>
                        </View>
                        <Image
                            source={require('../../images/dots.png')}
                            style={{ height: s(20), width: s(20), justifyContent: 'center', alignSelf: 'center' }}
                        />
                    </View>
                    {/* <Image
                            source={require('../../images/image_one.jpeg')}
                            style={{ height: s(205), width: '100%', }}
                        /> */}
                    {RenderImage(index)}

                    <View style={{ flexDirection: 'row', flex: 1, height: s(40) }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/love.png')}
                                style={{ height: s(20), width: s(20), }}
                            />
                            <Text style={{ marginLeft: s(5) }}>1 Likes</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/chat.png')}
                                style={{ height: s(20), width: s(20), }}
                            />
                            <Text style={{ marginLeft: s(5) }}>0 Comments</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/share.png')}
                                style={{ height: s(20), width: s(20), }}
                            />
                            <Text style={{ marginLeft: s(5) }}>Share</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );

    };



    useFocusEffect(
        React.useCallback(() => {
            console.log("first is runing useFocusEffect")


        }, [])
    );

    const onRefresh = React.useCallback(() => {

        wait(1500).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    return (
        <>

            <View style={{ flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.Defult_WHITE_COLOR : colors.WHITE_COLOR, margin: s(10), paddingBottom: s(3), width: '100%', marginBottom: s(40) }}>
                <FlatList
                    style={{ paddingBottom: s(80), margin: s(3) }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={DATA}
                    renderItem={({ item, index }) => {
                        return renderItem_requested_skill(item, index, props);

                    }

                    }
                    refreshControl={
                        <RefreshControl
                            tintColor={colors.PRIMARY_COLOR}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                {/* { latestskills_response?.length > 0 && getloader==false? null : (
                    getloader == false?
                    <Text
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            fontSize: s(20),
                            flex: 1,
                            fontFamily: fonts('poppinsMedium'),
                        }}>
                        No Data Found !
                    </Text>:null
                )} */}
                <Spinner
                    visible={getloader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>

        </>
    );
}
const styles = StyleSheet.create({
    main_cantainer: {
        marginLeft: s(10),
        marginRight: s(10),

        marginTop: s(10),

    },
    FlexOne: {
        flex: 1
    },
    title: {
        fontSize: s(12),
        color: colors.TEXT_COLOR,
        fontFamily: fonts('poppinsSemibold')
    },
    second_contant: {
        fontSize: s(13),
        color: colors.WHITE_COLOR,
        margin: s(10),
        fontFamily: fonts('poppinsSemibold'),
    },
    email: {
        fontSize: s(10),
        color: colors.WHITE_COLOR,
        marginLeft: s(10),
    },
    total_skill: {
        marginTop: s(15),
        marginLeft: s(10),
        marginRight: s(10),
        marginBottom: s(10),
        backgroundColor: colors.SECONDARY_COLOR,
        padding: s(10),
        borderRadius: s(5),
    },
    total_skill_title: {
        color: colors.PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: s(10),
        marginBottom: s(5),
    },
    total_skill_contant: {
        color: colors.PRIMARY_COLOR,
        fontSize: s(9),
        marginLeft: s(10),
        fontWeight: 'bold',
    },
    input_type: {
        color: colors.SECONDARY_TEXT_COLOR,
        fontSize: s(8),
        fontFamily: fonts('poppinsMedium'),


    },
    top_background: {
        height: (Platform.OS === 'ios') ? s(185) : s(155),
        width: '100%',
        position: 'absolute',
        borderBottomLeftRadius: s(20),
        borderBottomRightRadius: s(20),
        backgroundColor: colors.PRIMARY_COLOR,

    },
});

export default Home;
import React, { useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
    Alert,
    Image,
    ImageBackground,
    Platform,
    TextInput,
    SafeAreaView,
    SafeAreaViewBase,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import { Button } from '../../component/UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginRequest from '../../utility/apiAuth/tokenClient';

import { ms, mvs, s, vs } from 'react-native-size-matters';
import fonts from '../../utility/fonts';
import Notify from '../../images/back.svg';
import colors from '../../templates/colors';
import * as RootNavigation from '../../RootNavigation';
import NetworkUtils from '../../utility/apiAuth/NetworkUtils';
import apiName from '../../utility/api/apiName';


const OtpVerification = props => {
    const [text, setText] = useState();
    const [driver, setdriver] = React.useState(false);
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const [firstOtp, setfirstOtp] = useState('');
    const [secondOtp, setsecondOtp] = useState('');
    const [thirdOtp, setthirdOtp] = useState('');
    const [forthOtp, setforthOtp] = useState('');
    const [getloader, setloader] = useState(false);


    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working compitancylist>>")
            getStoreData();
        }, [])
    );
    const storeData = async value => {
        try {
            await AsyncStorage.setItem('@storage_Key', value);
        } catch (e) {
            // saving error
        }
    };
    const storeUserData = async (value, School_code, Bus_no, Storage_Key, full_name) => {
        try {
            await AsyncStorage.setItem('@user_id', value);
            await AsyncStorage.setItem('@school_code', School_code);
            await AsyncStorage.setItem('@bus_no', Bus_no);
            await AsyncStorage.setItem('@access_token', 'Bearer ' + Storage_Key);
            await AsyncStorage.setItem('@full_name', full_name);
    
        } catch (e) {
            // saving error
        }
    };

    const loginWithOtpHandler = async () => {
        if (!(await NetworkUtils.isNetworkAvailable())) {
            setloader(false);
            notifyMessage(
                'No Internet Connection! You are offline please check your internet connection',
            );
            return;
        } else {
            var data = {
                mobileNo: props?.route?.params?.mobile,
                login_otp: firstOtp + secondOtp + thirdOtp + forthOtp,

            };
            console.log('request', '' + JSON.stringify(data));
            const lient = await loginRequest();
            lient
                .post(apiName.verify_otp, data)
                .then(response => {
                    console.log('Response data from axios OTP' + JSON.stringify(response));
                    setloader(false);
                    try {
                    
                        storeUserData(response.data.data.id, response.data.data.school_code, response.data.data.bus_number, response.data.data.access_token, response.data.data.full_name);
                     
                        notifyMessage('OTP verified Successfully!');
                        // props.navigation.replace('Authorized', { name: 'Jane 123456789' })
                        props.navigation.replace('Authorized', { name: 'Jane 123456789' })

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    
                    //getData();
                    /*   props.navigation.navigate('Dashboard', { name: 'Jane 123456789' }); */
                })
                .catch(error => {
                    setloader(false);
                    console.log('Response ' + JSON.stringify(error.response.data));
                    console.log('Response ' + JSON.stringify(error.response.data.status));
                    console.log(
                        'Interceptor Error>>',
                        JSON.stringify(error.response.data.message),
                    );
                    notifyMessage('' + error?.response?.data?.message);
                });
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
    return (
        <>

            <SafeAreaView style={styles.container}>
                <Image
                    style={{
                        resizeMode: 'stretch',
                        height: '30%', width: '100%',
                        backgroundColor: 'transparent',

                    }}
                    source={require('../../images/logo.png')} />

                <Text style={styles.sectionTitle}>We have sent an OTP to your Mobile Number</Text>



                <View style={styles.row}>
                    <TextInput style={styles.inputcvv} maxLength={1}
                        returnKeyType={'next'}
                        keyboardType="numeric"
                        onChangeText={text =>{ setfirstOtp(text)
                            ref_input2.current.focus()}}
                        onSubmitEditing={() => ref_input2.current.focus()} />

                    <TextInput style={styles.inputcvv} maxLength={1}
                        returnKeyType={'next'}
                        keyboardType="numeric"
                        onSubmitEditing={() => ref_input3.current.focus()}
                        onChangeText={text => {setsecondOtp(text)
                            ref_input3.current.focus()}}
                        ref={ref_input2} />

                    <TextInput style={styles.inputcvv} maxLength={1}
                        returnKeyType={'next'}
                        keyboardType="numeric"
                        onSubmitEditing={() => ref_input4.current.focus()}
                        onChangeText={text => {setthirdOtp(text)
                            ref_input4.current.focus()}}
                        ref={ref_input3} />

                    <TextInput style={styles.inputcvv} maxLength={1}
                        returnKeyType={'done'}
                        keyboardType="numeric"
                        onChangeText={text => setforthOtp(text)}
                        ref={ref_input4} />
                </View>
                <Button
                    title={'Confirm'}
                    onPress={() => {
                        console.log('Login_button+++');
                        if (firstOtp != '' && secondOtp != '' && thirdOtp != '' && forthOtp != '') {
                            loginWithOtpHandler();
                        } else {
                            notifyMessage('Please Enter Valide OTP !');
                        }
                        // // if (driver) {
                        //     props.navigation.replace('Authorized', { name: 'Jane 123456789' })
                        // // } else {
                        // //     props.navigation.replace('Authorized', {screen: 'DriverDashboardStack'});

                        // // }
                    }}
                />

                {getloader ?
                    <Spinner
                        visible={true}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    /> : null}


            </SafeAreaView>

        </>
    );
    function notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            alert(msg);
        }
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY_TEXT_COLOR
    },

    top: {
        position: 'absolute',
        top: 0,
        margin: s(20),
    },
    sectionTitle: {
        fontSize: s(12),
        color: colors.WHITE_COLOR,
        //fontFamily: fonts('poppinsSemibold'),
        alignContent: 'center',
        margin: s(20),
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    Title: {
        fontSize: s(16),
        color: colors.PRIMARY_COLOR,
        //fontFamily: fonts('poppinsSemibold'),
        textAlign: 'center',
        marginLeft: s(20),
        marginTop: s(20),
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    resend: {
        fontSize: s(10),
        color: colors.PRIMARY_COLOR,
        //fontFamily: fonts('poppinsSemibold'),
        textAlign: 'center',
        marginBottom: s(20),
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    before_resend: {
        fontSize: s(10),
        color: colors.DARK_GRAY,
        textAlign: 'center',
        marginLeft: s(20),
        marginBottom: s(20),
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    forgot: {
        fontSize: s(12),
        color: '#FE5F55',
        fontFamily: fonts('poppinsRegular'),
        textAlign: 'left',
        marginRight: s(20),
        marginTop: s(20),
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: colors.THIRD_DOT,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },

    button: {
        height: s(40),
        width: s(120),
        alignItems: 'center',
        textAlign: 'center',
        padding: s(7),
        marginTop: s(10),
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(20),
        alignContent: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: s(14),
        color: '#fff',
    },

    input: {
        width: 50,
        height: 50,
        padding: s(10),
        fontSize: s(15),
        marginLeft: s(10),
        marginRight: s(10),
        marginTop: s(10),
        borderColor: colors.Gray_COLOR,
        borderWidth: s(5),
        backgroundColor: colors.Gray_COLOR,
        color: colors.PRIMARY_TEXT_COLOR,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        marginLeft: s(10),
        marginRight: s(10),
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%'
    },

    inputcvv: {
        flex: 1,
        fontSize: s(14),
        color: colors.PRIMARY_TEXT_COLOR,
        borderColor: colors.SECONDARY_TEXT_COLOR,
        borderWidth: s(1),
        backgroundColor: colors.Gray_COLOR,
        borderRadius: s(5),
        margin: s(5),
        textAlign: 'center',
        padding: s(5),
        height: s(50),
    },
});
export default OtpVerification;

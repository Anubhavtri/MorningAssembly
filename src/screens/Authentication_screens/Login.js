
import React, { useState, useEffect, useRef } from 'react';

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
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Login = props => {
    const [getloader, setloader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [DeviceToken, setDeviceToken] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const ref_input2 = useRef();
    useEffect(() => {
        console.log('This will login!');

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
    const loginHandler = async (mobile) => {
        if (!(await NetworkUtils.isNetworkAvailable())) {
            setloader(false);
            notifyMessage(
                'No Internet Connection! You are offline please check your internet connection',
            );
            return;
        } else {
            /* this.showLoader(); */
            var data = {
                mobileNo: mobile,
                password: password,
                role: props?.route?.params?.type,
                device_token: DeviceToken,
                platform: Platform.OS
            };
            console.log('request', '' + JSON.stringify(data));
            const lient = await loginRequest();
            lient
                .post(APIName.login, data)
                .then(response => {
                    console.log('Response data from axios' + JSON.stringify(response));
                    try {
                        setloader(false);
                         storeData(props?.route?.params?.type);
                        // storeUserData(response.data.data.id, response.data.data.school_code, response.data.data.bus_number, response.data.data.access_token, response.data.data.full_name);
                        // 
                        notifyMessage('Successfully SignIn !');
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

    const loginWithOtpHandler = async (mobile) => {
        if (!(await NetworkUtils.isNetworkAvailable())) {
            setloader(false);
            notifyMessage(
                'No Internet Connection! You are offline please check your internet connection',
            );
            return;
        } else {
            /* this.showLoader(); */
            var data = {
                mobileNo: mobile,
                // password: password,
                role: props?.route?.params?.type,
                device_token: DeviceToken,
                platform: Platform.OS
            };
            console.log('request', '' + JSON.stringify(data));
            const lient = await loginRequest();
            lient
                .post(APIName.login_with_otp, data)
                .then(response => {
                    console.log('Response data from axios' + JSON.stringify(response));
                    try {
                        setloader(false);
                        storeData(props?.route?.params?.type);
                        storeUserData(response.data.data.id, response.data.data.school_code, response.data.data.bus_number, response.data.data.access_token, response.data.data.full_name);
                        //props.navigation.navigate('OTP', { name: 'Jane 123456789' })
                        notifyMessage('Successfully SignIn !');
                       // props.navigation.replace('Authorized', { name: 'Jane 123456789' })
                       props.navigation.navigate('OTP', { type: props?.route?.params?.type,mobile:mobile,
                       })

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    setloader(false);
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

    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                console.log(location.latitude);
                console.log(location.longitude);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    // //
    return (

        <View style={styles.container}>
            <Image
                style={{
                    margin: s(50),
                    height: s(150),
                    backgroundColor: 'transparent',
                    alignContent: 'center',
                    alignSelf: 'center',
                    resizeMode: 'contain'
                }}
                source={require('../../images/logo.png')} />
            <Text style={styles.Title}>
                Welcome!
            </Text>
            <Text style={styles.sectionTitle}>
                Enter your mobile number to get {'\n'} Verification code
            </Text>

            <View style={{ flexDirection: 'row', margin: s(10) }}>
                <View style={{ flex: 1, backgroundColor: colors.PRIMARY_COLOR, justifyContent: 'center', borderTopLeftRadius: s(5), borderBottomLeftRadius: s(5), borderWidth: s(0.5) }}>
                    <Text style={{ fontFamily: fonts('poppinsMedium'), alignSelf: 'center', textAlign: 'center', justifyContent: 'center', color: colors.WHITE_COLOR, padding: s(10) }}>+91</Text>
                </View>


                <View style={{ borderTopRightRadius: s(5), borderBottomRightRadius: s(5), borderWidth: s(0.5), borderLeftWidth: 0, borderColor: colors.WHITE_COLOR, flex: 4 }}>
                    <TextInput
                        theme={{ colors: { primary: colors.WHITE_COLOR } }}
                        style={styles.input}
                        placeholder='Enter Mobile Number'
                        placeholderTextColor={colors.WHITE_COLOR}
                        fontFamily={fonts('poppinsRegular')}
                        mode="outlined"
                        multiline={true}
                        returnKeyType={'done'}
                        outlineColor={colors.WHITE_COLOR}
                        selectionColor='transparent'
                        underlineColor='transparent'
                        underlineColorAndroid='transparent'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="numeric"
                       // onSubmitEditing={() => ref_input2.current.focus()}

                    />
                </View>

            </View>
            {/* <View style={{ flexDirection: 'row', margin: s(10) }}>

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
                        returnKeyType={'done'}
                        outlineColor={colors.WHITE_COLOR}
                        selectionColor='transparent'
                        underlineColor='transparent'
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        keyboardType="text"
                        ref={ref_input2}

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

                                <Image
                                    style={{
                                        height: s(20), width: s(30), tintColor: Colors.PRIMARY_COLOR,
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
            </View> */}

            {/* <View style={styles.sign_up_view}>
                <Text style={styles.sign_up}>Don't have an account ?</Text>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('SignUp', { type: props?.route?.params?.type })
                    }}>
                    <Text style={{ color: colors.WHITE_COLOR, fontSize: s(12), fontFamily: fonts('poppinsBold'), }}>Sign Up</Text>
                </TouchableOpacity>
            </View> */}



            {getloader ?
                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                /> : null}
            <Button
                title={'Login'}
                onPress={() => {
                    console.log('Login_button+++');
                    //props.navigation.navigate('OTP', { name: 'Jane 123456789' })


                    if (email != '' && email.length == 10) {
                        setloader(true);
                        //loginHandler(email);
                        loginWithOtpHandler(email);
                    } else {
                        console.log('if is not working');
                        // notifyMessage('field is not Empty !')
                        notifyMessage('Incorrect Mobile Number !');
                        //ErrorMessage.notifyMessage(Constant.app_name)

                    }

                }}
            />

        </View>

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
    sign_up: {
        fontSize: s(12),
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsBold'),
        textAlign: 'left',
        alignSelf: 'flex-end',
        marginRight: s(5)
    },
    sign_up_view: {
        fontSize: s(12),
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsBold'),
        textAlign: 'left',
        alignSelf: 'flex-end',
        marginRight: s(20),
        flexDirection: 'row',
        marginTop: s(10),
        marginBottom: s(10)
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
const StoreDeviceToken = async token => {
    try {
        //const jsonValue = JSON.stringify(token);
        await AsyncStorage.setItem('@deviceToken', token);
    } catch (e) {
        // saving error
        console.log('error>>>', JSON.stringify(e));
    }
};
export default Login;

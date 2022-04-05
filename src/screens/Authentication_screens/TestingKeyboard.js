
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

const TestingKeyboard = props => {

    return (

        <View style={styles.container}>

<KeyboardAccessoryView alwaysVisible={true} androidAdjustResize>
          {({ isKeyboardVisible }) => (
            <View style={styles.textInputView}>
              <TextInput
                placeholder="Write your message"
                underlineColorAndroid="transparent"
                style={styles.textInput}
                multiline={true}
              />
              {/* {isKeyboardVisible && (
                <Button
                  style={styles.textInputButton}
                  title="Send"
                  onPress={() => {}}
                />
              )} */}
            </View>
          )}
        </KeyboardAccessoryView>
        </View>

    );
};
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: colors.WHITE_COLOR,
    },
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR


    },

    FlexGrowOne: {
        flexGrow: 1
    },
    FlexOne: {
        flex: 1
    },
    textInputView: {
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      textInput: {
        flexGrow: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCC",
        padding: 10,
        fontSize: 16,
        marginRight: 10,
        textAlignVertical: "top",
        color:"red"
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
export default TestingKeyboard;

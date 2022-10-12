/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../templates/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../utility/fonts';
import PushNotification from 'react-native-push-notification';
const Splash = props => {
  useEffect(() => {
    console.log('This will run every seconddfdfsdfdsfdsfsf!');
    createChannel();
    setTimeout(async () => {
      //this.setState({timePassed: true});
      console.log('This will run every seconddfdfsdfdsfdsfsf!');
      // props1.navigation.navigate('Login', { name: 'Jane 123456789' })
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          console.log('if is working' + value);
          props.navigation.replace('Authorized', { name: 'Jane 123456789' });


        } else {
          console.log('else is working ');
          //  props.navigation.replace('SelectType', { name: 'Jane 123456789' });
          props.navigation.replace('Login', { Type: '2' });

        }
      } catch (e) {
        console.log('Exception>>' + e);
        // error reading value
      }
    }, (Platform.OS === 'ios') ? 0 : 2000);

  }, []);

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'sncq-Local-Notification', // (required)
        channelName: 'Local Notification channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      },
      created => console.log(`createChannel     returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  return (
    <>
      {/*  <StatusBar barStyle="dark-content" /> */}
      <StatusBar backgroundColor="#ADD8E6" barStyle="light-content" />
      <View style={styles.container}>
        {(Platform.OS === 'ios') ? null :

          <Image
            style={{
              height: s(150),
              backgroundColor: 'transparent',
              alignContent: 'center',
              alignSelf: 'center',
              resizeMode: 'contain'
            }}
            source={require('../images/logo.png')} />}


      </View>
    </>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.WHITE_COLOR
  },
  text_input: {
    fontSize: s(20),
    color: colors.PRIMARY_COLOR,
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: fonts('poppinsSemibold'),
  },
});
const setInterval1 = async props1 => {
  setTimeout(
    async () => {
      //this.setState({timePassed: true});
      console.log('This will run every seconddfdfsdfdsfdsfsf!');
      // props1.navigation.navigate('Login', { name: 'Jane 123456789' })
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          console.log('token>fggfgfdkgkfdldfdfdfgklf>' + value);
          props1.navigation.navigate('Authorized', { name: 'Jane 123456789' });
        } else {
          console.log('else is working ');
          props1.navigation.navigate('Login', { name: 'Jane 123456789' });
        }
      } catch (e) {
        console.log('Exception>>' + e);
        // error reading value
      }
    },

    2000,
  );
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
export default Splash;

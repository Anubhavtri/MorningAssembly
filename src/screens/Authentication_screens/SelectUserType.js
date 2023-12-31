import React, { useEffect } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../../utility/fonts';
import { Button } from '../../component/UI';

const SelectUserType = props => {
  useEffect(() => {
    console.log('This will run every seconddfdfsdfdsfdsfsf!');

    setTimeout(async () => {
      //this.setState({timePassed: true});
      console.log('This will run every seconddfdfsdfdsfdsfsf!');
      // props1.navigation.navigate('Login', { name: 'Jane 123456789' })
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // value previously stored
          console.log('if is working' + value);
          //  props.navigation.replace('Authorized', {name: 'Jane 123456789'});
        } else {
          console.log('else is working ');
          //   props.navigation.replace('Login', {name: 'Jane 123456789'});
        }
      } catch (e) {
        console.log('Exception>>' + e);
        // error reading value
      }
    }, (Platform.OS === 'ios') ? 0 : 2000);

  }, []);


  return (
    <>
      {/*  <StatusBar barStyle="dark-content" /> */}
      <StatusBar backgroundColor={colors.PRIMARY_COLOR} barStyle="light-content" />
      <View style={styles.container}>
        <Image
          style={{
            margin:s(50),
            height: s(150),
            backgroundColor: 'transparent',
            alignContent: 'center',
            alignSelf: 'center',
            resizeMode: 'contain'
          }}
          source={require('../../images/logo.png')} />
        <View style={{ alignSelf: 'center', width: '100%', justifyContent: 'center', marginTop: s(50) }}>
          <Text style={{ fontFamily: fonts('poppinsSemibold'), color: colors.PRIMARY_COLOR, fontSize: s(14), alignSelf: 'center', textAlign: 'center' }}>Select User Type</Text>
          <Button
            title={'Manegment/School'}
            onPress={() => {
              console.log('Login_button+++');
              props.navigation.navigate('Login', { type: '3' });
            }}
          />
          <Button
            title={'Parent'}
            onPress={() => {
              console.log('Login_button+++');
              props.navigation.navigate('Login', { type: '1' });
            }}
          />


        </View>

      </View>
    </>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.TEXT_COLOR
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
export default SelectUserType;
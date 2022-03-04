import React, { useState } from 'react';
import {

  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import Notify from '../../images/alert_icon.svg';
import colors from '../../templates/colors';
import { Button } from '../../component/UI';
import fonts from '../../utility/fonts';
import Modal from 'react-native-modal';
const CustomeDialog = ({ visible, visibleFun, myCallback, title, sub_title }) => {
  const [text, setText] = useState('');
  console.log
  return (

    <Modal
      style={{ margin: 0 }}
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        visibleFun();
        // myCallback('Gaurav')
      }}>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#00000080',
          width: '100%'
        }}>

        <View
          style={{ alignContent: 'center', alignItems: 'center', margin: s(20) }}>
          <View style={styles.toolbar}>
            <Text style={styles.Title}>{title || 'Confirm'}</Text>
            <Text style={styles.Sub_Title}>
              {sub_title ||
                `Are you sure you want ${'\n'} to send this skill to be assigned to your account?`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                
              }}>
                <View style={{}}></View>
              <TouchableOpacity
                onPress={() => {
                  console.log('only check');
                  visibleFun();
                }}>
                <View style={styles.button}>
                  <Text
                    style={{
                      color: colors.PRIMARY_COLOR,
                      fontFamily: fonts('poppinsSemibold'),
                    }}>
                    {'Cancel'}
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {
                  console.log('only check');
                  myCallback('Gaurav');
                }}>
                <View style={styles.button_confirm}>
                  <Text
                    style={{
                      color: colors.WHITE_COLOR,
                      fontFamily: fonts('poppinsSemibold'),
                    }}>
                    {'Confirm'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: s(60),
              height: s(60),
              borderRadius: s(30),
              backgroundColor: colors.WHITE_COLOR,
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              marginTop: s(10),
            }}>
              {sub_title.includes('stop session')?<Image
                            source={require('../../images/warning.png')}
                            style={{  height: s(40), width: s(40),alignSelf:'center' }}
                        />:
              <Image
                            source={require('../../images/power-off.png')}
                            style={{ tintColor: colors.PRIMARY_COLOR, height: s(24), width: s(24),alignSelf:'center' }}
                        />
          }
            {/* <Notify style={{ alignSelf: 'center' }}></Notify> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000080',


  },
  toolbar: {
    backgroundColor: colors.WHITE_COLOR,
    padding: s(10),
    marginTop: s(40),
    marginLeft: s(50),
    marginRight: s(50),
    borderRadius: s(10),
  },

  sectionTitle: {
    fontSize: s(12),
    color: colors.PRIMARY_TEXT_COLOR,
    //fontFamily: fonts('poppinsSemibold'),
    alignContent: 'center',
    margin: s(20),
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  Title: {
    fontSize: s(15),
    color: colors.PRIMARY_COLOR,
    fontFamily: fonts('poppinsSemibold'),
    textAlign: 'center',
    alignSelf: 'center',

    marginTop: s(20),
  },
  Sub_Title: {
    fontSize: s(11),
    color: colors.SECONDARY_TEXT_COLOR,

    marginLeft: s(20),
    marginRight: s(20),
    padding: s(5),
    textAlign: 'center',
    fontFamily: fonts('poppinsMedium'),
  },
  Small_Title: {
    fontSize: s(8),
    color: colors.PRIMARY_COLOR,
    //fontFamily: fonts('poppinsSemibold'),
    margin: s(5),
  },
  button: {
    textAlign: 'center',
    alignContent: 'center',
    height: s(40),
    width: s(120),
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: s(5),
    backgroundColor: colors.WHITE_COLOR,
    borderRadius: s(20),
    fontSize: s(12),

    alignContent: 'center',
    alignSelf: 'center',
  },
  button_confirm: {
    textAlign: 'center',
    alignContent: 'center',
    height: s(40),
    width: s(120),
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: s(5),
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: s(20),
    fontSize: s(12),
    color:colors.WHITE_COLOR,
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default CustomeDialog;

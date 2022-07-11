import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable,Text} from 'react-native';



import Modal from 'react-native-modal';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';

import { ms, mvs, s, vs } from 'react-native-size-matters';


const BottomSheet = ({ visible, visibleFun, myCallback, title, data }) =>  {
//   const {isLoading, location, selectedProfession, selectedSkills} = useSelector(
//     professionalSelectors,
//   );

  
 

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
            
              {`Are you sure you want ${'\n'} to send this skill to be assigned to your account?`}
          </Text>
          {/* <View
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
          </View> */}
        </View>

        
      </View>
    </View>
  </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  _sheet_radius: {
    flexDirection: 'row',
    backgroundColor: colors.bottom_sheet_bg,
    padding: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  _sheet_title: {
    color: colors.primary,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: fonts('poppinsMedium'),
  },
});

export default BottomSheet;

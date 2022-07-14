import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput } from 'react-native';



import Modal from 'react-native-modal';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';

import { ms, mvs, s, vs } from 'react-native-size-matters';


const BottomSheet = ({ visible, visibleFun, myCallback, title, data }) => {
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
          // justifyContent: 'center',
          backgroundColor: colors.WHITE_COLOR,
          width: '100%'
        }}>

        <View
          style={{ alignContent: 'center', alignItems: 'center', margin: s(20) }}>
          <Text style={styles.Title}>{'Comments'}</Text>
        </View>
        
        <View style={{ position: 'absolute', bottom: 0,width:'100%' }}>
          
          <TextInput
                        theme={{ colors: { primary: colors.PRIMARY_TEXT_COLOR } }}
                        style={styles.input}
                        placeholder='Enter your comments'
                        placeholderTextColor={colors.PRIMARY_TEXT_COLOR}
                        fontFamily={fonts('poppinsRegular')}
                        mode="outlined"
                        multiline={true}
                        returnKeyType={'done'}
                        outlineColor={colors.WHITE_COLOR}
                        selectionColor='transparent'
                        underlineColor='transparent'
                        underlineColorAndroid='transparent'
                        //value={email}
                       // onChangeText={text => setEmail(text)}
                        
                       

                    />
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
  Title: {
    color: colors.PRIMARY_TEXT_COLOR,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: fonts('poppinsSemibold'),
  },
  input: {

    padding: s(10),
    fontSize: s(13),
    marginRight: s(10),
    fontFamily: fonts('poppinsRegular'),
    color: colors.PRIMARY_TEXT_COLOR,
    backgroundColor:'#00000050',
    borderRadius:s(25),
    paddingStart:s(20)

},
});

export default BottomSheet;

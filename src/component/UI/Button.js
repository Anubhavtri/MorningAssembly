import React from 'react';
import {TouchableOpacity, View, StyleSheet, Pressable} from 'react-native';
import colors from '../../templates/colors';
import {Text} from './index';
import {ms, mvs, s, vs} from 'react-native-size-matters';
import fonts from '../../utility/fonts';
const ButtonComponent = props => {
  //  console.log("props", "" + props.onPress)
  //  console.log("props", "" + props.title)
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.button,
        {backgroundColor: props.bgColor || colors.PRIMARY_COLOR,fontFamily: fonts('poppinsSemibold')},
      ]}>
      <Text bgColor={props.bgColor || colors.WHITE_COLOR} title={props.title} />
    </TouchableOpacity>
  );
};
export default ButtonComponent;
const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    alignContent: 'center',
    height: s(40),
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: s(20),
    fontSize: s(12),
    margin: s(10),
    alignSelf: 'center',
    fontFamily: fonts('poppinsSemibold'),
  },
});

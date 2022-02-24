import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import colors from '../../templates/colors';
import CustomStatusBar from '../../component/UI/CustomeStatusBar';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
const Container = props => {
  return <SafeAreaProvider style={styles.container} {...props} />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR,
  },
});
export default Container;

import {Platform} from 'react-native';
const fonts = {
  poppinsSemibold: {
    ios: 'Poppins-SemiBold',
    android: 'Poppins-SemiBold',
  },
  poppinsMedium: {
    ios: 'Poppins-Medium',
    android: 'Poppins-Medium',
  },
  poppinsBold: {
    android: 'Poppins-Bold',
    ios: 'Poppins-Bold',
  },
  poppinsRegular: {
    android: 'Poppins-Regular',
    ios: 'Poppins-Regular',
  },
};

export default font => {
  return fonts[font][Platform.OS];
};

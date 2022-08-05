import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Pressable, Text, TextInput, FlatList, TouchableOpacity, Image, Platform, ToastAndroid, Alert } from 'react-native';


import Spinner from 'react-native-loading-spinner-overlay';

import Modal from 'react-native-modal';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';

import { ms, mvs, s, vs } from 'react-native-size-matters';
import NetworkUtils from '../../utility/apiAuth/NetworkUtils';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import APIName from '../../utility/api/apiName';


const BottomSheet = ({ visible, visibleFun, myCallback, title, data, feed_id ,confirmation}) => {
  const [getloader, setloader] = useState(false);
  const [comment, setComment] = useState('');
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert(msg);
    }
  }
  const addComment = async () => {
    if (!(await NetworkUtils.isNetworkAvailable())) {
      setloader(false);
      notifyMessage(
        'No Internet Connection! You are offline please check your internet connection',
      );
      return;
    } else {
      /* this.showLoader(); */
      var data = {
        feedId: feed_id,
        comment: comment,
      };
      console.log('request', '' + JSON.stringify(data));
      const lient = await loggedInClient();
      lient
        .post(APIName.comment, data)
        .then(response => {
          console.log('Response data from axios' + JSON.stringify(response));
          try {
            setloader(false);
            setComment('')
            notifyMessage('Comment Successfully Submitted !');
            myCallback("ddkjfkdjfj");

          } catch (error) {
            console.log('Exception' + error.test);
          }

          setloader(false);
          //getData();
          /*   props.navigation.navigate('Dashboard', { name: 'Jane 123456789' }); */
        })
        .catch(error => {
          setloader(false);
          notifyMessage('getting some error');
        });
    }
  };
  const renderItem_requested_skill = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>{
          console.log("dkljfkldjkfj")
          confirmation(item?._id);
        }
        }>
        <View
          style={{
            backgroundColor: colors.WHITE_COLOR,
            borderRadius: s(8),

            margin: s(5),
            elevation: s(3),
            marginBottom: s(10)
          }}>
          <View style={{ flexDirection: 'row', padding: s(5), }}>
            <View
              style={{
                width: s(25),
                height: s(25),
                marginTop: s(5),

              }}>
              <Image
                source={require('../../images/user.png')}
                style={{ height: s(20), width: s(20), }}
              />

            </View>
            <View style={{ marginTop: s(1), marginLeft: s(5), flex: 4 }}>
              <Text style={styles.title}>{item?.userId?.full_name}</Text>
              <Text style={styles.input_type}>{item?.comment}</Text>
            </View>

          </View>






        </View>
      </TouchableOpacity>
    );

  };



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
          style={{ alignContent: 'center', alignItems: 'center', margin: s(20), flexDirection: 'row' }}>
          <Text style={{
            color: colors.PRIMARY_TEXT_COLOR,
            fontSize: 16,
            alignSelf: 'center',
            fontFamily: fonts('poppinsSemibold'),
            flex: 4, textAlign: 'center'
          }}>{'Comments'}</Text>
          <TouchableOpacity
            onPress={() => {
              console.log("dkljfkldjkfj");
              visibleFun();
            }}>
            <Image
              source={require('../../images/close.png')}
              style={{ height: s(16), width: s(16), alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginBottom: s(60), margin: s(3) }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => {
            return renderItem_requested_skill(item, index);

          }

          }

        />
        <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', margin: s(10), alignContent: 'center' }}>

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
            value={comment}
            onChangeText={text => setComment(text)}
          />
          <TouchableOpacity
            onPress={() => {
              console.log("dkljfkldjkfj");
              setloader(true);
              addComment();
            }}>
            <Image
              source={require('../../images/send.png')}
              style={{ height: s(35), width: s(35), alignSelf: 'center', marginTop: s(10) }}
            />
          </TouchableOpacity>
        </View>
        {getloader ?
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          /> : null}
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
    width: '80%',
    padding: s(10),
    fontSize: s(13),
    marginRight: s(10),
    fontFamily: fonts('poppinsRegular'),
    color: colors.PRIMARY_TEXT_COLOR,
    backgroundColor: '#00000050',
    borderRadius: s(25),
    paddingStart: s(20)

  },
  input_type: {
    color: colors.SECONDARY_TEXT_COLOR,
    fontSize: s(12),
    fontFamily: fonts('poppinsMedium'),


  },
  title: {
    fontSize: s(10),
    color: colors.TEXT_COLOR,
    fontFamily: fonts('poppinsSemibold')
  },
});

export default BottomSheet;


import React, { useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

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


import fonts from '../../utility/fonts';

const AddPost = props => {
    const [getloader, setloader] = useState(false);
    const [competencies_list, setcompetencies_list] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working compitancylist>>")


        }, [])
    );


    return (

        <View style={styles.container}>
            <View style={styles.toolbar}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();


                    }}>
                    <Image
                        source={require('../../images/left.png')}
                        style={{ tintColor: colors.WHITE_COLOR, height: s(24), width: s(24) }}
                    />
                </TouchableOpacity>
                <Text style={styles.Title}>Start Post</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: s(10) }}>
                <View
                    style={{
                        width: s(25),
                        height: s(25),
                        marginTop: s(5),

                    }}>
                    <Image
                        source={require('../../images/user.png')}
                        style={{ height: s(25), width: s(25), }}
                    />

                </View>
                <View style={{ marginTop: s(1), marginLeft: s(5), flex: 4, justifyContent: 'center' }}>
                    <Text style={styles.title}>Lorem ipsum</Text>

                </View>

            </View>
            <TextInput
                theme={{ colors: { primary: colors.WHITE_COLOR } }}
                style={styles.input}
                placeholder='What do you want to talk about?'
                placeholderTextColor={colors.Gray_COLOR}
                fontFamily={fonts('poppinsRegular')}
                mode="outlined"
                returnKeyType={'done'}
                outlineColor={colors.WHITE_COLOR}
                selectionColor='transparent'
                underlineColor='transparent'
                underlineColorAndroid='transparent'
                keyboardType="text"
            />
            <Image
                source={{
                    uri: `data:image/jpeg;base64,${props?.route?.params?.Image_Path}`,
                }}
                style={{ height: s(205), width: '100%', }}
            />
            <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: s(10),marginTop:s(10) }}>
                <Image
                    source={require('../../images/image-gallery.png')}
                    style={{ height: s(24), width: s(24), }}
                />
                <Text style={{
                    alignItems: 'center', alignSelf: 'center', marginLeft: s(10), color: colors.TEXT_COLOR,
                    fontFamily: fonts('poppinsSemibold'),
                }}>Add Photo</Text>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: s(10),marginTop:s(5) }}>
                <Image
                    source={require('../../images/tag.png')}
                    style={{ height: s(20), width: s(20), }}
                />
                <Text style={{
                    alignItems: 'center', alignSelf: 'center', marginLeft: s(10), color: colors.TEXT_COLOR,
                    fontFamily: fonts('poppinsSemibold'),
                }}>Tag People</Text>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: s(10),marginTop:s(5) }}>
                <Image
                    source={require('../../images/placeholder.png')}
                    style={{ height: s(20), width: s(20), }}
                />
                <Text style={{
                    alignItems: 'center', alignSelf: 'center', marginLeft: s(10), color: colors.TEXT_COLOR,
                    fontFamily: fonts('poppinsSemibold'),
                }}>Add a location</Text>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: s(10),marginTop:s(5) }}>
                <Image
                    source={require('../../images/sad.png')}
                    style={{ height: s(20), width: s(20), }}
                />
                <Text style={{
                    alignItems: 'center', alignSelf: 'center', marginLeft: s(10), color: colors.TEXT_COLOR,
                    fontFamily: fonts('poppinsSemibold'),
                }}>Feeling / Activity</Text>
            </View>
<View style={{alignContent:'flex-end',position:'absolute',bottom:0,right:0,margin:s(10)}}>
            <TouchableOpacity
                onPress={() => {
                  console.log('only check');
                  props.navigation.replace('Authorized', { name: 'Jane 123456789' });
                }}>
                <View style={styles.button_confirm}>
                  <Text
                    style={{
                      color: colors.WHITE_COLOR,
                      fontFamily: fonts('poppinsSemibold'),
                    }}>
                    {'Finish'}
                  </Text>
                </View>
              </TouchableOpacity>
              </View>
        </View>

    );
};
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: colors.TEXT_COLOR,
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: s(12),
        color: colors.TEXT_COLOR,
        fontFamily: fonts('poppinsSemibold'),
    },
    input_type: {
        color: colors.SECONDARY_TEXT_COLOR,
        fontSize: s(8),
        fontFamily: fonts('poppinsMedium'),
    },
    input: {
        padding: s(10),
        fontSize: s(13),
        marginRight: s(10),
        fontFamily: fonts('poppinsRegular'),
        color: colors.PRIMARY_TEXT_COLOR,

    },
    toolbar: {
        backgroundColor: colors.PRIMARY_COLOR,
        height: s(50),
        padding: s(10),
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

    FlexGrowOne: {
        flexGrow: 1
    },
    FlexOne: {
        flex: 1
    },
    Title: {
        fontSize: s(15),
        color: colors.WHITE_COLOR,
        fontFamily: fonts('poppinsSemibold'),
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: s(10)
    },
    button_confirm: {
        textAlign: 'center',
        alignContent: 'flex-end',
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
// 
function notifyMessage(msg) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        alert(msg);
    }
}

export default AddPost;

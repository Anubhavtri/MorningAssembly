import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    FlatList,
    Image,
    ImageBackground,
    Platform,
    SafeAreaView,
    SafeAreaViewBase,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    UIManager,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextInput } from 'react-native-paper';
import colors from '../../templates/colors';
import { Button } from '../../component/UI';
import fonts from '../../utility/fonts';

const SelectImageTypeDialog = ({ visible, visibleFun, myCallback, title, sub_title, }) => {
    const [text, setText] = useState('');
    return (

        <Modal
            style={{ margin: 0 }}
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                // visibleFun()
                // myCallback('Gaurav')
            }}
        >


            <SafeAreaView style={styles.container} >

                <View style={{ alignContent: 'center', alignItems: 'center', margin: s(5) }}>


                    <View style={styles.toolbar}>

                        <Text style={styles.Title}>{title || 'Confirm'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: s(20) }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    console.log("image>>");
                                    myCallback('Camera')

                                }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Image
                                        source={require('../../images/camera.png')}
                                        style={{ height: s(24), width: s(24) }}
                                    />
                                    <Text style={{ color: colors.PRIMARY_TEXT_COLOR, fontFamily: fonts('poppinsMedium') }}>Camera</Text></View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    console.log("image>>");
                                    myCallback('Gallery')

                                }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image
                                        source={require('../../images/popup-image-gallery.png')}
                                        style={{ height: s(24), width: s(24),  }}
                                    />
                                    <Text style={{ color: colors.PRIMARY_TEXT_COLOR, fontFamily: fonts('poppinsMedium') }}>Gallery</Text></View>
                            </TouchableWithoutFeedback>
                        </View>


                        <Button
                            title={'Cancel'}
                            onPress={() => {
                                console.log('Login_button+++');
                                visibleFun()
                                /* props.navigation.navigate('Authorized', { name: 'Jane 123456789' }) */

                            }}
                        />
                        {/* </View> */}

                    </View>



                </View>






            </SafeAreaView>
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
        width: '80%',
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
        alignSelf: 'flex-start',
        marginTop: s(10),
    },
    Sub_Title: {
        fontSize: s(10),
        color: colors.SECONDARY_TEXT_COLOR,
        marginTop: s(40),
        marginLeft: s(20),
        marginRight: s(20),
        padding: s(5),
        textAlign: 'center'


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
        margin: s(10),
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(20),
        alignContent: 'center',
        alignSelf: 'center',

    },
});
export default SelectImageTypeDialog;
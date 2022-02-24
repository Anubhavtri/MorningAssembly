import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
    SafeAreaView,
    Platform,
    RefreshControl,
    Alert,
    Image,
} from 'react-native';

import { s } from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import SelectImageTypeDialog from '../../component/UI/SelectImageTypeDialog';

const ADD_Post = props => {
    const [getloader, setloader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [latestskills_response, setlatestskills_response] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    return (
        <>

            <View style={{ flex: 1, margin: s(10), paddingBottom: s(3), width: '100%', marginBottom: s(50), marginRight: s(50) }}>

                <View style={{ height: s(40), width: s(40), position: 'absolute', bottom: 0, alignSelf: 'flex-end', marginRight: s(10) }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("working C");
                            setModalVisible(true);
                            

                        }}>

                        <Image
                            source={require('../../images/plus.png')}
                            style={{ height: s(40), width: s(40), alignSelf: 'flex-end' }}
                        />

                    </TouchableOpacity>
                </View>

                <SelectImageTypeDialog
                    visible={modalVisible}
                    visibleFun={() => setModalVisible(!modalVisible)}
                    title="Select Image"
                    sub_title="Select Image"
                    myCallback={(paramOne, paramTwo) => {
                        console.log('paramOne', paramOne);
                        setModalVisible(false)
                        if (paramOne == 'Camera') {
                            ImagePicker.openCamera({
                                width: 300,
                                height: 400,
                                cropping: true,
                                includeBase64: true
                            }).then(image => {
                                console.log(image);
                                // setDefultImage(image?.path)
                                // setImage_data(image?.data)
                                // { render_image() }
                                props.navigation.navigate('AddPostStack', { Image_Path: image?.data  })
                            });
                        } else if (paramOne == 'Gallery') {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 400,
                                cropping: true,
                                includeBase64: true
                            }).then(image => {
                                console.log("image>>", image);
                                console.log("image>>", image?.path);
                                // setDefultImage(image?.path)
                                // setImage_data(image?.data)
                                // { render_image() }
                                props.navigation.navigate('AddPostStack', { Image_Path: image?.data })
                            });
                        }

                    }}
                />
            </View>

        </>
    );
}
const styles = StyleSheet.create({
    main_cantainer: {
        marginLeft: s(10),
        marginRight: s(10),

        marginTop: s(10),

    },
    FlexOne: {
        flex: 1
    },
    title: {
        fontSize: s(12),
        color: colors.TEXT_COLOR,
        fontFamily: fonts('poppinsSemibold')
    },
    second_contant: {
        fontSize: s(13),
        color: colors.WHITE_COLOR,
        margin: s(10),
        fontFamily: fonts('poppinsSemibold'),
    },
    email: {
        fontSize: s(10),
        color: colors.WHITE_COLOR,
        marginLeft: s(10),
    },
    total_skill: {
        marginTop: s(15),
        marginLeft: s(10),
        marginRight: s(10),
        marginBottom: s(10),
        backgroundColor: colors.SECONDARY_COLOR,
        padding: s(10),
        borderRadius: s(5),
    },
    total_skill_title: {
        color: colors.PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: s(10),
        marginBottom: s(5),
    },
    total_skill_contant: {
        color: colors.PRIMARY_COLOR,
        fontSize: s(9),
        marginLeft: s(10),
        fontWeight: 'bold',
    },
    input_type: {
        color: colors.SECONDARY_TEXT_COLOR,
        fontSize: s(8),
        fontFamily: fonts('poppinsMedium'),


    },
    top_background: {
        height: (Platform.OS === 'ios') ? s(185) : s(155),
        width: '100%',
        position: 'absolute',
        borderBottomLeftRadius: s(20),
        borderBottomRightRadius: s(20),
        backgroundColor: colors.PRIMARY_COLOR,

    },
});

export default ADD_Post;
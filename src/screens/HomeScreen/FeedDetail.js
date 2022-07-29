
import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
    Alert,
    FlatList,
    Image,
    Platform,
    RefreshControl,
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

import APIName from '../../utility/api/apiName';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import moment from 'moment';
import fonts from '../../utility/fonts';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';
const FeedDetail = props => {
    const [notificationList, setnotificationList] = React.useState([]);
    const [getloader, setloader] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [showmodel, setshowmodel] = React.useState(false);

    const [imageurl, setImageurl] = React.useState('');
    const images = [{
        // Simplest usage.
        url: imageurl,
        props: {
            // headers: ...
        }
        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.

    }
    ]

    const renderfullImage = () => {
        return (
            <Modal visible={true}
                transparent={true}>
                <ImageViewer
                    imageUrls={images} />
            </Modal>
        );

    };

    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working compitancylist>>" + JSON.stringify(props?.route?.params?.data))
            setImageurl(props?.route?.params?.data?.url);
            // setloader(true)

            // getCurrentPosition();
            // setloader(true);
            // compitancy_list();

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
                <Text style={styles.Title}>{props?.route?.params?.data?.title}</Text>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginTop: s(10), marginLeft: s(12), fontFamily: fonts('poppinsSemibold'), color: colors.PRIMARY_TEXT_COLOR }}>Title: </Text>
                    <Text style={{ marginTop: s(10), marginLeft: s(10), fontFamily: fonts('poppinsRegular'), color: colors.SECONDARY_COLOR }}>{props?.route?.params?.data?.title}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginTop: s(10), marginLeft: s(12), fontFamily: fonts('poppinsSemibold'), color: colors.PRIMARY_TEXT_COLOR }}>Description: </Text>
                    <Text style={{ marginTop: s(10), marginLeft: s(10), fontFamily: fonts('poppinsRegular'), color: colors.SECONDARY_COLOR }}>{props?.route?.params?.data?.description}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log("dkljfkldjkfj");
                        renderfullImage();
                        setshowmodel(true);
                    }
                    }>

                    <Image
                        source={{ uri: props?.route?.params?.data?.url }}
                        style={{ height: s(205), width: '100%', marginTop: 10 }}
                    />
                </TouchableOpacity>
                {showmodel ?
                    <Modal visible={true}
                        transparent={true}>
                        <ImageViewer
                            imageUrls={images} 
                            onCancel={()=>{setshowmodel(false)}}
                            
                            />
                    </Modal> : null}

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
        color: colors.WHITE_COLOR,
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

export default FeedDetail;


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

const Notification = props => {
    const [notificationList, setnotificationList] = React.useState([]);
    const [getloader, setloader] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const renderItem_recent_skill = (item, index) => {
        { console.log("item.status>>>>>>>>>>>>>>>>", item.status); }
        return (
            <TouchableOpacity
                onPress={() => {

                    console.log("dfjkjdsfkdskjf", item?.title);

                }}>
                <View
                    style={{
                        backgroundColor: colors.WHITE_COLOR,
                        borderRadius: s(8),
                        padding: s(5),
                        margin: s(5),
                        marginLeft: s(10),
                        marginRight: s(10),
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 10 }}>
                            <Text
                                style={{ color: item.status == 0 ? colors.PRIMARY_COLOR : colors.TEXT_COLOR, fontSize: s(13), margin: s(5), fontFamily: item.status == 0 ? fonts('poppinsSemibold') : fonts('poppinsRegular') }}>
                                {item?.title}
                            </Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: colors.SECONDARY_TEXT_COLOR,
                                    fontSize: s(7),
                                    margin: s(5),
                                    fontFamily: fonts('poppinsMedium'),
                                }}>
                                {/* { moment(item?.createdAt).format('Do MMM YYYY ') } */}
                                {moment.utc(item?.created_at).local().startOf('seconds').fromNow()}
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={{ color: colors.SECONDARY_TEXT_COLOR, fontSize: s(10), marginLeft: s(5), marginRight: s(5), fontFamily: fonts('poppinsRegular') }}>
                        {item?.message}
                    </Text>


                </View>
            </TouchableOpacity>
        );
    };
    const notification_list = async () => {
        const client = await loggedInClient();
        
        client
            .get(APIName.notification)
            .then(response => {
                console.log('Response data from compitancy_list' + JSON.stringify(response.data));
                let data = response.data.data;
                setnotificationList(data.reverse());
                // if (response.status == 200) {
                //     let data = response.data;
                //     try {
                //         console.log('Response data from compitancy_list' + JSON.stringify(data));
                //         // setresponse(response.data);
                //         // setnotificationList(data.reverse());
                //         setnotificationList(data);
                //     } catch (error) {
                //         console.log('Exception' + error.test);
                //     }

                //     setloader(false);
                // }
                setloader(false);
            })
            .catch(error => {
                console.log('error>>' + error);
                setloader(false);
            });
    };
  
    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working compitancylist>>")
            setloader(true)
            notification_list();
            // getCurrentPosition();
            // setloader(true);
            // compitancy_list();

        }, [])
    );
    const onRefresh = React.useCallback(() => {

        setloader(true)
        notification_list();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        setloader(true)
        notification_list();
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


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
                <Text style={styles.Title}>Notification</Text>
            </View>
            <FlatList
                horizontal={false}
                data={notificationList}
                showsHorizontalScrollIndicator={false}
                // ItemSeparatorComponent={FlatListItemSeparator}
                /*  renderItem={item => renderItem_recent_skill(item.item)} */
                renderItem={({ item, index }) =>
                    renderItem_recent_skill(item, index)
                }
                refreshControl={
                    <RefreshControl
                        tintColor={colors.PRIMARY_COLOR}
                        refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            {notificationList?.length > 0 && getloader == false ? null :
                getloader == false ?
                    <View style={{
                        backgroundColor: (Platform.OS === 'ios') ? colors.Defult_WHITE_COLOR : colors.WHITE_COLOR,
                        position: 'absolute',
                        top: 0, left: 0,
                        right: 0, bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop:s(50)
                    }}>
                        <Text
                            style={{
                                fontSize: s(20),
                                textAlign: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                fontFamily: fonts('poppinsMedium'),
                            }}>
                            No Data Found !
                        </Text></View> : null}


            
                        <Spinner
                visible={getloader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
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

export default Notification;

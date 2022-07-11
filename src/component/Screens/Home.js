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
import moment from 'moment';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import APIName from '../../utility/api/apiName';

import loggedInClient from '../../utility/apiAuth/loggedInClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '../UI/BottomSheet';
const Home = props => {
    const [getloader, setloader] = useState(false);
    const [latestFeed_response, setlatestFeed_response] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);



    const getschool_code = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@school_code');
            if (retrievedItem !== null) {
                console.log('getAccessToken', 'Error retrieving data' + retrievedItem);
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    useEffect(() => {
        getFeed();
    }, []);

    const getFeed = async () => {
        try {
            const client = await loggedInClient();
            client
                .get(APIName.feeds + '?schoolId=' + await getschool_code())
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data;
                        setloader(false);
                        try {
                            setloader(false)
                            setlatestFeed_response(data?.data);
                            console.log('Response data from getFeed_list' + JSON.stringify(data));


                        } catch (error) {
                            console.log('Exception' + error);
                            setloader(false)
                        }

                        setloader(false);
                    } else {

                        setloader(false);
                    }

                })
                .catch(error => {
                    console.log('error' + error);
                    setloader(false);
                });
        } catch (error) {
            console.log("catch is working >>>>", JSON.stringify(error));
            setloader(false);
        }
    };
    // const addLike = async () => {
    //     try {
    //         const client = await loggedInClient();
    //         client
    //             .get(APIName.feeds + '?schoolId=' + await getschool_code())
    //             .then(response => {
    //                 setloader(false);
    //                 if (response.status == 200) {
    //                     let data = response.data;
    //                     setloader(false);
    //                     try {
    //                         setloader(false)
    //                         setlatestFeed_response(data?.data);
    //                         console.log('Response data from getFeed_list' + JSON.stringify(data));


    //                     } catch (error) {
    //                         console.log('Exception' + error);
    //                         setloader(false)
    //                     }

    //                     setloader(false);
    //                 } else {

    //                     setloader(false);
    //                 }

    //             })
    //             .catch(error => {
    //                 console.log('error' + error);
    //                 setloader(false);
    //             });
    //     } catch (error) {
    //         console.log("catch is working >>>>", JSON.stringify(error));
    //         setloader(false);
    //     }
    // };


    const renderItem_requested_skill = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    console.log("dkljfkldjkfj")

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
                                style={{ height: s(25), width: s(25), }}
                            />

                        </View>
                        <View style={{ marginTop: s(1), marginLeft: s(5), flex: 4 }}>
                            <Text style={styles.title}>{item?.schoolId?.school_name}</Text>
                            <Text style={styles.input_type}>{moment(item?.created_at).fromNow()}</Text>
                        </View>
                        <Image
                            source={require('../../images/dots.png')}
                            style={{ height: s(20), width: s(20), justifyContent: 'center', alignSelf: 'center' }}
                        />
                    </View>

                    <Image
                        source={{ uri: item?.url }}
                        style={{ height: s(205), width: '100%', }}
                    />


                    <View style={{ flexDirection: 'row', flex: 1, height: s(40) }}>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                addLike();
                            }

                            }>
                            <View
                                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
                            >
                                <Image
                                    source={require('../../images/love.png')}
                                    style={{ height: s(20), width: s(20), }}
                                />
                                <Text style={{ marginLeft: s(5) }}>{item?.like_count + ' Likes'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                               setModalVisible(true);
                            }

                            }>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/chat.png')}
                                style={{ height: s(20), width: s(20), }}
                            />
                            <Text style={{ marginLeft: s(5) }}>{item?.comments.length + ' Comments'}</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/share.png')}
                                style={{ height: s(20), width: s(20), }}
                            />
                            <Text style={{ marginLeft: s(5) }}>Share</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );

    };





    const onRefresh = React.useCallback(() => {

        wait(1500).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    return (
        <>
            <View style={{ flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.Defult_WHITE_COLOR : colors.WHITE_COLOR, margin: s(10), paddingBottom: s(3), width: '100%', marginBottom: s(40) }}>
                <FlatList
                    style={{ paddingBottom: s(80), margin: s(3) }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={latestFeed_response}
                    renderItem={({ item, index }) => {
                        return renderItem_requested_skill(item, index);

                    }

                    }
                    refreshControl={
                        <RefreshControl
                            tintColor={colors.PRIMARY_COLOR}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                {/* { latestskills_response?.length > 0 && getloader==false? null : (
                    getloader == false?
                    <Text
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            fontSize: s(20),
                            flex: 1,
                            fontFamily: fonts('poppinsMedium'),
                        }}>
                        No Data Found !
                    </Text>:null
                )} */}
                <Spinner
                    visible={getloader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <BottomSheet
                    visible={modalVisible}
                    visibleFun={() => setModalVisible(!modalVisible)}
                    data={latestFeed_response}
                    myCallback={(paramOne, paramTwo) => {
                        console.log("ldfklkdlfkldkf");
                    }}>

                </BottomSheet>
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

export default Home;
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
    ToastAndroid,
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
import CustomeDialog from '../UI/CustomeDialog';
const Home = props => {
    const [getloader, setloader] = useState(false);
    const [latestFeed_response, setlatestFeed_response] = useState([]);
    const [FeedComment_response, setlFeedComment_response] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedFeed_id, setselectedFeed_id] = useState('');
    const [user_id, setuser_id] = useState('');
    const [updateprofilemodalVisible, setupdateprofileModalVisible] = useState(false);
    const [index, setindex] = useState('');

    const [schoolcode, setSchoolCode] = useState(false);



    const getAccessToken = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@access_token');
            if (retrievedItem !== null) {
                console.log('getAccessToken', 'Error retrieving data' + retrievedItem);

                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getschool_code = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@school_code');

            return retrievedItem;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getuser_id = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@user_id');

            return retrievedItem;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    useEffect(() => {
        async function fetchData() {
            const response1 = await getschool_code();
            const user_id = await getuser_id();
            setuser_id(user_id);
            console.log("response1>>>" + user_id);
            if (response1 == null) {
                setSchoolCode(false);
            } else {
                setSchoolCode(true);
                getFeed();
            }
        }
        fetchData();
    }, []);
    function notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
          Alert(msg);
        }
      }

    const getFeed = async () => {
        try {
            setloader(true);
            //console.log("getFeed<><>"+await getschool_code());
            // console.log("getFeed<><>++"+await getAccessToken());


            const client = await loggedInClient();

            client
                .get(APIName.feeds + '?school_code=' + await getschool_code())
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data;
                        setloader(false);
                        try {
                            setloader(false)
                            setlatestFeed_response(data?.data);
                            console.log('Response data from getFeed_list' + JSON.stringify(data));
                            if (index != '') {
                                for (let i = 0; i < data?.data.length; i++) {
                                    const element = data?.data[i];
                                    if (element._id == index) {
                                        setlFeedComment_response(element.comments);
                                    }
                                }
                            }

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
    const addLike = async () => {
        try {
            var data = {
                feedId: selectedFeed_id,
            };
            console.log("addLike>>>" + JSON.stringify(data));
            const client = await loggedInClient();
            client
                .post(APIName.add_like, data)
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data;
                        setloader(false);
                        try {
                            setloader(false)
                            getFeed();
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
    const adddislikeLike = async () => {
        try {
            var data = {
                feedId: selectedFeed_id,
            };
            console.log("addLike>>>" + JSON.stringify(data));
            const client = await loggedInClient();
            client
                .post(APIName.remove_like, data)
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data;
                        setloader(false);
                        try {
                            setloader(false)
                            getFeed();
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
    const deletefeed = async () => {
        try {
            var data = {
                feedId: selectedFeed_id,
            };
            console.log("addLike>>>" + JSON.stringify(data));
            const client = await loggedInClient();
            client
                .delete(APIName.delete_feed, data)
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data;
                        setloader(false);
                        try {
                            setloader(false);
                            notifyMessage(data?.message);
                            getFeed();
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


    const renderItem_requested_skill = (item, index) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("FeedDetailStack", { data: item });
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
                                style={{ height: s(25), width: s(25), }}
                            />

                        </View>
                        <View style={{ marginTop: s(1), marginLeft: s(5), flex: 4 }}>
                            <Text style={styles.title}>{item?.userId?.full_name}</Text>
                            <Text style={styles.input_type}>{moment(item?.created_at).fromNow()}</Text>
                        </View>
                        {user_id == item.userId?._id ?
                            <TouchableOpacity
                                onPress={() => {
                                    setselectedFeed_id(item._id);
                                    setupdateprofileModalVisible(true);
                                }
                                }>
                                <Image
                                    source={require('../../images/delete.png')}
                                    style={{ height: s(20), width: s(20), justifyContent: 'center', alignSelf: 'center' }}
                                />
                            </TouchableOpacity>

                            : null}
                    </View>

                    <Image
                        source={{ uri: item?.url }}
                        style={{ height: s(205), width: '100%', }}
                    />


                    <View style={{ flexDirection: 'row', flex: 1, height: s(40) }}>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setselectedFeed_id(item._id);
                                setloader(true);
                                if (item.isLikedByUser) {
                                    adddislikeLike();
                                } else {
                                    addLike();
                                }
                            }

                            }>
                            <View
                                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            >
                                {item.isLikedByUser ? <Image
                                    source={require('../../images/fill_like.png')}
                                    style={{ height: s(20), width: s(20), }}
                                /> :
                                    <Image
                                        source={require('../../images/love.png')}
                                        style={{ height: s(20), width: s(20), }}
                                    />}
                                <Text style={{ marginLeft: s(5) }}>{item?.like_count + ' Likes'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setselectedFeed_id(item._id);
                                setindex(item._id);
                                setlFeedComment_response(item.comments);
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
                        {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../images/share.png')}
                                style={{ height: s(20), width: s(20), }}
                            />
                            <Text style={{ marginLeft: s(5) }}>Share</Text>
                        </View> */}
                    </View>

                </View>
            </TouchableOpacity>
        );

    };





    const onRefresh = React.useCallback(() => {
        setloader(true);
        getFeed();
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
                <CustomeDialog
                        visible={updateprofilemodalVisible}
                        visibleFun={() => setupdateprofileModalVisible(!updateprofilemodalVisible)}
                        title="Delete Feed"
                        sub_title="Are you want to delete feed?"
                        myCallback={(paramOne, paramTwo) => {
                            console.log('paramOne', paramOne);
                            setupdateprofileModalVisible(false);
                            setloader(true);
                            deletefeed();
                        }}
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
                {getloader ?
                    <Spinner
                        visible={true}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    /> : null}
                <BottomSheet
                    visible={modalVisible}
                    visibleFun={() => setModalVisible(!modalVisible)}
                    data={FeedComment_response}
                    feed_id={selectedFeed_id}
                    myCallback={(paramOne, paramTwo) => {
                        console.log("ldfklkdlfkldkf>>" + paramOne);
                        getFeed();
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
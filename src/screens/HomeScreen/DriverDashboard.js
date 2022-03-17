
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
import APIName from '../../utility/api/apiName';
import NetworkUtils from '../../utility/apiAuth/NetworkUtils';
import loginRequest from '../../utility/apiAuth/tokenClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loggedInClient from '../../utility/apiAuth/loggedInClient';

import { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';

import fonts from '../../utility/fonts';
import MapView, { AnimatedRegion } from 'react-native-maps';
import CustomeDialog from '../../component/UI/CustomeDialog';
export const mapRef = React.createRef();
const DriverDashboard = props => {
    const [getloader, setloader] = useState(false);
    const [competencies_list, setcompetencies_list] = React.useState([]);
    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [region, setregion] = useState({
        latitude: 22.7242284,
        longitude: 75.7237604,
        latitudeDelta: 19.0826881,
        longitudeDelta: 72.6009781,
    });
    var markers = [
        {
            latitude: 45.65,
            longitude: -78.90,
            title: 'Foo Place',
            subtitle: '1234 Foo Drive'
        }
    ];

    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working compitancylist>>")
            getCurrentLocation();
            setloader(false);
            // getCurrentPosition();
            // setloader(true);
            // compitancy_list();

        }, [])
    );

    const FireNotification = async () => {
        try {
            const client = await loggedInClient();

            const data = {
                messageToSend: 'Driver Started Session',
                messageToSendTitle: 'Session Start',
                school_code: await getschool_code(),
                bus_number: await getBus_no(),
            };
            console.log('FireNotification>>', JSON.stringify(data));
            client
                .post(APIName.customer_notification, data)
                .then(response => {

                    if (response.status == 200) {
                        let data = response.data;

                        try {

                            console.log('Response data from compitancy_list' + JSON.stringify(data));



                        } catch (error) {
                            console.log('Exception' + error.test);

                        }


                    } else {

                    }

                })
                .catch(error => {
                    console.log('error' + error);

                });
        } catch { }
    };
    const getAccessToken = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@user_id');
            if (retrievedItem !== null) {
                const item = JSON.parse(retrievedItem);
                console.log('getAccessToken', 'Error retrieving data' + item);
                return item;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getschool_code = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@school_code');
            if (retrievedItem !== null) {
                const item = JSON.parse(retrievedItem);
                console.log('getAccessToken', 'Error retrieving data' + item);
                return item;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getBus_no = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@bus_no');
            if (retrievedItem !== null) {
                const item = JSON.parse(retrievedItem);
                console.log('getAccessToken', 'Error retrieving data' + item);
                return item;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                console.log(location.latitude);
                console.log(location.longitude);
                setlat(location.latitude)
                setlong(location.longitude)
                const region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034,
                };
                setregion(region);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    const updateLatLong = async (sStatus, cStatus) => {
        const client = await loggedInClient();
        const data = {
            lat: lat,
            long: long,

        };
        console.log('Request new ID system' + JSON.stringify(data));
        client
            .put(APIName.lat_long + '/' + await getAccessToken(), data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        console.log(
                            'Response data from assesmentlist_skill' + JSON.stringify(data),
                        );
                        FireNotification()
                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                }

            })
            .catch(error => {
                console.log('error' + error);
                setloader(false);
            });
    };
    const DriverStartSession = async (sStatus, cStatus) => {
        const client = await loggedInClient();
        const data = {
            school_code: await getschool_code(),
            bus_number: await getBus_no(),
            lat: lat,
            long: long,

        };
        console.log('Request new ID system' + JSON.stringify(data));
        client
            .post(APIName.driver_session_notificaion , data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        console.log(
                            'Response data from assesmentlist_skill' + JSON.stringify(data),
                        );
                        FireNotification()
                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                }

            })
            .catch(error => {
                console.log('error>>>>>' + error);
                setloader(false);
            });
    };
    const goToInitialRegion = () => {
        let initialRegion = Object.assign({}, initialRegion);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        mapView.animateToRegion(initialRegion, 2000);
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
                <Text style={styles.Title}>Waiting for Ride</Text>
            </View>
            {getloader ?
                <MapView
                    style={{ flex: 1 }}
                    visible={getloader}
                    mapType={Platform.OS == "android" ? "standard" : "standard"}
                    region={region}
                    initialRegion={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followUserLocation={true}
                    zoomEnabled={true}
                // onMapReady={goToInitialRegion.bind()}
                // onPress={() => {
                //     dispatch(settingActions.getLocation());
                //     mapRef.current.animateToRegion({
                //       latitude: myLatitude,
                //       longitude: myLongitude,
                //       latitudeDelta: 0.0922,
                //       longitudeDelta: 0.0421,
                //     });
                //   }}
                >
                    {/* <Marker coordinate={{ latitude: 22.7242284, longitude: 75.7237604 }}
                pinColor={colors.PRIMARY_COLOR} // any color
                title={"title"}
                description={"description"} /> */}
                    {competencies_list.length > 0 &&
                        competencies_list.map((marker, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.long,
                                }}
                                pinColor={colors.PRIMARY_COLOR}
                                title={'Driver ' + index}
                                description={'' + marker.mobileNo}
                            />
                        ))}
                </MapView>
                : null}
            <Spinner
                visible={getloader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            {getloader ?

                <View style={styles.button_stop}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('only check');
                            setModalVisible(true);
                           
                            //props.navigation.goBack();
                           
                        }}>

                        <Text
                            style={{
                                color: colors.WHITE_COLOR,
                                fontFamily: fonts('poppinsSemibold'),
                            }}>
                            {'  Stop Session  '}
                        </Text>

                    </TouchableOpacity>
                </View>
                :
                <View style={styles.button_confirm}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('only check');
                            setloader(true)

                           // updateLatLong()
                            DriverStartSession();
                        }}>

                        <Text
                            style={{
                                color: colors.WHITE_COLOR,
                                fontFamily: fonts('poppinsSemibold'),
                            }}>
                            {'  Start Session  '}
                        </Text>

                    </TouchableOpacity>
                </View>
            }
             <CustomeDialog
                        visible={modalVisible}
                        visibleFun={() => setModalVisible(!modalVisible)}
                        title="Alert"
                        sub_title="Are you sure .you want to stop session?"
                        myCallback={(paramOne, paramTwo) => {
                            console.log('paramOne', paramOne);
                            setModalVisible(false);
                            setloader(false);
                        }}
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
    button_confirm: {
        height: s(40),
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
        paddingRight: s(20),
        paddingLeft: s(20),
        position: 'absolute',
        top: 0,
        marginTop: s(80)
    },
    button_stop: {
        height: s(40),
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: s(5),
        backgroundColor: colors.RED,
        borderRadius: s(20),
        fontSize: s(12),
        color: colors.WHITE_COLOR,
        alignContent: 'center',
        alignSelf: 'center',
        paddingRight: s(20),
        paddingLeft: s(20),
        position: 'absolute',
        top: 0,
        marginTop: s(80)
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

export default DriverDashboard;

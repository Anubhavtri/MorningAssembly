
import React, { useState, useRef, useEffect,useCallback } from 'react';
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
import KeepAwake from 'react-native-keep-awake';
import { PermissionsAndroid } from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
export const mapRef = React.createRef();
const DriverDashboard = props => {
    const [getloader, setloader] = useState(false);
    const [competencies_list, setcompetencies_list] = React.useState([]);
    const [lat, setlat] = useState(null);
    const [long, setlong] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    let late = 0;
    let longi = 0;
    

    const [region, setregion] = useState({
        latitude: 22.7242284,
        longitude: 75.7237604,
        latitudeDelta: 19.0826881,
        longitudeDelta: 72.6009781,
    });
  

    // useFocusEffect(() => {
    //     const interval = setInterval(() => {
    //         if (getloader) {
    //             getCurrentLocation();
    //         }
    //         else {}
    //     }, 20000);
    //     return () => clearInterval(interval);
    // }, []);
   
    // useFocusEffect(() => {
    //     console.log("useFocusEffect late>>",lat);
    //     if (getloader) {
    //         console.log("useFocusEffect late>>",lat);
    //         console.log("useFocusEffect longi>>",long);

    //         updateLatLong()
           
    //     }
    // }, [lat]);
    // useFocusEffect(
    //     useCallback(() => {
    //         return () => {
    //           try {
    //             getCurrentLocation();
    //             setloader(false);
               
                
    //           } catch (error) { 
    //               console.log("useFocusEffect",JSON.stringify(error));
    //           }
    //         };
    //       }, []),
    // );
    useEffect(() => {
        setloader(false);
        getCurrentLocation("");
        GetPermission("");
        setTimeout(async () => {
           try {
              const value = await AsyncStorage.getItem('@startsession');
            
              if(value==='true'){
                console.log("value>>>>>>>>>>>",value);
                 setloader(value)
                }
               } catch (e) {
              console.log('Exception>>' + e);
              // error reading value
            }
          },1500);
      }, []);

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
                return retrievedItem;
            }
            return retrievedItem;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getschool_code = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@school_code');
            if (retrievedItem !== null) {
                return retrievedItem;
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
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getCurrentLocation = (start) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                
                setlat(location.latitude)
                setlong(location.longitude)
                late = location.latitude
                longi = location.longitude
                console.log("location.latitude",start);

                if(start !=""){
                    updateLatLong()
                }
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
    const updateLatLong = async () => {
        const client = await loggedInClient();
        const data = {
            lat: late==0?lat:late,
            long: longi==0?long:longi,

        };
        console.log('Request new updateLatLong' + JSON.stringify(data));
        console.log('Request new updateLatLong' + APIName.lat_long + '/' + await getAccessToken());

        client
            .put(APIName.lat_long + '/' + await getAccessToken(), data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        console.log(
                            'Response data from updateLatLong' + JSON.stringify(data),
                        );

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                }

            })
            .catch(error => {
                console.log('error' + error);
               
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
            .post(APIName.driver_session_notificaion, data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        setloader(true)
                        storeUserData('true')
                        setTimeout(() => {
                            GetPermission('start');
                          }, 1000)
                       
                        console.log(
                            'Response data from assesmentlist_skill' + JSON.stringify(data),
                        );
                        // FireNotification()
                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                }

            })
            .catch(error => {
                console.log('error>>>>>' + JSON.stringify(error));
                
            });
    };
    const DriverStopSession = async (sStatus, cStatus) => {
        const client = await loggedInClient();
        const data = {
            school_code: await getschool_code(),
            bus_number: await getBus_no(),
            lat: lat,
            long: long,
        };
        console.log('Request new ID system' + JSON.stringify(data));
        client
            .post(APIName.end_driver_session, data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        ReactNativeForegroundService.stop();
                        storeUserData('false');
                        console.log(
                            'Response data from assesmentlist_skill' + JSON.stringify(data),
                        );

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                }

            })
            .catch(error => {
                console.log('error>>>>>' + error);
               
            });
    };
    const goToInitialRegion = () => {
        let initialRegion = Object.assign({}, initialRegion);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        mapView.animateToRegion(initialRegion, 2000);
    }

    const storeUserData = async (value) => {
        try {
            await AsyncStorage.setItem('@startsession', value);
            } catch (e) {
            // saving error
        }
    };
    
    const GetPermission= async (start) =>{
        console.log("GetPermission methode is calling");
        try{
        const backgroundgranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
              title: 'Background Location Permission',
              message:
                'We need access to your location ' +
                'so you can get live quality updates.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          console.log("permission>>",backgroundgranted);
          
          if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("permission>>>>>",backgroundgranted);
            console.log("permission>>>>>",getloader);

            if (start !="") {
            ReactNativeForegroundService.add_task(() => {
                console.log('I am Being Tested')
                if (start !="") {
                    getCurrentLocation(start);
                }
                else {}
            }
           , {
                delay: 15000,
                onLoop: true,
                taskId: 'taskid',
                onError: (e) => console.log(`Error logging:`, e),
              });
            ReactNativeForegroundService.start({
                id: 144,
                title: 'Session is started',
                message: 'you are online!',
              });
          }
        }
        }catch(error){console.log("error permission>>>",JSON.stringify(error));}
       
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
                <Text style={styles.Title}>Session</Text>
            </View>
            {/* {getloader ? */}
                <MapView
                    style={{ flex: 1 }}
                    visible={true}
                    mapType={Platform.OS == "android" ? "standard" : "standard"}
                    region={region}
                    initialRegion={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followUserLocation={true}
                    zoomEnabled={true}
                
                >
                    
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
                {/* : null} */}
            <Spinner
                visible={getloader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            {getloader?
            <KeepAwake />:null}
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
                    DriverStopSession();
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

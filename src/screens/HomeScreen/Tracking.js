
import React, { useState, useRef,useEffect } from 'react';
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
import GetLocation from 'react-native-get-location';

import { Marker } from 'react-native-maps';
import flagBlueImg from '../../images/car.png';
import fonts from '../../utility/fonts';
import MapView, { AnimatedRegion } from 'react-native-maps';

const Tracking = props => {
    const [getloader, setloader] = useState(false);
    const [competencies_list, setcompetencies_list] = React.useState({});
    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
    const [region, setregion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const mapRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
          console.log('This will run every second!');
          compitancy_list();
        }, 20000);
        return () => clearInterval(interval);
      }, []);
    useFocusEffect(

        React.useCallback(() => {
            console.log("compitancylist>>")

            if (mapRef.current) {
                // list of _id's must same that has been provided to the identifier props of the Marker
                mapRef.current.fitToSuppliedMarkers(competencies_list.map(({ item }) => item.lat !== 0 && item.lat !== null));
            }
            compitancy_list();

        }, [])
    );
    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                setlat(location.latitude)
                setlong(location.longitude)
                const region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };
                setregion(region);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    const getschool_code = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@school_code');
            if (retrievedItem !== null) {
                console.log('getAccessToken', 'Error retrieving data' + retrievedItem);
                //const item = JSON.parse(retrievedItem);
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
    const compitancy_list = async () => {
        try {
            const client = await loggedInClient();
            console.log('APIName.drivers>>', APIName.tracking + '?school_code=' + await getschool_code() + '&bus_number=' + await getBus_no());
            client
                .get(APIName.tracking + '?school_code=' + await getschool_code() + '&bus_number=' + await getBus_no())
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data.data;
                        setloader(false);
                        try {
                            setloader(false)
                            console.log('Response data from compitancy_list' + JSON.stringify(data));
                            setcompetencies_list(data);
                            if (data?.lat != null && data?.long != null) {
                                const region = {
                                    latitude: data?.lat,
                                    longitude: data?.long,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                };
                                setregion(region);
                            } else {
                                getCurrentLocation();
                            }
                            console.log("dfdf", region);

                        } catch (error) {
                            console.log('Exception' + error.test);
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
    return (

        <View style={styles.container}>
            <View style={styles.toolbar}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();


                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../../images/left.png')}
                            style={{ tintColor: colors.WHITE_COLOR, height: s(24), width: s(24) }}
                        />
                        <Text style={styles.Title}>Track</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <MapView
                style={{ flex: 1 }}
                mapType={Platform.OS == "android" ? "standard" : "standard"}
                region={region}
                initialRegion={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followUserLocation={true}
                zoomEnabled={true}
            >
                {/* {competencies_list?.length > 0 &&
                    competencies_list.filter((item) => item.lat !== 0 && item.lat !== null).map((marker, index) => ( */}
                {competencies_list?.lat != null ?
                    <Marker
                        coordinate={region}
                        zoomEnabled={true}
                        // pinColor={colors.PRIMARY_COLOR}
                        title={'Driver '}
                        description={''}
                        image={require("./../../images/car.png")}
                    >

                    </Marker> : null}

                {/* ))} */}
            </MapView>
            {competencies_list?.lat != null ? console.log("if is working") : console.log("if is not working")}
            {/*   image={flagBlueImg} */}
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

export default Tracking;


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
import GetLocation from 'react-native-get-location';

import { Marker } from 'react-native-maps';
import flagBlueImg from '../../images/suv.png';
import fonts from '../../utility/fonts';
import MapView, { AnimatedRegion } from 'react-native-maps';

const Tracking = props => {
    const [getloader, setloader] = useState(false);
    const [competencies_list, setcompetencies_list] = React.useState([]);
    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
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
    const onRegionChange = (region) => {
        setregion({ region });
    }
    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working compitancylist>>")
            getCurrentLocation();
            // setloader(true);
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

    const compitancy_list = async () => {
        try {
            const client = await loggedInClient();
            console.log('APIName.drivers>>', APIName.drivers);
            client
                .get(APIName.drivers)
                .then(response => {
                    setloader(false);
                    if (response.status == 200) {
                        let data = response.data.data;
                        setloader(false);
                        try {
                            setloader(false)
                            console.log('Response data from compitancy_list' + JSON.stringify(data));

                            setcompetencies_list(data);

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
        } catch { setloader(false); }
    };
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
                <Text style={styles.Title}>Track</Text>
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
                {competencies_list.length > 0 &&
                    competencies_list.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.lat,
                                longitude: marker.long,
                            }}
                            // pinColor={colors.PRIMARY_COLOR}
                            title={'Driver ' + index}
                            description={'' + marker.mobileNo}
                            image={flagBlueImg}
                        >
                            
                        </Marker>
                    ))}
            </MapView>

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

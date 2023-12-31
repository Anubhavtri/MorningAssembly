import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation';
import PushController from './src/Notification/PushController';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


import 'react-native-gesture-handler'


const App: () => Node = () => {

  const show_notification = (title, body) => {
    console.log('A new FCM message arrived!', title + '<>' + body);
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: body,
      title: title, // (required)
      date: new Date(Date.now() + 60 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

      /* Android Only Properties */
      /*  repeatTime: 1, */ // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const title = remoteMessage?.data?.title;
      const body = remoteMessage?.data?.body;
      show_notification(title, body);
    });

    return unsubscribe;
  }, []);

  return (
    <>
    <Navigation />
    <PushController />
    </>
  );
};



export default App;

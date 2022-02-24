import React, { Component } from "react";
//import { PushNotificationIOS } from "react-native";
import {
  Platform,
} from 'react-native';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
// var PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';
import Navigation from '../navigation';
import { navigate } from '../navigation/navigationUtils'
import * as RootNavigation from '../RootNavigation';
export default class PushController extends Component {
   

  componentDidMount() {

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
      onRegistrationError: function(err) {
        console.log("Error>>"+err.message, err);
      },
     
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        const title = notification?.title;
        const body = notification?.message;

        console.log("NOTIFICATION>>:", title + "<body>" + body);
        // process the notification here

        // required on iOS only 
        if (Platform.OS === 'android') {}
        else {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }

       
        //  
        //RootNavigation.navigate('Notification');
        //NavigationService.navigate('Notification');
        /*  navigate('Notification') */
       /*  this.props.navigator.navigate("Notification"); */

        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: body,
          title: title, // (required)
          date: new Date(Date.now() + 60 * 1000), // in 60 secs
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          channelId: 'sncq-Local-Notification',
          /* Android Only Properties */
          repeatTime: 1,  // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        })
        console.log("NOTIFICATION:", title + "<body>" + body);



      },
      // Android only
      senderID: "1090501687137",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  }


  render() {
    return null;
  }
}
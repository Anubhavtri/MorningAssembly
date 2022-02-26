import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Track from '../../screens/HomeScreen/Notification';


const Stack = createNativeStackNavigator();

const NotificationStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={() => <Track {...props} />}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};
export default NotificationStack;
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDashboardMain from '../../screens/HomeScreen/User_Dashboard';

import TrackStack from '../stack/TrackStack';

const Stack = createNativeStackNavigator();

const UserDashboard = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserHome"
        component={() => <UserDashboardMain {...props} />}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default UserDashboard;
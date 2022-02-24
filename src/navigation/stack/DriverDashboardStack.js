import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Track from '../../screens/HomeScreen/DriverDashboard';


const Stack = createNativeStackNavigator();

const DriverDashboardStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Track"
        component={() => <Track {...props} />}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};
export default DriverDashboardStack;
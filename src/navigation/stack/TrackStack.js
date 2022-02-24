import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Track from '../../screens/HomeScreen/Tracking';


const Stack = createNativeStackNavigator();

const TrackStack = props => {
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
export default TrackStack;
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedDetail from '../../screens/HomeScreen/FeedDetail';


const Stack = createNativeStackNavigator();

const FeedDetailStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedDetail"
        component={() => <FeedDetail {...props} />}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};
export default FeedDetailStack;
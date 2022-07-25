import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../../screens/HomeScreen/EditProfile';


const Stack = createNativeStackNavigator();

const EditProfileStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditProfile"
        component={() => <EditProfile {...props} />}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};
export default EditProfileStack;
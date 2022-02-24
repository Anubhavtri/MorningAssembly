import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Track from '../../screens/HomeScreen/AddPost';


const Stack = createNativeStackNavigator();

const AddPostStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddPost"
        component={() => <Track {...props} />}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};
export default AddPostStack;
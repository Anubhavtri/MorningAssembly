import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnauthorizedStack from './stack/UnauthorizedStack';
import MainStack from './MainStack';
import {navigationRef} from '../RootNavigation';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();
const Navigation = props => {
  return (
    <>
      <StatusBar backgroundColor="#ADD8E6" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={'Unauthorized'}>
          <Stack.Screen
            name="Unauthorized"
            component={UnauthorizedStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Authorized"
            component={MainStack}
            options={{headerShown: false}}
          />
          {/*  <Stack.Screen
            name="Notification"
            component={PushController}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;

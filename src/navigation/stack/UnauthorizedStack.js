import React from 'react';
import splash from '../../screens/Splash'
 import SelectUserType from '../../screens/Authentication_screens/SelectUserType'
 import Login from '../../screens/Authentication_screens/Login'

 import OtpVerification from '../../screens/Authentication_screens/OtpVerification'
// import OTP from '../../screens/Authentication_screens/OtpScreens'
 import SignUp from '../../screens/Authentication_screens/SignUp'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const UnauthorizedStack = () => {
    return (
        <Stack.Navigator initialRouteName='Splash' >

            <Stack.Screen
                name="Splash"
                component={splash}
                screenOptions={{ headerShown: false }}
                header={{ headerShown: false }}
                options={{ headerShown: false }}
            >
            </Stack.Screen>
            <Stack.Screen name="SelectType" component={SelectUserType} options={{ headerShown: false }} />
             <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
           <Stack.Screen name="OTP" component={OtpVerification} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> 
        </Stack.Navigator>
    )
}

export default UnauthorizedStack;
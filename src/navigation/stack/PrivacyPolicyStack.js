import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Track from '../../screens/HomeScreen/PrivacyPolicy';


const Stack = createNativeStackNavigator();

const PrivacyPolicyStack = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="privacyPolicy"
                component={() => <Track {...props} />}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};
export default PrivacyPolicyStack;
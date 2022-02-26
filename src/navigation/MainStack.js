import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import HomeScreen from './stack/UserDashboard';
 import DriverDashboardStack from './stack/DriverDashboardStack';
 import AddPostStack from './stack/AddPostStack';
 import Notification from './stack/NotificaationStack';
// import MySkill from './stack/MySkillStack';
// import PrivacyPolicy from './stack/PrivacyPolicyStack';
// import EditProfile from './stack/EditProfileStack';
// import ResetPassword from './stack/ResetPasswordStack';
// import Notification from './stack/NotificationStack';
/* import PushController from '../Notification/PushController'; */
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="DriverDashboardStack"
        component={DriverDashboardStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPostStack"
        component={AddPostStack}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="NotificationStack"
        component={Notification}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="SkillDetailStack"
        component={SkillDetailStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompitancyStack"
        component={CompitancyStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StaffListStack"
        component={StaffListStack}
        options={{headerShown: false}}
      />
     <Stack.Screen
        name="MySkill"
        component={MySkill}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />  */}

       {/* <Stack.Screen
            name="NotificationControll"
            component={PushController}
            options={{ headerShown: false }}
          /> */}
      {/* <Stack.Screen
        name="NotificationControll"
        component={PushController}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};
export default MainStack;

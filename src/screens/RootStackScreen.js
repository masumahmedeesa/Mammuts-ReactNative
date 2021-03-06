import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SigninScreen from './signIn/index';
import SignupScreen from './signUp/index';
import ForgetPasswordScreen from './forgetPassword/index';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SigninScreen" component={SigninScreen}/>
        <RootStack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen}/>
        <RootStack.Screen name="SignupScreen" component={SignupScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';

import SettingScreen from '../SettingScreen';
// import PrivacyScreen from '../privacy';


const SettingStack = createStackNavigator();

const SettingStackScreen = ({navigation}) => (
  <SettingStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <SettingStack.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        title: 'Dedicato A Maddalena',
        headerTintColor: 'rgb(0,184,249)',
        headerLeft: () => (
          <Icon.Button
            name="menu"
            backgroundColor="#000000"
            color="hotpink"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />

  </SettingStack.Navigator>
);

export default SettingStackScreen;

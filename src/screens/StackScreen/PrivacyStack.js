import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';

// import SettingScreen from '../SettingScreen';
import PrivacyScreen from '../privacy';


const PrivacyStack = createStackNavigator();

const PrivacyStackScreen = ({navigation}) => (
  <PrivacyStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <PrivacyStack.Screen
      name="Privacy"
      component={PrivacyScreen}
      options={{
        title: 'Privacy Policy',
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
  </PrivacyStack.Navigator>
);

export default PrivacyStackScreen;

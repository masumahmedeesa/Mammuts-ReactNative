import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import {createStackNavigator} from '@react-navigation/stack'

import SettingScreen from './SettingScreen'
import PrivacyScreen from './privacy'
import TermsScreen from './terms'
import CopyrightScreen from './copyright'

const SettingStack = createStackNavigator()

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
        title: 'Chi siamo',
        headerTintColor: 'rgb(0,184,249)',
        headerLeft: () => (
          <Icon.Button
            name="menu"
            backgroundColor="#000000"
            color="hotpink"
            onPress={() => {
              navigation.openDrawer()
            }}></Icon.Button>
        ),
      }}
    />
    <SettingStack.Screen
      name="Privacy"
      component={PrivacyScreen}
      options={{
        title: 'Privacy Policy',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <SettingStack.Screen
      name="Terms"
      component={TermsScreen}
      options={{
        title: 'Termini E Condizioni',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <SettingStack.Screen
      name="Copyright"
      component={CopyrightScreen}
      options={{
        title: 'Copyright',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
  </SettingStack.Navigator>
)

export default SettingStackScreen

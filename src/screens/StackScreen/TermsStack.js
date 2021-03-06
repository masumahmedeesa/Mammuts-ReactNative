import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';

// import CopyrightScreen from '../copyright';
import TermsScreen from '../terms';

const TermStack = createStackNavigator();

const TermStackScreen = ({navigation}) => (
  <TermStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <TermStack.Screen
      name="Terms"
      component={TermsScreen}
      options={{
        title: 'Termini E Condizioni',
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
  </TermStack.Navigator>
);

export default TermStackScreen;
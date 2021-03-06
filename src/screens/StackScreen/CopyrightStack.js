import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';

import CopyrightScreen from '../copyright';
// import TermsScreen from '../terms';

const CopyrightStack = createStackNavigator();

const CopyrightStackScreen = ({navigation}) => (
  <CopyrightStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <CopyrightStack.Screen
      name="CopyRight"
      component={CopyrightScreen}
      options={{
        title: 'Copyright',
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
  </CopyrightStack.Navigator>
);

export default CopyrightStackScreen;
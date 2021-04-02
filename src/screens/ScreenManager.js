import React from 'react'
import {Image, View, Text, Dimensions, Platform} from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Feather'

import HomeScreen from './Home/HomeScreen'
import ProfileScreen from './profile/ProfileScreen'
import SearchScreen from './search/SearchScreen'
import * as Animatable from 'react-native-animatable'
import StoryScreen from '../screens/Story/story'

import MemeScreen from '../screens/Meme/index'
import EditMemeScreen from '../screens/Meme/Edit/EditMeme'

import IndividualScreen from './profile/Individual/Individual'
import OtherScreen from './profile/Other/Other'
import Ricordo from './ricordo/ricordo'

const Tab = createMaterialBottomTabNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const SearchStack = createStackNavigator()
const MemeStack = createStackNavigator()
const RicordoStack = createStackNavigator()

const ScreenManager = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="hotpink"
    inactiveColor="#fff"
    labeled="false">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Casa',
        tabBarColor: '#202020',
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
      }}
    />

    <Tab.Screen
      name="meme"
      component={MemeStackScreen}
      options={{
        tabBarLabel: 'Inserisci',
        tabBarColor: '#202020',
        tabBarIcon: ({color}) => (
          <Icon name="plus-square" color={color} size={25} />
        ),
      }}
    />

    <Tab.Screen
      name="Search"
      component={SearchStackScreen}
      options={{
        tabBarLabel: 'Ricerca',
        tabBarColor: '#202020',
        tabBarIcon: ({color}) => <Icon name="search" color={color} size={26} />,
      }}
    />

    <Tab.Screen
      name="Ricordo"
      component={RicordoStackScreen}
      options={{
        tabBarLabel: 'Ricordo',
        tabBarColor: '#202020',
        tabBarIcon: ({color}) => <Icon name="grid" color={color} size={25} />,
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profilo',
        tabBarColor: '#202020',
        tabBarIcon: ({color}) => <Icon name="user" color={color} size={26} />,
      }}
    />
  </Tab.Navigator>
)

export default ScreenManager

const screenWidth = Dimensions.get('screen').width

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
        // borderBottomWidth: 3,
      },
      // headerHideShadow: true,
      // shadowOffset:{height: 0, width: 0}

      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: () => (
          // style={{alignItems: 'center'}}
          <Animatable.View animation="bounce" style={{paddingLeft: screenWidth*0.28}}>
            <Image
              source={require('../../assets/images/front.png')}
              style={{
                width: 60,
                height: 30,
                tintColor: 'rgb(0,184,249)',
                // padding: 2,
              }}
              resizeMode="contain"
            />
          </Animatable.View>
        ),
        headerLeft: () => (
          <Icon.Button
            name="menu"
            backgroundColor="#000000"
            color="hotpink"
            onPress={() => {
              navigation.openDrawer()
            }}></Icon.Button>
        ),
        // headerRight: () => (
        //   <Icon.Button
        //     name="power"
        //     backgroundColor="#000000"
        //     color="rgb(0,184,249)"
        //     onPress={() => {
        //       logoutAction()
        //     }}></Icon.Button>
        // ),
      }}
    />
  </HomeStack.Navigator>
)

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profilo',
        // headerTintColor: 'rgb(0,184,249)',
        headerTitle: () => (
          <Text
            style={{
              textAlign: 'center',
              marginRight: Platform.OS == 'ios' ? 0 : 26,
              color: 'rgb(0,184,249)',
              fontSize: 18,
              padding: 3,
              fontWeight: '500',
            }}>
            Il mio profilo
          </Text>
        ),
        headerLeft: () => (
          <Icon.Button
            name="menu"
            backgroundColor="#000000"
            color="hotpink"
            onPress={() => {
              navigation.openDrawer()
            }}></Icon.Button>
        ),
        // headerRight: () => (
        //   <Icon.Button
        //     name="power"
        //     backgroundColor="#000000"
        //     color="rgb(0,184,249)"
        //     onPress={() => {
        //       Alert.alert('Sign out', 'Actually do sign out', [{text: 'Okay'}])
        //     }}></Icon.Button>
        // ),
      }}
    />
    <ProfileStack.Screen
      name="Story"
      component={StoryScreen}
      options={{
        title: 'Storia',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <ProfileStack.Screen
      name="EditMeme"
      component={EditMemeScreen}
      options={{
        title: 'Modifica memoria',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <ProfileStack.Screen
      name="Individual"
      component={IndividualScreen}
      options={{
        title: 'Profilo di Tie',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <ProfileStack.Screen
      name="Other"
      component={OtherScreen}
      options={{
        title: 'Profilo di Tie',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
  </ProfileStack.Navigator>
)

const SearchStackScreen = ({navigation}) => (
  <SearchStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerTitle: () => (
          <Text
            style={{
              textAlign: 'center',
              marginRight: Platform.OS == 'ios' ? 0 : 45,
              color: 'rgb(0,184,249)',
              fontSize: 21,
              padding: 3,
              fontWeight: '500',
            }}>
            Ricerca
          </Text>
        ),
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
    <SearchStack.Screen
      name="Story"
      component={StoryScreen}
      options={{
        title: 'Storia',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <SearchStack.Screen
      name="Individual"
      component={IndividualScreen}
      options={{
        title: 'Profilo di Tie',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <SearchStack.Screen
      name="Other"
      component={OtherScreen}
      options={{
        title: 'Profilo di Tie',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
  </SearchStack.Navigator>
)

const MemeStackScreen = ({navigation}) => (
  <MemeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <MemeStack.Screen
      name="Meme"
      component={MemeScreen}
      options={{
        headerTitle: () => (
          <Text
            style={{
              textAlign: 'center',
              marginRight: Platform.OS == 'ios' ? 0 : 45,
              color: 'rgb(0,184,249)',
              fontSize: 23,
              padding: 3,
              fontWeight: '500',
            }}>
            Aggiungi Storia
          </Text>
        ),
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
  </MemeStack.Navigator>
)

const RicordoStackScreen = ({navigation}) => (
  <RicordoStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000000',
        shadowColor: 'transparent',
      },
    }}>
    <RicordoStack.Screen
      name="Ricordo"
      component={Ricordo}
      options={{
        headerTitle: () => (
          <Text
            style={{
              textAlign: 'center',
              marginRight: Platform.OS == 'ios' ? 0 : 45,
              color: 'rgb(0,184,249)',
              fontSize: 21,
              padding: 3,
              fontWeight: '500',
            }}>
            Ricordo
          </Text>
        ),
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
    <SearchStack.Screen
      name="Individual"
      component={IndividualScreen}
      options={{
        title: 'Profilo di Tie',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <SearchStack.Screen
      name="Other"
      component={OtherScreen}
      options={{
        title: 'Profilo di Tie',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <RicordoStack.Screen
      name="Story"
      component={StoryScreen}
      options={{
        title: 'Storia',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
    <ProfileStack.Screen
      name="EditMeme"
      component={EditMemeScreen}
      options={{
        title: 'Modifica memoria',
        headerTintColor: '#fff',
        headerTitleStyle: {color: Platform.OS == 'ios' ? '#000000' : '#fff'},
      }}
    />
  </RicordoStack.Navigator>
)

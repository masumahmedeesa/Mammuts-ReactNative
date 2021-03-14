import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {connect} from 'react-redux'

import ScreenManager from './src/screens/ScreenManager'
import {DrawerContent} from './src/components/DrawerContent'

import SettingStackScreen from './src/screens/StackScreen/SettingStack'

import RootStackScreen from './src/screens/RootStackScreen'

const Drawer = createDrawerNavigator()

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    // console.log('appjs',this.props.auth)
    // switchNavigator
    const {isAuthenticated} = this.props.auth
    return (
      <React.Fragment>
        <NavigationContainer>
          {isAuthenticated ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={ScreenManager} />
              <Drawer.Screen name="Setting" component={SettingStackScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, null)(App)

// const [isLoading, setisLoading] = React.useState(true);
// const [userToken, setuserToken] = React.useState(null);

// const initialState = {
//   isLoading: true,
//   userName: null,
//   userToken: null,
// };

// const loginReducerFunction = (previousState, action) => {
//   switch (action.type) {
//     case 'RETRIEVE_TOKEN': //for the first to. Need to check if Data is valid or not
//       return {
//         ...previousState,
//         userToken: action.token,
//         isLoading: false,
//       };
//     case 'LOGIN':
//       return {
//         ...previousState,
//         userName: action.id,
//         userToken: action.token,
//         isLoading: false,
//       };
//     case 'LOGOUT':
//       return {
//         ...previousState,
//         userName: null,
//         userToken: null,
//         isLoading: false,
//       };
//     case 'REGISTER':
//       return {
//         ...previousState,
//         userName: action.id,
//         userToken: action.token,
//         isLoading: false,
//       };
//   }
// };

// const [loginState, dispatch] = React.useReducer(
//   loginReducerFunction,
//   initialState,
// );

// const authContext = React.useMemo(() => ({
//   signIn: async (foundUser) => {
//     // async(name, password) => {
//     // setuserToken('mammuts');
//     // setisLoading(false);
//     // async data should be in here
//     // let userToken;
//     // userToken = null;
//     const userToken = String(foundUser[0].userToken);
//     const name = foundUser[0].userName;

//     // if(name == 'user' && password == 'password'){
//     try {
//       // userToken = 'random';
//       await AsyncStorage.setItem('userToken', userToken);
//     } catch (err) {
//       console.log(err);
//     }
//     // }
//     dispatch({type: 'LOGIN', id: name, token: userToken});
//   },
//   signOut: async () => {
//     // setuserToken(null);
//     // setisLoading(false);
//     try {
//       await AsyncStorage.removeItem('userToken');
//     } catch (err) {
//       console.log(err);
//     }
//     dispatch({type: 'LOGOUT'});
//   },
//   signUp: () => {
//     // setuserToken('mammuts');
//     // setisLoading(false);
//     dispatch({type: 'REGISTER', id: name, token: userToken});
//   },
// }));

// useEffect(() => {
//   SplashScreen.hide();
//   setTimeout(async () => {
//     let userToken;
//     userToken = null;
//     try {
//       userToken = await AsyncStorage.getItem('userToken');
//     } catch (err) {
//       console.log(err);
//     }
//     dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
//     // setisLoading(false);
//   }, 100);
// }, []);

// if (loginState.isLoading) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#000000',
//       }}>
//       <ActivityIndicator size="large" color="cyan" />
//     </View>
//   );
// }

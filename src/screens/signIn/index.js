import React from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import styles from './styles'
import {loginAction} from '../../store/actions/authActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'

class SigninScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      checkTextInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
      error: ""
    }
  }

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			JSON.stringify(
				nextProps.auth.error !== JSON.stringify(prevState.error)
			)
		) {
			return {
				error: nextProps.auth.error,
			}
		}
		return null
	}

  // const {signIn} = React.useContext(AuthContext);

  textInputChange = (value) => {
    let len = value.trim().length
    let isFound = false
    for (let i = 0; i < len; i++) {
      if (value[i] == '@') {
        isFound = true
      }
    }
    // if (value.trim().length >= 4) {
    if (isFound) {
      this.setState({
        email: value,
        checkTextInputChange: true,
        isValidUser: true,
      })
    } else {
      this.setState({
        email: value,
        checkTextInputChange: false,
        isValidUser: false,
      })
    }
  }

  passwordTextChange = (value) => {
    if (value.trim().length >= 6) {
      this.setState({
        password: value,
        isValidPassword: true,
      })
    } else {
      this.setState({
        password: value,
        isValidPassword: false,
      })
    }
  }

  updateEntryText = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    })
  }

  handleValidUser = (val) => {
    let len = val.trim().length
    let isFound = false
    for (let i = 0; i < len; i++) {
      if (val[i] == '@') {
        isFound = true
      }
    }
    // if (val.trim().length > 3) {
    if (isFound) {
      this.setState({
        isValidUser: true,
      })
    } else {
      this.setState({
        isValidUser: false,
      })
    }
  }

  loginHandle = () => {
    const {email, password} = this.state
    if (email.length == 0 || password.length == 0) {
      Alert.alert(
        'Empty Input :(',
        'Email or Password field can not be empty!',
        [{text: 'Okay'}],
      )
      return
    }

    // console.log(email, password)

    this.props.showLoading()
    this.props.loginAction(
      {
        email,
        password,
        // loginType: 'normal',
      },
    )
    this.props.hideLoading()
  }

  render() {
    const {navigation, auth} = this.props
    // console.log('Login', auth)
    const {height} = Dimensions.get('screen')
    let screenHeight = height * 0.3

    const {
      checkTextInputChange,
      secureTextEntry,
      isValidUser,
      isValidPassword,
      error
    } = this.state
    // console.log(error)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0,184,249)" barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            source={require('../../../assets/images/logo2.jpg')}
            style={{width: '100%', height: screenHeight}}
          />
          <Text style={styles.text_header}> Accedi </Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          {/* {error.email && <View style={styles.errorBox}><Text>{error.email}</Text></View>} */}
          {/* {error.password && <View style={styles.errorBox}><Text>{error.password}</Text></View>} */}
          {error.length > 0 && <View style={styles.errorBox}><Text>{error}</Text></View>}
          
          <Text style={styles.text_footer}> E-mail </Text>
          <View style={styles.action}>
            <Feather name="at-sign" size={22} color="yellow" />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="grey"
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
              style={styles.textInput}
              onChangeText={(value) => this.textInputChange(value)}
              onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
            />
            {checkTextInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="cyan" size={21} />
              </Animatable.View>
            ) : null}
          </View>
          {isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}> E-mail should contain '@'</Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer, {marginTop: 30}]}> Password </Text>
          <View style={styles.action}>
            <Feather name="key" size={23} color="yellow" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="grey"
              returnKeyType="go"
              autoCapitalize="none"
              blurOnSubmit={false}
              secureTextEntry={secureTextEntry ? true : false}
              style={styles.textInput}
              onChangeText={(value) => this.passwordTextChange(value)}
            />
            <TouchableOpacity onPress={this.updateEntryText}>
              {secureTextEntry ? (
                <Animatable.View animation="fadeIn">
                  <Feather name="eye-off" color="cyan" size={22} />
                </Animatable.View>
              ) : (
                <Animatable.View animation="shake">
                  <Feather name="eye" color="cyan" size={22} />
                </Animatable.View>
              )}
            </TouchableOpacity>
          </View>

          {isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password should be at least 6 characters
              </Text>
            </Animatable.View>
          )}

          <Animatable.View
            animation="shake"
            style={{alignItems: 'flex-end', marginTop: 25}}>
            <TouchableOpacity
              style={{paddingTop: 5, paddingBottom: 10}}
              onPress={() => navigation.navigate('ForgetPasswordScreen')}>
              <Text style={{color: 'deepskyblue', fontSize: 17}}>
                Password dimenticata?
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                this.loginHandle()
              }}>
              <LinearGradient
                colors={['yellow', 'hotpink', 'cyan']}
                useAngle={true}
                angle={75}
                style={styles.signIn}>
                <Text style={styles.textSign}> Accedi </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{width: '100%', marginTop: 20}}
              onPress={() => navigation.navigate('SignupScreen')}>
              <LinearGradient
                colors={['#323232', 'hotpink', '#323232']}
                useAngle={true}
                angle={75}
                style={{
                  height: 38,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={styles.textSign}> Registrati </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

const SigninScreenFunction = (props) => {
  const navigation = useNavigation()

  return <SigninScreen {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {
  loginAction,
  showLoading,
  hideLoading,
})(SigninScreenFunction)

// const SigninScreen = ({navigation}) => {
//   const [data, setData] = React.useState({
//     email: '',
//     password: '',
//     checkTextInputChange: false,
//     secureTextEntry: true,
//     isValidUser: true,
//     isValidPassword: true,
//   });

//   // const {signIn} = React.useContext(AuthContext);

//   const textInputChange = (value) => {
//     let len = value.trim().length;
//     let isFound = false;
//     for (let i = 0; i < len; i++) {
//       if (value[i] == '@') {
//         isFound = true;
//       }
//     }
//     // if (value.trim().length >= 4) {
//     if (isFound) {
//       setData({
//         ...data,
//         email: value,
//         checkTextInputChange: true,
//         isValidUser: true,
//       });
//     } else {
//       setData({
//         ...data,
//         email: value,
//         checkTextInputChange: false,
//         isValidUser: false,
//       });
//     }
//   };

//   const passwordTextChange = (value) => {
//     if (value.trim().length >= 8) {
//       setData({
//         ...data,
//         password: value,
//         isValidPassword: true,
//       });
//     } else {
//       setData({
//         ...data,
//         password: value,
//         isValidPassword: false,
//       });
//     }
//   };

//   const updateEntryText = () => {
//     setData({
//       ...data,
//       secureTextEntry: !data.secureTextEntry,
//     });
//   };

//   const handleValidUser = (val) => {
//     let len = val.trim().length;
//     let isFound = false;
//     for (let i = 0; i < len; i++) {
//       if (val[i] == '@') {
//         isFound = true;
//       }
//     }
//     // if (val.trim().length > 3) {
//     if (isFound) {
//       setData({
//         ...data,
//         isValidUser: true,
//       });
//     } else {
//       setData({
//         ...data,
//         isValidUser: false,
//       });
//     }
//   };

//   const loginHandle = (username, password) => {
//     const foundUser = Users.filter((item) => {
//       return username == item.userName && password == item.password;
//     });

//     if (data.email.length == 0 || data.password.length == 0) {
//       Alert.alert(
//         'Empty Input :(',
//         'Email or Password field can not be empty!',
//         [{text: 'Okay'}],
//       );
//       return;
//     }

//     if (foundUser.length == 0) {
//       Alert.alert('Invalid User :(', 'Errore nella registrazione!', [
//         {text: 'Okay'},
//       ]);
//       return;
//     }
//     // signIn(username, password);
//     // signIn(foundUser);
//   };

//   const {height} = Dimensions.get('screen');
//   let screenHeight = height * 0.3;

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="rgb(0,184,249)" barStyle="light-content" />
//       <View style={styles.header}>
//         <Animatable.Image
//           animation="bounceIn"
//           source={require('../../../assets/images/logo2.jpg')}
//           style={{width: '100%', height: screenHeight}}
//         />
//         <Text style={styles.text_header}> Accedi </Text>
//       </View>

//       <Animatable.View animation="fadeInUpBig" style={styles.footer}>
//         <Text style={styles.text_footer}> E-mail </Text>
//         <View style={styles.action}>
//           <Feather name="at-sign" size={22} color="yellow" />
//           <TextInput
//             placeholder="E-mail"
//             placeholderTextColor="grey"
//             autoCapitalize="none"
//             style={styles.textInput}
//             onChangeText={(value) => textInputChange(value)}
//             onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
//           />
//           {data.checkTextInputChange ? (
//             <Animatable.View animation="bounceIn">
//               <Feather name="check-circle" color="cyan" size={21} />
//             </Animatable.View>
//           ) : null}
//         </View>
//         {data.isValidUser ? null : (
//           <Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.errorMsg}> E-mail should contain '@'</Text>
//           </Animatable.View>
//         )}

//         <Text style={[styles.text_footer, {marginTop: 30}]}> Password </Text>
//         <View style={styles.action}>
//           <Feather name="key" size={23} color="yellow" />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="grey"
//             secureTextEntry={data.secureTextEntry ? true : false}
//             style={styles.textInput}
//             onChangeText={(value) => passwordTextChange(value)}
//           />
//           <TouchableOpacity onPress={updateEntryText}>
//             {data.secureTextEntry ? (
//               <Animatable.View animation="fadeIn">
//                 <Feather name="eye-off" color="cyan" size={22} />
//               </Animatable.View>
//             ) : (
//               <Animatable.View animation="shake">
//                 <Feather name="eye" color="cyan" size={22} />
//               </Animatable.View>
//             )}
//           </TouchableOpacity>
//         </View>

//         {data.isValidPassword ? null : (
//           <Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.errorMsg}>
//               Password should be at least 8 characters
//             </Text>
//           </Animatable.View>
//         )}

//         <Animatable.View
//           animation="shake"
//           style={{alignItems: 'flex-end', marginTop: 25}}>
//           <TouchableOpacity style={{paddingTop: 5, paddingBottom:10}} onPress={() => navigation.navigate('ForgetPasswordScreen')}>
//             <Text style={{color:'deepskyblue', fontSize: 17}}>Password dimenticata?</Text>
//           </TouchableOpacity>
//           {/* <Button
//             title="Password dimenticata?"
//             color="deepskyblue"
//             fontSize={13}
//             style={{fontSize: 15}}
//             onPress={() => navigation.navigate('ForgetPasswordScreen')}
//           /> */}
//         </Animatable.View>

//         <View style={styles.button}>
//           <TouchableOpacity
//             style={styles.signIn}
//             onPress={() => {
//               loginHandle(data.email, data.password);
//             }}>
//             <LinearGradient
//               colors={['yellow', 'hotpink', 'cyan']}
//               useAngle={true}
//               angle={75}
//               style={styles.signIn}>
//               <Text style={styles.textSign}> Accedi </Text>
//             </LinearGradient>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{width: '100%', marginTop: 20}}
//             onPress={() => navigation.navigate('SignupScreen')}>
//             <LinearGradient
//               colors={['#323232', 'hotpink', '#323232']}
//               useAngle={true}
//               angle={75}
//               style={{
//                 height: 38,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 10,
//               }}>
//               <Text style={styles.textSign}> Registrati </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </Animatable.View>
//     </View>
//   );
// };

// export default SigninScreen;

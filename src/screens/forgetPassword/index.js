import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import styles from './styles';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
// import {AuthContext} from '../../components/Context';
// import Animated from 'react-native-reanimated';
// import Users from '../../../model/users';

const ForgetPasswordScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    // password: '',
    checkTextInputChange: false,
    // secureTextEntry: true,
    isValidUser: true,
    // isValidPassword: true,
  });

  //   const {signIn} = React.useContext(AuthContext);

  const textInputChange = (value) => {
    let len = value.trim().length;
    let isFound = false;
    for (let i = 0; i < len; i++) {
      if (value[i] == '@') {
        isFound = true;
      }
    }
    if (isFound) {
      setData({
        ...data,
        email: value,
        checkTextInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        checkTextInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = (val) => {
    let len = val.trim().length;
    let isFound = false;
    for (let i = 0; i < len; i++) {
      if (val[i] == '@') {
        isFound = true;
      }
    }
    // if (val.trim().length > 3) {
    if (isFound) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const RecoverHandler = (val) => {
    let len = val.trim().length;
    let isFound = false;
    for (let i = 0; i < len; i++) {
      if (val[i] == '@') {
        isFound = true;
      }
    }
    if (val.trim().length != 0 && isFound) {
      Alert.alert('Hurray :)', 'Recover link is sent to your email', [
        {text: 'Okay'},
      ]);
    } else {
      Alert.alert('Invalid Message :(', "E-mail doesn't match with our database", [
        {text: 'Okay'},
      ]);
    }
  };

  const {height} = Dimensions.get('screen');
  let screenHeight = height * 0.3;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgb(0,184,249)" barStyle="light-content" />
      <View style={styles.header}>
      <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/images/logo2.jpg')}
          style={{width: '100%', height: screenHeight}}
        />
        <Text style={styles.text_header}> Password Dimenticata? </Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}> E-mail </Text>
        <View style={styles.action}>
          <Feather name="at-sign" size={22} color="yellow" />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="grey"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(value) => textInputChange(value)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="cyan" size={21} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}> E-mail should contain '@'</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              RecoverHandler(data.email);
            }}>
            <LinearGradient
              colors={['yellow', 'hotpink', 'cyan']}
              useAngle={true}
              angle={75}
              style={styles.signIn}>
              <Text style={styles.textSign}> Recupera ora </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '100%', marginTop: 20}}
            onPress={() => navigation.navigate('SigninScreen')}>
            <LinearGradient
              colors={['#323232', 'hotpink', '#323232']}
              useAngle={true}
              angle={75}
              style={{
                height: Platform.OS == 'ios' ? 35 : 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={styles.textSign}> Oppure accedi ora </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgetPasswordScreen;

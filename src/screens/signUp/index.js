import React from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  TouchableHighlight,
  Button,
  ScrollView,
  // Option
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import RadioButton from '../../components/RadioButton'
// import DatePicker from 'react-native-date-picker'
import ModalView from '../../components/Modal'
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal'
import Checkbox from '../../components/Checkbox'
import styles from './styles'
import {registerAction} from '../../store/actions/authActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'

class SignupScreenClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isValidUser: true,
      password: '',
      isValidPassword: true,
      confimPassword: '',
      matchedPassword: true,
      checkTextInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,

      name: '',
      cogname: '',
      male: true,
      female: false,
      gendar: 'male',
      date: new Date(),
      dateChange: 'nope',
      modalVisible: false,
      country: '',
      countryCode: 'IT',
      terms: false,
      privacy: false,
      copyright: false,

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
  
  textInputChange = (value) => {
    let len = value.trim().length
    let isFound = false
    for (let i = 0; i < len; i++) {
      if (value[i] == '@') {
        isFound = true
      }
    }
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

  nameChange = (value) => {
    this.setState({name: value})
  }
  cogNameChange = (value) => {
    this.setState({cogname: value})
  }

  handleValidUser = (val) => {
    let len = val.trim().length
    let isFound = false
    for (let i = 0; i < len; i++) {
      if (val[i] == '@') {
        isFound = true
      }
    }
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

  confirmPasswordTextChange = (value) => {
    const {password} = this.state
    if (password !== value.trim()) {
      this.setState({confimPassword: value, matchedPassword: false})
    } else if (password === value.trim()) {
      this.setState({confimPassword: value, matchedPassword: true})
    }
    // this.setState({
    //   confimPassword: value,
    // })
  }

  handleMatchPassword = (value) => {
    const {password} = this.state
    if (password !== value.trim()) {
      this.setState({matchedPassword: false})
    } else if (password === value.trim()) {
      this.setState({matchedPassword: true})
    }
  }

  updateEntryText = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    })
  }

  updateConfirmEntryText = () => {
    this.setState({
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry,
    })
  }

  // const [male, setMale] = React.useState(true)
  // const [female, setFemale] = React.useState(false)
  // const [gendar, setGendar] = React.useState('male')

  maleHandler = () => {
    const {female} = this.state
    if (female) {
      this.setState({female: false, gendar: 'male', male: true})
      // setFemale(false)
      // setGendar('male')
      // setMale(true)
    } else {
      this.setState({gendar: 'male', male: true})
      // setMale(true)
      // setGendar('male')
    }
  }

  femaleHandler = () => {
    const {male} = this.state
    if (male) {
      this.setState({female: true, gendar: 'female', male: false})
      // setMale(false)
      // setGendar('female')
      // setFemale(true)
    } else {
      this.setState({female: true, gendar: 'female'})
      // setFemale(true)
      // setGendar('female')
    }
  }

  setDate = (selectedDate) => {
    this.setState({date: selectedDate, dateChange: selectedDate})
  }

  // const [date, setDate] = React.useState(new Date())
  // const [modalVisible, setModalVisible] = React.useState(false)
  // const today = new Date()

  // const [country, setCountry] = React.useState(null)
  // const [countryCode, setCountryCode] = React.useState(null)

  onSelect = (country) => {
    // console.log(country)
    this.setState({country: country.name, countryCode: country.cca2})
    // setCountry(country.name)
    // setCountryCode(country.cca2)
  }

  // const [terms, setTerms] = React.useState(false)
  // const [privacy, setPrivacy] = React.useState(false)
  // const [copyright, setCopyright] = React.useState(false)

  termsHandler = () => {
    const {terms} = this.state
    if (terms) {
      this.setState({terms: false})
      // setTerms(false)
    } else {
      this.setState({terms: true})
      // setTerms(true)
    }
  }
  privacyHandler = () => {
    const {privacy} = this.state
    if (privacy) {
      this.setState({privacy: false})
      // setPrivacy(false)
    } else {
      this.setState({privacy: true})
      // setPrivacy(true)
    }
  }
  copyrightHandler = () => {
    const {copyright} = this.state
    if (copyright) {
      this.setState({copyright: false})
      // setCopyright(false)
    } else {
      this.setState({copyright: true})
      // setCopyright(true)
    }
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  registerHandle = () => {
    const {
      name,
      cogname,
      email,
      password,
      confimPassword,
      date,
      gendar,
      country,
      countryCode,
      terms,
      privacy,
      copyright,
    } = this.state

    // console.log(date.getDay(), date.getFullYear(), date.getMonth()+1)
    let finalDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
    // console.log(typeof(finalDate), finalDate)
    // console.log(date.toLocaleDateString().length, gendar, country, countryCode)

    if (!terms) {
      Alert.alert('Checkbox', "'Terms' checkbox should be selected", [
        {text: 'Ok'},
      ])
      return
    }
    if (!privacy) {
      Alert.alert('Checkbox', "'Privacy' checkbox should be selected", [
        {text: 'Ok'},
      ])
      return
    }
    if (!copyright) {
      Alert.alert('Checkbox', "'Copyright' checkbox should be selected", [
        {text: 'Ok'},
      ])
      return
    }
    if (
      name.length == 0 ||
      cogname.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confimPassword.length == 0 ||
      date.toLocaleDateString().length == 0 ||
      gendar.length == 0 ||
      countryCode.length == 0
    ) {
      Alert.alert('Empty Input :(', 'No field can not be empty!', [
        {text: 'Okay'},
      ])
      return
    }

    this.props.showLoading()
    this.props.registerAction({
      nome: name,
      cognome: cogname,
      email: email,
      password: password,
      password_confirmation: password,
      sesso: gendar === 'male' ? 'M' : 'F',
      attivo: 1,
      cf: 'PRVTNT66M18ITAN',
      cf_key: '167d7dbd53aa733376abc7cb05e867f7',
      catasto: countryCode,
      data_nascita: finalDate,
      image_profile: 'upload/profile/BOuJwu82sJKY.jpg',
      deceduto: 0,
      notifiche: 0,
    })
    this.props.hideLoading()
  }

  render() {
    const {
      checkTextInputChange,
      secureTextEntry,
      confirmSecureTextEntry,
      date,
      modalVisible,
      male,
      female,
      countryCode,
      terms,
      privacy,
      copyright,
      isValidUser,
      isValidPassword,
      matchedPassword,
      dateChange,
      error
    } = this.state
    
    const {navigation} = this.props

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="deepskyblue" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}> Registrati Ora </Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
          {error.email && <View style={styles.errorBox}><Text>{error.email}</Text></View>}
          {error.password && <View style={styles.errorBox}><Text>{error.password}</Text></View>}
          {error.length > 0 && <View style={styles.errorBox}><Text>{error}</Text></View>}
            <View style={styles.action}>
              <Feather name="user" size={22} color="yellow" />
              <TextInput
                placeholder="Nome"
                placeholderTextColor="grey"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={(value) => this.nameChange(value)}
              />
            </View>

            <View style={styles.action}>
              <Feather name="user" size={22} color="yellow" />
              <TextInput
                placeholder="Cognome"
                placeholderTextColor="grey"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={(value) => this.cogNameChange(value)}
              />
            </View>

            <View style={styles.action}>
              <Feather name="at-sign" size={21} color="yellow" />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="grey"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={(value) => this.textInputChange(value)}
                onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
                // onChangeText={(value) => textInputChange(value)}
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

            <View style={styles.action}>
              <Feather name="key" size={22} color="yellow" />
              <TextInput
                placeholder="Password (Min 8 caratteri)"
                placeholderTextColor="grey"
                returnKeyType="next"
                autoCapitalize="none"
                blurOnSubmit={false}
                secureTextEntry={secureTextEntry ? true : false}
                style={styles.textInputW}
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

            <View style={styles.action}>
              <Feather name="key" size={22} color="yellow" />
              <TextInput
                placeholder="Ripeti la Password (Min 8 caratteri)"
                placeholderTextColor="grey"
                returnKeyType="next"
                autoCapitalize="none"
                blurOnSubmit={false}
                secureTextEntry={confirmSecureTextEntry ? true : false}
                style={styles.textInputW}
                onChangeText={(value) => this.confirmPasswordTextChange(value)}
                onEndEditing={(e) =>
                  this.handleMatchPassword(e.nativeEvent.text)
                }
              />
              <TouchableOpacity onPress={this.updateConfirmEntryText}>
                {confirmSecureTextEntry ? (
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
            {matchedPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password doesn't match</Text>
              </Animatable.View>
            )}

            <TouchableOpacity onPress={this.toggleModal}>
              <View style={styles.forCalendar}>
                <Feather name="calendar" size={21} color="yellow" />
                {dateChange === 'nope' ? (
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 16,
                      marginLeft: 11,
                      marginTop: 1,
                    }}>
                    Data di nascita
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'silver',
                      fontSize: 16,
                      marginLeft: 11,
                      marginTop: 1,
                    }}>
                    {date.toLocaleDateString()}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <ModalView
              date={date}
              setDate={this.setDate}
              modalVisible={modalVisible}
              onPress={this.toggleModal}
            />

            <View style={[styles.actionW, {marginTop: 13}]}>
              <View style={{flexDirection: 'row'}}>
                {male ? (
                  <Text style={{color: 'cyan', fontSize: 16}}>Maschio</Text>
                ) : (
                  <Text style={{color: '#fff', fontSize: 16}}>Maschio</Text>
                )}

                <RadioButton checked={male} onPress={this.maleHandler} />
              </View>
              <View style={{flexDirection: 'row'}}>
                {female ? (
                  <Text style={{color: 'cyan', fontSize: 16, marginLeft: 30}}>
                    Femmina
                  </Text>
                ) : (
                  <Text style={{color: '#fff', fontSize: 16, marginLeft: 30}}>
                    Femmina
                  </Text>
                )}

                <RadioButton checked={female} onPress={this.femaleHandler} />
              </View>
            </View>

            <Text
              style={{
                color: 'cyan',
                fontSize: 16,
                marginLeft: 6,
                marginTop: 12,
              }}>
              Nazione di nascita
            </Text>

            <View
              style={{
                marginTop: 10,
                backgroundColor: '#4c4c4c',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Feather
                name="maximize"
                size={21}
                color="yellow"
                style={{padding: 8}}
              />
              <View style={countryCode ? {marginTop: 2} : {marginTop: 9}}>
                <CountryPicker
                  withFilter={true}
                  withAlphaFilter={true}
                  withCountryNameButton={true}
                  countryCode={countryCode}
                  // region={true}
                  // withFlag={false}
                  // withFlagButton={true}
                  filterProps={{autoFocus: true, placeholder: 'Search'}}
                  autoFocus={true}
                  onSelect={this.onSelect}
                  theme={DARK_THEME}
                  // visible
                />
              </View>
            </View>

            <View style={{marginTop: 7}} />
            <Checkbox
              termsHandler={this.termsHandler}
              terms={terms}
              text="Accetto i termini e le condizioni di utilizo"
            />
            <Checkbox
              termsHandler={this.privacyHandler}
              terms={privacy}
              text="Dichiaro di aver letto e compreso la privacy policy"
            />
            <Checkbox
              termsHandler={this.copyrightHandler}
              terms={copyright}
              text="Dichiaro di aver preso visione e compreso le norme sul copyright"
            />

            <View style={[styles.button, {marginBottom: 20}]}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={this.registerHandle}>
                <LinearGradient
                  colors={['yellow', 'hotpink', 'cyan']}
                  useAngle={true}
                  angle={75}
                  style={styles.signIn}>
                  <Text style={styles.textSign}> Registrami ora </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.signIn, {marginTop: 14}]}
                onPress={() => navigation.navigate('SigninScreen')}>
                <LinearGradient
                  colors={['#323232', 'hotpink', '#323232']}
                  useAngle={true}
                  angle={75}
                  style={styles.signIn}>
                  <Text style={styles.textSign}> Hai giå un account? </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
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

const SignupScreen = (props) => {
  const navigation = useNavigation()
  return <SignupScreenClass {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {
  registerAction,
  showLoading,
  hideLoading,
})(SignupScreen)

// Alert.alert('Checkbox Error', 'Please select all checkbox', [{text: 'Okay'}])

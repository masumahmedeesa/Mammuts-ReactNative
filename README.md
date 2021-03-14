## AUDIO TESTING 
https://mammuts.it/vocal/audio/commento_02ub1clxr.wav  656
https://mammuts.it/vocal/audio/commento_2gx61e8ym.wav  904
https://mammuts.it/vocal/audio/commento_3ov1kc3k6.wav  1.5
https://mammuts.it/vocal/audio/commento_55ygxeuu9.wav  1.46
https://mammuts.it/vocal/audio/E2jj06VM9hf1yVHC8jSI4duZXb9EovgamMuEGBKz.aac  76.77
https://mammuts.it/vocal/audio/YyJYCY53KWyPfELvqoJkkHmoyqSSPSFb5PLWvzaA.aac  90

### TO RUN ON ANDROID
JUST RUN 
- chsh -s /bin/bash
- adb devices
- react-native run-android


## react-native-unimodules
Installing EXConstants (9.3.5)
Installing EXFileSystem (9.3.0)
Installing EXImageLoader (1.3.0)
Installing EXPermissions (10.0.0)
Installing UMAppLoader (1.4.0)
Installing UMBarCodeScannerInterface (5.4.0)
Installing UMCameraInterface (5.4.0)
Installing UMConstantsInterface (5.4.0)
Installing UMCore (6.0.0)
Installing UMFaceDetectorInterface (5.4.0)
Installing UMFileSystemInterface (5.4.0)
Installing UMFontInterface (5.4.0)
Installing UMImageLoaderInterface (5.4.0)
Installing UMPermissionsInterface (5.4.0)
Installing UMReactNativeAdapter (5.7.0)
Installing UMSensorsInterface (5.4.0)
Installing UMTaskManagerInterface (5.4.0)

### COMMANDS
react-native start --reset-cache
npm install --save expo-av

## UPDATE
Create OtherStoryScreen for showing other people's stories under of course ProfileStack Screen. 'Remove or add ties' would be good. AND SearchStackScreen also

### https://mammuts.it/upload/profile/logo_mammuts.png

## IMAGE UPLOADING FIXED 
https://stackoverflow.com/questions/54663887/missing-request-token-for-request

1. npm install @react-navigation/native
2. npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

3. npm install @react-navigation/stack
4. npm install @react-navigation/drawer
5. npm install --save react-native-vector-icons
 npm install --save @react-native-community/async-storage
 npm install --save react-native-linear-gradient

6. cd ios && pod install
7. <key>UIViewControllerBasedStatusBarAppearance</key>
	<false/>
	<key>UIAppFonts</key>
	<array>
		<string>Roboto_medium.ttf</string>
		<string>Roboto.ttf</string>
		<string>Ubuntu-Regular.ttf</string>
		<string>AntDesign.ttf</string>
		<string>Entypo.ttf</string>
		<string>EvilIcons.ttf</string>
		<string>Feather.ttf</string>
		<string>FontAwesome.ttf</string>
		<string>FontAwesome5_Brands.ttf</string>
		<string>FontAwesome5_Regular.ttf</string>
		<string>FontAwesome5_Solid.ttf</string>
		<string>Fontisto.ttf</string>
		<string>Foundation.ttf</string>
		<string>Ionicons.ttf</string>
		<string>MaterialCommunityIcons.ttf</string>
		<string>MaterialIcons.ttf</string>
		<string>Octicons.ttf</string>
		<string>SimpleLineIcons.ttf</string>
		<string>Zocial.ttf</string>
	</array>

8. npx react-native run-ios --simulator="iPhone 11 Pro"

npm install @react-navigation/material-bottom-tabs react-native-paper
npm install --save react-native-animatable

### UNINSTALL COMMANDS
react-native unlink <lib name>
react-native uninstall <lib name>
- npm uninstall react-native-gesture-handler
- react-native unlink react-native-gesture-handler --platforms ios

### ERRORS
1. 
Showing Recent Messages
Multiple commands produce '/Users/masumahmed/Library/Developer/Xcode/DerivedData/Mammuts-ehwzyfdmowujthahcsphmsijhyaw/Build/Products/Debug-iphonesimulator/Mammuts.app/MaterialIcons.ttf':
1) Target 'Mammuts' (project 'Mammuts') has copy command from '/Volumes/Tasks/Freelances/Mammuts/node_modules/native-base/Fonts/MaterialIcons.ttf' to '/Users/masumahmed/Library/Developer/Xcode/DerivedData/Mammuts-ehwzyfdmowujthahcsphmsijhyaw/Build/Products/Debug-iphonesimulator/Mammuts.app/MaterialIcons.ttf'
2) That command depends on command in Target 'Mammuts' (project 'Mammuts'): script phase “[CP] Copy Pods Resources”
Solution_ 'Mammuts' target > Build Phases > Copy Bundle Resources > [Delete whatever causes Problem]

2. If problem with /node_modules/react-native-date-picker/ios/RNDatePicker/DatePicker.m:58:18: Property 'preferredDatePickerStyle' not found on object of type 'DatePicker *'
or, (on Command)
The following build commands failed:
	CompileC /Users/masumahmed/Library/Developer/Xcode/DerivedData/Mammuts-ehwzyfdmowujthahcsphmsijhyaw/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/react-native-date-picker.build/Objects-normal/x86_64/DatePicker.o /Volumes/Tasks/Freelances/Mammuts/node_modules/react-native-date-picker/ios/RNDatePicker/DatePicker.m normal x86_64 objective-c com.apple.compilers.llvm.clang.1_0.compiler
(1 failure)

Just run the project on XCode and commnet the line which causes error.
Go Pods > Development Pods > react-native-date-picker > RNDatePickerManager.m

//        if(@available(iOS 14, *)) {
//            self.preferredDatePickerStyle = UIDatePickerStyleWheels;
//        }


## To add fonts
npx react-native link

## henninghall/react-native-date-picker
	npm install react-native-date-picker --save
	cd ios && pod install


        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            <View
              style={{
                height: screenHeight * 0.34,
                width: screenWidth,
                alignItems: 'center',
                backgroundColor: '#323232',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <DatePicker
                textColor="hotpink"
                date={date}
                mode="date"
                onDateChange={setDate}
              />

              <TouchableHighlight
                style={{
                  backgroundColor: '#2196F3',
                  width: screenWidth * 0.83,
                  padding: 4,
                  borderRadius: 8,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>
                  Impostare la data
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}


### WROKABLE RECORD.js

import React, {Component} from 'react'
import {
  Button,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Animated,
} from 'react-native'
import Axios from 'axios'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import {
  Player,
  Recorder,
  MediaStates,
} from '@react-native-community/audio-toolkit'
import {useNavigation} from '@react-navigation/native'
import {URLS} from '../../../config/urls'
import styles from './styles'
import {TouchableOpacity} from 'react-native-gesture-handler'

// import filename from './mm.aac'
const filename = 'mm.aac'

type Props = {}

type State = {
  playPauseButton: string,
  recordButton: string,

  stopButtonDisabled: boolean,
  playButtonDisabled: boolean,
  recordButtonDisabled: boolean,

  loopButtonStatus: boolean,
  progress: number,

  error: string | null,
}

class Record extends Component {
  player: Player | null
  recorder: Recorder | null
  lastSeek: number
  _progressInterval: IntervalID

  constructor(props: Props) {
    super(props)

    this.state = {
      playPauseButton: 'Preparing...',
      recordButton: 'Preparing...',

      stopButtonDisabled: true,
      playButtonDisabled: true,
      recordButtonDisabled: true,

      loopButtonStatus: false,
      progress: 0,
      duration: 0,
      currentTime: 0,

      error: null,

      isPressed: false,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1),

      // recordings: []
    }
  }

  componentDidMount() {
    this.player = null
    this.recorder = null
    this.lastSeek = 0

    this._reloadPlayer()
    this._reloadRecorder()

    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {
        let currentProgress =
          Math.max(0, this.player.currentTime) / this.player.duration
        // console.log('duration', this.player.currentTime)
        if (isNaN(currentProgress)) {
          currentProgress = 0
        }
        this.setState({
          progress: currentProgress,
          duration: this.player.duration / 1000 / 60,
          currentTime: this.player.currentTime / 1000 / 60,
        })
      }
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this._progressInterval)
  }

  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200
  }

  _updateState(err) {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
      recordButton:
        this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',

      stopButtonDisabled: !this.player || !this.player.canStop,
      playButtonDisabled: !this.player || !this.player.canPlay,
      playButtonDisabled:
        !this.player || !this.player.canPlay || this.recorder.isRecording,
      recordButtonDisabled:
        !this.recorder || (this.player && !this.player.isStopped),
    })
  }

  _playPause() {
    this.player.playPause((err, paused) => {
      if (err) {
        this.setState({
          error: err.message,
        })
      }
      this._updateState()
    })
  }

  _stop() {
    this.player.stop(() => {
      this._updateState()
    })
  }

  _seek(percentage) {
    if (!this.player) {
      return
    }

    this.lastSeek = Date.now()

    let position = percentage * this.player.duration
    // console.log("position")
    this.player.seek(position, () => {
      this._updateState()
    })
  }

  _reloadPlayer() {
    if (this.player) {
      this.player.destroy()
    }

    this.player = new Player(filename, {
      autoDestroy: false,
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():')
        console.log(err)
      } else {
        this.player.looping = this.state.loopButtonStatus
      }

      this._updateState()
    })

    this._updateState()

    this.player.on('ended', () => {
      this._updateState()
    })
    this.player.on('pause', () => {
      this._updateState()
    })
  }

  _reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy()
    }

    this.recorder = new Recorder(filename, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max',
    })

    this._updateState()
  }

  uploadData = async (data, url) => {
    console.log(data,'upload')
    const response = await Axios({
      method: 'post',
      url: url,
      data: data,
    })
    return response.data
  }

  _toggleRecord() {
    if (this.player) {
      this.player.destroy()
    }

    let recordAudioRequest
    if (Platform.OS == 'android') {
      recordAudioRequest = this._requestRecordAudioPermission()
    } else {
      recordAudioRequest = new Promise(function (resolve, reject) {
        resolve(true)
      })
    }

    recordAudioRequest.then((hasPermission) => {
      if (!hasPermission) {
        this.setState({
          error: 'Record Audio Permission was denied',
        })
        return
      }

      this.recorder.toggleRecord(async (err, stopped) => {
        if (err) {
          this.setState({
            error: err.message,
          })
        }
        if (stopped) {
          // console.log(this.recorder,'recording')
          const audioPath = this.recorder._fsPath
          console.log(audioPath)
          const data = new FormData()
          data.append('audio', {
            uri: audioPath,
            type: 'audio/aac',
            name: 'mammuts.aac',
            // type: 'multipart/form-data',
          })
          try {
            const cc = await this.uploadData(data, URLS.UPLOAD_AUDIO)
            console.log(cc)
          }catch(e){
            console.log(e,'audio')
          }
          // this.setState({recordings: [...this.state.recordings, this.recorder]})

          this._reloadPlayer()
          this._reloadRecorder()
        }

        this._updateState()
      })

    })
  }

  async _requestRecordAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'Mammuts needs access to your microphone for adding Recordings to your Memory.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }

  _toggleLooping(value) {
    this.setState({
      loopButtonStatus: value,
    })
    if (this.player) {
      this.player.looping = value
    }
  }

  _runAnimation = () => {
    const {animated, opacityA} = this.state
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start()
  }
  _stopAnimation = () => {
    Animated.loop(
      Animated.parallel([Animated.timing(animated), Animated.timing(opacityA)]),
    ).stop()
  }

  _micButton() {
    const {isPressed, animated, opacityA} = this.state
    if (isPressed) {
      this._runAnimation()
      return (
        <Animated.View
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: 'rgb(0,184,249)',
            opacity: opacityA,
            transform: [
              {
                scale: animated,
              },
            ],
          }}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text style={{fontWeight: '600'}}>Recording</Text>
          </View>
        </Animated.View>
      )
    } else {
      //some function
      return (
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: 'rgb(0,184,249)',
          }}>
          <View style={{alignItems: 'center', marginTop: 13}}>
            <Icon name="mic" style={{fontSize: 50}} />
          </View>
        </View>
      )
    }
  }

  render() {
    const {navigation} = this.props
    const {progress, duration, currentTime} = this.state
    // console.log(this.player)
    return (
      <View>
        <View style={styles.recordingAnime}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight
              style={{paddingTop: 5}}
              onPress={() => this._toggleRecord()}
              disabled={this.state.recordButtonDisabled}>
              {this._micButton()}
            </TouchableHighlight>
          </View>
          {Platform.OS === "android" &&
          <View style={{paddingTop: 15}}/>
          }
          
          <Button
            title={this.state.recordButton}
            disabled={this.state.recordButtonDisabled}
            onPress={() => this._toggleRecord()}
          />
        </View>

        <View style={styles.recordingAnime}>
          <View style={styles.slider}>
            <Slider
              step={0.0001}
              disabled={this.state.playButtonDisabled}
              onValueChange={(percentage) => this._seek(percentage)}
              value={this.state.progress}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'white', paddingLeft: 15}}>
              {currentTime.toFixed(2)}
            </Text>
            <Text style={{color: 'white', paddingRight: 10}}>
              {duration.toFixed(2)}
            </Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {this.state.playPauseButton === 'Play' ? (
              <TouchableOpacity
                disabled={this.state.playButtonDisabled}
                onPress={() => this._playPause()}>
                <Icon
                  name="play-circle"
                  color="rgb(0,184,249)"
                  style={{fontSize: 50}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={this.state.playButtonDisabled}
                onPress={() => this._playPause()}>
                <Icon
                  name="pause-circle"
                  color="rgb(0,184,249)"
                  style={{fontSize: 50}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{paddingBottom: 8}} />
          <View style={styles.settingsContainer}>
            <Text style={{color: '#EFF', paddingRight: 5}}>Ciclo continuo</Text>
            <Switch
              onValueChange={(value) => this._toggleLooping(value)}
              value={this.state.loopButtonStatus}
            />
          </View>
          <View style={{paddingBottom: 8}} />
        </View>
        {/* <View>
          <Button
            title="Torna indietro"
            onPress={() => navigation.popToTop()}
          />
        </View> */}
      </View>
    )
  }
}

const RecordFunction = (props) => {
  const navigation = useNavigation()
  return <Record {...props} navigation={navigation} />
}

export default RecordFunction


// Rocording information
// {"_duration": -1, "_fsPath": "/Users/masumahmed/Library/Developer/CoreSimulator/Devices/B24DB460-6B91-4975-86F4-BA54E18761BF/data/Containers/Data/Application/0EB08A1C-A88C-470A-8A03-D744D680E9C0/Documents/mm.aac", "_lastSync": -1, "_options": {"bitrate": 256000, "channels": 2, "quality": "max", "sampleRate": 44100}, "_path": "mm.aac", "_position": -1, "_recorderId": 20, "_state": -2}
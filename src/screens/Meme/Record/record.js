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
  TouchableOpacity,
  FlatList,
} from 'react-native'
import Axios from 'axios'
import {connect} from 'react-redux'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import {
  Player,
  Recorder,
  MediaStates,
} from '@react-native-community/audio-toolkit'
// import {useNavigation} from '@react-navigation/native'
// import {showLoading, hideLoading} from '../../../store/actions/supportActions'
import {getAudioFormData} from '../../../store/actions/audioActions'
import {URLS} from '../../../config/urls'
import styles from './styles'
import RecordPlayer from './RecordPlayer'

const filename = 'mammuts.aac'

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

      // uploadedList: [],
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

  // uploadData = async (data, url) => {
  //   // console.log(data,'upload')
  //   const response = await Axios({
  //     method: 'post',
  //     url: url,
  //     data: data,
  //   })
  //   return response.data
  // }

  // removeData = async (audioName) => {
  //   const response = await Axios.get(URLS.REMOVE_AUDIO + audioName)
  //   return response.data
  // }

  _toggleRecord() {
    if (this.player) {
      this.player.destroy()
    }

    // this.setState({isPressed: !this.state.isPressed})

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
          const audioPath = this.recorder._fsPath
          const data = new FormData()
          data.append('audio', {
            uri: audioPath,
            type: 'audio/aac',
            name: 'mammuts.aac',
            // type: 'multipart/form-data',
          })
          this.props.getAudioFormData(data)
          // let cc
          // try {
          //   cc = await this.uploadData(data, URLS.UPLOAD_AUDIO)
          // } catch (e) {
          //   console.log(e, 'audio')
          // }

          // let rmMessage = ''

          // if (uploadedList.length > 0) {
          //   try {
          //     rmMessage = await this.removeData(uploadedList[0].split('/')[1])
          //     const [, ...gg] = uploadedList
          //     uploadedList = gg
          //   } catch (e) {
          //     console.log(e, 'remove audio')
          //   }
          // }
          // this.setState({uploadedList: [...uploadedList, cc.audio]})

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
      // this._runAnimation()
      console.log('micButton')
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
    const {audio} = this.props
    const {duration, currentTime} = this.state
    if(audio.formdata === "{}"){
      console.log(audio.formdata)
    }
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
          {Platform.OS === 'android' && <View style={{paddingTop: 15}} />}

          <Button
            title={this.state.recordButton}
            disabled={this.state.recordButtonDisabled}
            onPress={() => this._toggleRecord()}
          />
        </View>
        {audio.formdata._parts ? (
          <View style={styles.recordingAnime}>
            <View style={styles.slider}>
              <Slider
                step={0.0001}
                disabled={this.state.playButtonDisabled}
                onValueChange={(percentage) => this._seek(percentage)}
                value={this.state.progress}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              <Text style={{color: '#EFF', paddingRight: 5}}>
                Ciclo continuo
              </Text>
              <Switch
                onValueChange={(value) => this._toggleLooping(value)}
                value={this.state.loopButtonStatus}
              />
            </View>
            <View style={{paddingBottom: 8}} />
          </View>
        ) : (
          <View />
        )}
      </View>
    )
  }
}

// const RecordFunction = (props) => {
//   const navigation = useNavigation()
//   return <Record {...props} navigation={navigation} />
// }
function mapStateToProps(state) {
  return {
    audio: state.audio,
  }
}

export default connect(mapStateToProps, {getAudioFormData})(Record)
// export default Record

// Rocording information
// {"_duration": -1, "_fsPath": "/Users/masumahmed/Library/Developer/CoreSimulator/Devices/B24DB460-6B91-4975-86F4-BA54E18761BF/data/Containers/Data/Application/0EB08A1C-A88C-470A-8A03-D744D680E9C0/Documents/mm.aac", "_lastSync": -1, "_options": {"bitrate": 256000, "channels": 2, "quality": "max", "sampleRate": 44100}, "_path": "mm.aac", "_position": -1, "_recorderId": 20, "_state": -2}

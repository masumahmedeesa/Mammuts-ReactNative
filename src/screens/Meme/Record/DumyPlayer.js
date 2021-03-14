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
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import {
  Player,
  Recorder,
  MediaStates,
} from '@react-native-community/audio-toolkit'
import {connect} from 'react-redux'
import {getAudioFormData} from '../../../store/actions/audioActions'
import styles from './styles'

const filename = 'test.webm'
// const filename = 'test.aac'

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

class DumyPlayer extends Component<Props, State> {
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
    // console.log(this.player)

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
      format: 'webm',
      quality: 'max',
    })

    this._updateState()
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

      this.recorder.toggleRecord((err, stopped) => {
        if (err) {
          this.setState({
            error: err.message,
          })
        }
        if (stopped) {
          const audioPath = this.recorder._fsPath
          console.log(audioPath)
          const data = new FormData()
          data.append('audio', {
            uri: audioPath,
            // type: 'audio/mp4',
            name: 'test.mp4',
            type: 'multipart/form-data',
          })
          // console.log(data)
          this.props.getAudioFormData(data)

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
            'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
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

  render() {
    const {audio} = this.props
    const {duration, currentTime, progress} = this.state
    // console.log(audio)
    return (
      <SafeAreaView>
        <View>
          <View style={styles.recordingAnime}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight
                style={{paddingTop: 5}}
                onPress={() => this._toggleRecord()}
                disabled={this.state.recordButtonDisabled}>
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
              </TouchableHighlight>
            </View>
            {Platform.OS === 'android' && <View style={{paddingTop: 15}} />}

            <Button
              title={this.state.recordButton}
              disabled={this.state.recordButtonDisabled}
              onPress={() => this._toggleRecord()}
            />
          </View>
          {JSON.stringify(audio.formdata) !== JSON.stringify({}) &&
          audio.formdata._parts ? (
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
            </View>
          ) : (
            <View />
          )}
        </View>
        {/* <View>
          <Text style={styles.title}>Playback</Text>
        </View>
        <View>
          <Button
            title={this.state.playPauseButton}
            disabled={this.state.playButtonDisabled}
            onPress={() => this._playPause()}
          />
          <Button
            title={'Stop'}
            disabled={this.state.stopButtonDisabled}
            onPress={() => this._stop()}
          />
        </View>
        <View style={styles.settingsContainer}>
          <Switch
            onValueChange={(value) => this._toggleLooping(value)}
            value={this.state.loopButtonStatus}
          />
          <Text>Toggle Looping</Text>
        </View>
        <View style={styles.slider}>
          <Slider
            step={0.0001}
            disabled={this.state.playButtonDisabled}
            onValueChange={(percentage) => this._seek(percentage)}
            value={this.state.progress}
          />
        </View>
        <View>
          <Text style={styles.title}>Recording</Text>
        </View>
        <View>
          <Button
            title={this.state.recordButton}
            disabled={this.state.recordButtonDisabled}
            onPress={() => this._toggleRecord()}
          />
        </View> */}
        {this.state.error && (
          <View>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                padding: 10,
                color: 'red',
              }}>
              {this.state.error}
            </Text>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
  }
}

export default connect(mapStateToProps, {getAudioFormData})(DumyPlayer)

// const styles = StyleSheet.create({
//   slider: {
//     height: 10,
//     margin: 10,
//     marginBottom: 50,
//   },
//   settingsContainer: {
//     alignItems: 'center',
//   },
//   container: {
//     borderRadius: 4,
//     borderWidth: 0.5,
//     borderColor: '#d6d7da',
//   },
//   title: {
//     fontSize: 19,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 20,
//   },
//   errorMessage: {
//     fontSize: 15,
//     textAlign: 'center',
//     padding: 10,
//     color: 'red',
//   },
// })

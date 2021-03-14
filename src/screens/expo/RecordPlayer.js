import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {Buffer} from 'buffer'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'
import {getAudioFormData} from '../../store/actions/audioActions'

class RecordPlayer extends Component {
  sound = null
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
    count: 0,
    duration: 0,
    time: 0,
    showing: 0,
    error: '',
    // playing: false
  }

  async componentDidMount() {
    // await this.checkPermission();

    let recordAudioRequest
    if (Platform.OS == 'android') {
      recordAudioRequest = this._requestRecordAudioPermission()
      // storageRequest = this._writeStroragePermission()
    } else {
      recordAudioRequest = new Promise(function (resolve, reject) {
        resolve(true)
      })
    }

    // if (Platform.OS == "android"){
    //   await this._writeStroragePermission()
    // }

    recordAudioRequest.then((hasPermission) => {
      if (!hasPermission) {
        this.setState({
          error: 'Record Audio Permission was denied',
        })
        return
      }
      const options = {
        // sampleRate: 16000,
        sampleRate: 44100,
        // channels: 1,
        channels: 2,
        bitsPerSample: 16,
        wavFile: 'mammuts.wav',
      }
      AudioRecord.init(options)

      // var count = 0
      AudioRecord.on('data', (data) => {
        const chunk = Buffer.from(data, 'base64')
        // console.log('chunk size', chunk.byteLength)
        // count++
        // console.log(count)
        //   console.log('chunk size', chunk);
        // do something with audio chunk
      })
      // })
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
      this.setState({error: 'Reload App'})
      return false
    }
  }

  // async _writeStroragePermission() {
  //   // if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Permissions for write access',
  //           message: 'Mammuts needs to write a file to your storage.',
  //           buttonPositive: 'ok',
  //         },
  //       )
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // console.log('You can use the storage')
  //         return true
  //       } else {
  //         console.log('Permission denied')
  //         return false
  //       }
  //     } catch (err) {
  //       console.warn(err)
  //       return false
  //     }
  //   // }
  // }
  //   checkPermission = async () => {
  //     const p = await Permissions.check('microphone');
  //     console.log('permission check', p);
  //     if (p === 'authorized') return;
  //     return this.requestPermission();
  //   };

  //   requestPermission = async () => {
  //     const p = await Permissions.request('microphone');
  //     console.log('permission request', p);
  //   };

  start = () => {
    // console.log('start record')
    this.setState({audioFile: '', recording: true, loaded: false})
    AudioRecord.start()
    // console.log(AudioRecord)
  }

  stop = async () => {
    if (!this.state.recording) return
    // console.log('stop record')
    let audioFile = await AudioRecord.stop()
    let newAudioFile
    if (Platform.OS === "android"){
      newAudioFile = "file://" + audioFile
    }
    // console.log('audioFile', newAudioFile)
    const data = new FormData()
    data.append('file', {
      uri: Platform.OS === "android" ? newAudioFile : audioFile,
      name: 'mammuts.wav',
      type: 'audio/wav',
      // type: 'multipart/form-data',
    })
    this.props.getAudioFormData(data)

    this.setState({audioFile, recording: false})
  }

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty')
      }

      this.sound = new Sound(this.state.audioFile, '', (error) => {
        if (error) {
          console.log('failed to load the file', error)
          this.setState({error: 'Reload App'})
          return reject(error)
        }
        const durationOf = this.sound.getDuration()
        this.setState({loaded: true, duration: durationOf ? durationOf : 0})
        // console.log(this.sound.getDuration(),'duration')
        return resolve()
      })
    })
  }

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load()
      } catch (error) {
        this.setState({error: 'Reload App'})
        console.log(error)
      }
    }

    this.setState({paused: false})
    Sound.setCategory('Playback')

    this.sound.play((success) => {
      if (success) {
        this.setState({error: ''})
        // console.log('successfully finished playing')
      } else {
        this.setState({error: 'Reload App'})
        console.log('playback failed due to audio decoding errors')
      }
      this.setState({paused: true})
      // this.sound.release();
    })
  }

  pause = () => {
    this.sound.pause()
    this.setState({paused: true})
  }

  getCurrentTime = () => {
    const {paused, duration} = this.state
    if (this.sound) {
      if (!paused) {
        this.sound.getCurrentTime((seconds) => {
          this.setState({time: seconds / duration, showing: seconds / 100})
        })
      }
    }
  }

  seek = (percentage) => {
    const {duration} = this.state
    if (this.sound) {
      this.sound.setCurrentTime(percentage * duration)
    }
  }

  render() {
    const {recording, paused, audioFile, time, showing, duration} = this.state
    const {audio} = this.props

    // console.log(audio.formdata ? audio.formdata : 'nai')

    return (
      <SafeAreaView>
        {this.getCurrentTime()}
        <View>
          <View style={styles.recordingAnime}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {recording ? (
                <TouchableOpacity onPress={this.stop} disabled={!recording}>
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="stop-circle"
                      color="rgb(0,184,249)"
                      style={{fontSize: 50}}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.start} disabled={!paused}>
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="record-circle"
                      color="rgb(0,184,249)"
                      style={{fontSize: 50}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {Platform.OS === 'android' && <View style={{paddingTop: 15}} />}

            {recording ? (
              <Button onPress={this.stop} title="Stop" disabled={!recording} />
            ) : (
              <Button onPress={this.start} title="Record" disabled={!paused} />
            )}
          </View>

          {JSON.stringify(audio.formdata) !== JSON.stringify({}) && (
            <View style={styles.recordingAnime}>
              <View style={styles.slider}>
                <Slider
                  step={0.0001}
                  disabled={!audioFile}
                  onValueChange={(percentage) => this.seek(percentage)}
                  value={time}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'white', paddingLeft: 15}}>
                  {showing.toFixed(2)}
                </Text>
                <Text style={{color: 'white', paddingRight: 10}}>
                  {(duration / 100).toFixed(2)}
                </Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {paused ? (
                  <TouchableOpacity disabled={!audioFile} onPress={this.play}>
                    <Icon
                      name="play-circle"
                      color="rgb(0,184,249)"
                      style={{fontSize: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity disabled={!audioFile} onPress={this.pause}>
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
          )}
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
  }
}

export default connect(mapStateToProps, {getAudioFormData})(RecordPlayer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  recordingAnime: {
    backgroundColor: '#424252',
    margin: 8,
    padding: 5,
    flex: 1,
    borderRadius: 10,
  },
  slider: {
    height: 10,
    margin: 10,
    marginBottom: 25,
  },
})

/* <View>
              {paused ? (
                <Button
                  onPress={this.play}
                  title="Play"
                  disabled={!audioFile}
                />
              ) : (
                <Button
                  onPress={this.pause}
                  title="Pause"
                  disabled={!audioFile}
                />
              )}
            </View> */

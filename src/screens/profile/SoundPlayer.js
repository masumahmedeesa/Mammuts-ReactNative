import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import Sound from 'react-native-sound'
import {connect} from 'react-redux'
// import {play} from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import {showLoading, hideLoading} from '../../store/actions/supportActions'

class SoundPlayer extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)
    Sound.setCategory('Playback')
    this.state = {
      error: '',
      realSound: {},
      playback: 'ready',
      time: 0,
      showing: 0,
      duration: 0,
      playbuttondisabled: true,
      loadButton: false,
      // loading: tr
    }
  }

  componentDidMount() {
    this._isMounted = true
    // console.log('SoundPlayer MOUNTED')
    // console.log(this.state.loadButton, 'mount')
    // this.props.showLoading()
    // const {soundInfo} = this.props
    // const callback = (error, sound) => {
    //   if (error) {
    //     this.setState({error: 'error'})
    //     console.log(error)
    //   }
    //   let du = sound.getDuration()
    //   // console.log(du)
    //   if (du > 0) {
    //     // console.log(du,'mount')
    //     this.setState({
    //       realSound: sound,
    //       duration: du ? du : 0,
    //       playbuttondisabled: false,
    //     })
    //   }
    //   soundInfo.onPrepared && soundInfo.onPrepared(sound)
    // }

    // if (soundInfo.isRequire) {
    //   const sound = new Sound(soundInfo.url, (error) => callback(error, sound))
    // } else {
    //   const sound = new Sound(soundInfo.url, soundInfo.basePath, (error) =>
    //     callback(error, sound),
    //   )
    // }
    // this.props.hideLoading()
  }

  soundLoad = () => {
    this.setState({loadButton: true})
    const {soundInfo} = this.props
    const callback = (error, sound) => {
      if (error) {
        this.setState({error: 'error'})
        console.log(error)
      }
      let du = sound.getDuration()
      // console.log(du)
      if (du > 0) {
        this.setState({
          realSound: sound,
          duration: du ? du : 0,
          playbuttondisabled: false,
          loadButton: false,
        })
      }
      soundInfo.onPrepared && soundInfo.onPrepared(sound)
    }

    this.props.showLoading()
    if (soundInfo.isRequire) {
      const sound = new Sound(soundInfo.url, (error) => callback(error, sound))
    } else {
      const sound = new Sound(soundInfo.url, soundInfo.basePath, (error) =>
        callback(error, sound),
      )
    }
    this.props.hideLoading()
  }

  componentWillUnmount() {
    this._isMounted = false
    this.setState = (state, callback) => {
      return
    }
    // console.log('SoundPlayer UN-MOUNTED')
  }

  getCurrentTime = () => {
    const {realSound, playback, duration} = this.state
    if (playback === 'playing') {
      realSound.getCurrentTime((seconds) => {
        this.setState({time: seconds / duration, showing: seconds / 100})
      })
    }
  }
  pauseSound = () => {
    const {realSound} = this.state
    realSound.pause()
    this.setState({playback: 'paused'})
  }
  playSound = () => {
    const {realSound} = this.state
    this.setState({playback: 'playing'})
    realSound.play(() => {
      this.setState({playback: 'ready'})
      // realSound.release()
    })
  }
  _seek = (percentage) => {
    const {duration, realSound} = this.state
    realSound.setCurrentTime(percentage * duration)
  }
  loadKorbe = () => {
    return (
      <View style={{paddingTop: 5}}>
        <ActivityIndicator
          size="large"
          color="cyan"
          animating={this.state.playbuttondisabled}
        />
      </View>
    )
  }

  render() {
    const {
      playback,
      time,
      duration,
      showing,
      playbuttondisabled,
      loadButton,
    } = this.state
    return (
      <View>
        {this.getCurrentTime()}
        {/* <View>
          <View>
            <Slider
              step={0.0001}
              onValueChange={(percentage) => this._seek(percentage)}
              value={time}
            />
            <Text>{(duration / 100).toFixed(2)}</Text>
            <Text>{showing.toFixed(2)}</Text>
          </View>
        </View> */}
        <View style={styles.recordingAnime}>
          {loadButton && this.loadKorbe()}
          <View style={styles.slider}>
            <Slider
              disabled={playbuttondisabled}
              step={0.0001}
              onValueChange={(percentage) => this._seek(percentage)}
              value={time}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'white', paddingLeft: 15}}>
              {showing.toFixed(2)}
            </Text>
            <Text style={{color: 'white', paddingRight: 10}}>
              {(duration / 100).toFixed(2)}
            </Text>
          </View>

          {playbuttondisabled ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.soundLoad()}>
                <Icon
                  name="play-circle"
                  color="rgb(0,184,249)"
                  style={{fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {(playback === 'ready' || playback === 'paused') && (
                <TouchableOpacity
                  disabled={playbuttondisabled}
                  onPress={() => this.playSound()}>
                  <Icon
                    name="play-circle"
                    color="rgb(0,184,249)"
                    style={{fontSize: 40}}
                  />
                </TouchableOpacity>
              )}
              {playback === 'playing' && (
                <TouchableOpacity onPress={() => this.pauseSound()}>
                  <Icon
                    name="pause-circle"
                    color="rgb(0,184,249)"
                    style={{fontSize: 40}}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={{paddingBottom: 5}} />
        </View>
      </View>
    )
  }
}

export default connect(null, {showLoading, hideLoading})(SoundPlayer)

const styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
    marginBottom: 25,
  },
  recordingAnime: {
    backgroundColor: '#424252',
    // margin: 3,
    // padding: 3,
    flex: 1,
    borderRadius: 10,
  },
})
// const callback = (error, sound) => {
//   if (error) {
//     // Alert.alert('error', error.message)
//     // setTestState(testInfo, component, 'fail')
//     this.setState({error: 'error'})
//     console.log(error)
//     // return
//   }
//   this.setState({playing: true, realSound: sound})
//   //   setTestState(testInfo, component, 'playing')
//   // Run optional pre-play callback
//   info.onPrepared && info.onPrepared(sound)
//   //   sound.getCurrentTime((seconds)=>console.log(seconds))
//   //   console.log(sound)
//   sound.play(() => {
//     // Success counts as getting to the end
//     // setTestState(testInfo, component, 'win')
//     this.setState({playing: false})
//     console.log('finish')
//     // Release when it's done so we're not using up resources
//     sound.release()
//     // sound.play()
//   })
// }

// If the audio is a 'require' then the second parameter must be the callback.
// if (info.isRequire) {
// let sound
// if (!playing) sound = new Sound(info.url, (error) => callback(error, sound))
// console.log(playing, 'second')
// if (playing) {
//     // console.log(sound)
//     sound = realSound
//     sound.pause()
// }
// }
// else {
//   const sound = new Sound(testInfo.url, testInfo.basePath, (error) =>
//     callback(error, sound),
//   )
// }

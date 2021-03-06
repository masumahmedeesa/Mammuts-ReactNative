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
} from 'react-native'
import SoundPlayer from '../../profile/SoundPlayer'
import {connect} from 'react-redux'

const audioTests = [
  {
    title: 'mp3 via require()',
    isRequire: true,
    url: require('./fff.aac'),
  },
  {
    title: 'aac via require()',
    isRequire: true,
    url: require('../../profile/test2.wav'),
  },
]

class RecordPlayer extends React.Component {
  render() {
    const {audio} = this.props
    // console.log(audio.formdata)
    if (audio.formdata.length > 0) {
      return (
        <View>
          {audio.formdata.map((single, index) => {
            let gg = Date.now()
            console.log(index, 'gggg')
            return (
              <View key={gg + index}>
                <View style={{margin: 10}}>
                  <SoundPlayer soundInfo={audioTests[0]} />
                </View>
              </View>
            )
          })}
        </View>
      )
    } else {
      return <Text>NADA</Text>
    }
  }
}
function mapStateToProps(state) {
  return {
    // auth: state.auth,
    audio: state.audio,
  }
}
export default connect(mapStateToProps, null)(RecordPlayer)
// import Axios from 'axios'
// import Slider from '@react-native-community/slider'
// import Icon from 'react-native-vector-icons/Feather'
// import {
//   Player,
//   Recorder,
//   MediaStates,
// } from '@react-native-community/audio-toolkit'
// import {useNavigation} from '@react-navigation/native'
// import {URLS} from '../../../config/urls'
// import styles from './styles'

// const filename = 'mammuts.aac'

// class RecordPlayer extends Component {
//   player: Player | null
//   recorder: Recorder | null
//   lastSeek: number
//   _progressInterval: IntervalID

//   constructor(props: Props) {
//     super(props)

//     this.state = {
//       playPauseButton: 'Preparing...',
//       recordButton: 'Preparing...',

//       stopButtonDisabled: true,
//       playButtonDisabled: true,
//       recordButtonDisabled: true,

//       loopButtonStatus: false,
//       progress: 0,
//       duration: 0,
//       currentTime: 0,

//       error: null,

//       isPressed: false,
//       animated: new Animated.Value(0),
//       opacityA: new Animated.Value(1),

//       // recordings: []
//     }
//   }

//   componentDidMount() {
//     this.player = null
//     this.recorder = null
//     this.lastSeek = 0

//     this._reloadPlayer()
//     this._reloadRecorder()

//     this._progressInterval = setInterval(() => {
//       if (this.player && this._shouldUpdateProgressBar()) {
//         let currentProgress =
//           Math.max(0, this.player.currentTime) / this.player.duration
//         // console.log('duration', this.player.currentTime)
//         if (isNaN(currentProgress)) {
//           currentProgress = 0
//         }
//         this.setState({
//           progress: currentProgress,
//           duration: this.player.duration / 1000 / 60,
//           currentTime: this.player.currentTime / 1000 / 60,
//         })
//       }
//     }, 100)
//   }

//   componentWillUnmount() {
//     clearInterval(this._progressInterval)
//   }

//   _shouldUpdateProgressBar() {
//     // Debounce progress bar update by 200 ms
//     return Date.now() - this.lastSeek > 200
//   }

//   _updateState(err) {
//     this.setState({
//       playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
//       recordButton:
//         this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',

//       stopButtonDisabled: !this.player || !this.player.canStop,
//       playButtonDisabled: !this.player || !this.player.canPlay,
//       playButtonDisabled:
//         !this.player || !this.player.canPlay || this.recorder.isRecording,
//       recordButtonDisabled:
//         !this.recorder || (this.player && !this.player.isStopped),
//     })
//   }

//   _playPause() {
//     this.player.playPause((err, paused) => {
//       if (err) {
//         this.setState({
//           error: err.message,
//         })
//       }
//       this._updateState()
//     })
//   }

//   _stop() {
//     this.player.stop(() => {
//       this._updateState()
//     })
//   }

//   _seek(percentage) {
//     if (!this.player) {
//       return
//     }

//     this.lastSeek = Date.now()

//     let position = percentage * this.player.duration
//     // console.log("position")
//     this.player.seek(position, () => {
//       this._updateState()
//     })
//   }

//   _reloadPlayer() {
//     if (this.player) {
//       this.player.destroy()
//     }

//     this.player = new Player(filename, {
//       autoDestroy: false,
//     }).prepare((err) => {
//       if (err) {
//         console.log('error at _reloadPlayer():')
//         console.log(err)
//       } else {
//         this.player.looping = this.state.loopButtonStatus
//       }

//       this._updateState()
//     })

//     this._updateState()

//     this.player.on('ended', () => {
//       this._updateState()
//     })
//     this.player.on('pause', () => {
//       this._updateState()
//     })
//   }

//   _reloadRecorder() {
//     if (this.recorder) {
//       this.recorder.destroy()
//     }

//     this.recorder = new Recorder(filename, {
//       bitrate: 256000,
//       channels: 2,
//       sampleRate: 44100,
//       quality: 'max',
//     })

//     this._updateState()
//   }

//   _toggleLooping(value) {
//     this.setState({
//       loopButtonStatus: value,
//     })
//     if (this.player) {
//       this.player.looping = value
//     }
//   }

//   _runAnimation = () => {
//     const {animated, opacityA} = this.state
//     Animated.loop(
//       Animated.parallel([
//         Animated.timing(animated, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: false,
//         }),
//         Animated.timing(opacityA, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: false,
//         }),
//       ]),
//     ).start()
//   }
//   _stopAnimation = () => {
//     Animated.loop(
//       Animated.parallel([Animated.timing(animated), Animated.timing(opacityA)]),
//     ).stop()
//   }

//   _micButton() {
//     const {isPressed, animated, opacityA} = this.state
//     if (isPressed) {
//       this._runAnimation()
//       return (
//         <Animated.View
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: 50,
//             backgroundColor: 'rgb(0,184,249)',
//             opacity: opacityA,
//             transform: [
//               {
//                 scale: animated,
//               },
//             ],
//           }}>
//           <View style={{alignItems: 'center', marginTop: 30}}>
//             <Text style={{fontWeight: '600'}}>Recording</Text>
//           </View>
//         </Animated.View>
//       )
//     } else {
//       //some function
//       return (
//         <View
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: 50,
//             backgroundColor: 'rgb(0,184,249)',
//           }}>
//           <View style={{alignItems: 'center', marginTop: 13}}>
//             <Icon name="mic" style={{fontSize: 50}} />
//           </View>
//         </View>
//       )
//     }
//   }

//   render() {
//     const {progress, duration, currentTime} = this.state
//     return (
//       <View>
//         <View style={styles.recordingAnime}>
//           <View style={styles.slider}>
//             <Slider
//               step={0.0001}
//               disabled={this.state.playButtonDisabled}
//               onValueChange={(percentage) => this._seek(percentage)}
//               value={this.state.progress}
//             />
//           </View>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <Text style={{color: 'white', paddingLeft: 15}}>
//               {currentTime.toFixed(2)}
//             </Text>
//             <Text style={{color: 'white', paddingRight: 10}}>
//               {duration.toFixed(2)}
//             </Text>
//           </View>

//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             {this.state.playPauseButton === 'Play' ? (
//               <TouchableOpacity
//                 disabled={this.state.playButtonDisabled}
//                 onPress={() => this._playPause()}>
//                 <Icon
//                   name="play-circle"
//                   color="rgb(0,184,249)"
//                   style={{fontSize: 50}}
//                 />
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 disabled={this.state.playButtonDisabled}
//                 onPress={() => this._playPause()}>
//                 <Icon
//                   name="pause-circle"
//                   color="rgb(0,184,249)"
//                   style={{fontSize: 50}}
//                 />
//               </TouchableOpacity>
//             )}
//           </View>
//           <View style={{paddingBottom: 8}} />
//           <View style={styles.settingsContainer}>
//             <Text style={{color: '#EFF', paddingRight: 5}}>Ciclo continuo</Text>
//             <Switch
//               onValueChange={(value) => this._toggleLooping(value)}
//               value={this.state.loopButtonStatus}
//             />
//           </View>
//           <View style={{paddingBottom: 8}} />
//         </View>
//       </View>
//     )
//   }
// }

// export default RecordPlayer

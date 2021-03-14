import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import {Audio} from 'expo-av'

export default class ExpoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      realSound: null,
      soundObj: null,
      isLoading: false,
      isLoaded: false,
      playbackObject: null,
      // isBuffering: false,
      durationMillis: 0,
      positionMillis: 0,
      seekValue: 0,
    }
  }

  componentDidMount() {
    // const {realSound} = this.state
    // if (realSound !== null) {
    //   realSound.unloadAsync()
    // }
  }

  componentWillUnmount() {
    console.log('unmount')
    const {realSound} = this.state
    this.setState = (state, callback) => {
      return
    }
    // if (realSound !== null) {
    //   realSound.unloadAsync()
    //   this.setState({
    //     realSound: null,
    //     soundObj: null,
    //     isLoading: false,
    //     isLoaded: false,
    //     playbackObject: null,
    //     // isBuffering: false,
    //     durationMillis: 0,
    //     positionMillis: 0,
    //     seekValue: 0,
    //   })
    // }
    console.log(realSound,'shob gese')
  }

  loadWithEverything = async () => {
    const {realSound} = this.state
    if (realSound !== null) {
      await realSound.unloadAsync()
      this.setState({
        realSound: null,
        soundObj: null,
        isLoading: false,
        isLoaded: false,
        playbackObject: null,
        // isBuffering: false,
        durationMillis: 0,
        positionMillis: 0,
        seekValue: 0,
      })
      console.log(realSound, 'load everything')
    }
    this.loadSound()
    // try {
    //   await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: false,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //     playsInSilentModeIOS: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //     shouldDuckAndroid: true,
    //     staysActiveInBackground: true,
    //     playThroughEarpieceAndroid: true,
    //   })
    //   if (realSound !== null) {
    //     await realSound.unloadAsync()
    //     this.setState({
    //       realSound: null,
    //       soundObj: null,
    //       isLoading: false,
    //       isLoaded: false,
    //       playbackObject: null,
    //       // isBuffering: false,
    //       durationMillis: 0,
    //       positionMillis: 0,
    //       seekValue: 0,
    //     })
    //     console.log(realSound)
    //   }
    //   this.loadSound()
    // } catch (e) {
    //   console.log(e, 'load with everything')
    // }
  }

  loadSound = async () => {
    const {realSound} = this.state
    const {soundInfo} = this.props
    if (realSound === null) {
      console.log(soundInfo, 'uri')
      this.setState({isLoading: true})
      try {
        const playbackObject = new Audio.Sound()
        const source = {
          uri: soundInfo.url,
        }
        // const source = require('./test1.mp3')

        const status = {
          shouldPlay: true,
          isLooping: true,
        }

        playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        await playbackObject.loadAsync(source, status, true)
        this.setState({
          realSound: playbackObject,
          isLoaded: true,
          isLoading: false,
        })
      } catch (e) {
        this.setState({isLoading: false})
        console.log(e)
      }
    } 
  }

  onPlaybackStatusUpdate = (status) => {
    // console.log(status)
    // const {realSound} = this.state
    console.log(status.durationMillis, status.positionMillis)
    if (status.durationMillis == status.positionMillis) {
      // console.log('here', status)
      if (status.isLoaded) {
        this.pauseSound()
      }
    }

    this.setState({
      soundObj: status,
      // isBuffering: status.isBuffering,
      durationMillis: status.durationMillis,
      positionMillis: status.positionMillis,
      seekValue: status.positionMillis / status.durationMillis,
    })
  }

  playSound = async () => {
    const {realSound} = this.state
    if (realSound) {
      try {
        await realSound.playAsync()
      } catch (e) {
        console.log(e, 'playSound')
      }
    }
  }

  pauseSound = async () => {
    const {realSound} = this.state
    if (realSound) {
      try {
        await realSound.pauseAsync()
      } catch (e) {
        console.log(e, 'pauseSound')
      }
    }
  }

  loadKorbe = () => {
    return (
      <View style={{paddingTop: 5}}>
        <ActivityIndicator
          size="large"
          color="cyan"
          // animating={this.state.isLoading}
        />
      </View>
    )
  }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound')
  //         sound.unloadAsync()
  //       }
  //     : undefined
  // }, [sound])

  //   console.log(sound ? sound.getStatusForSound : 'nai')

  render() {
    const {
      isLoaded,
      durationMillis,
      positionMillis,
      soundObj,
      seekValue,
    } = this.state
    // console.log(soundObj ? soundObj.isBuffering + 'ggg': 'gg')
    return (
      <View style={styles.recordingAnime}>
        {/* {this.state.isLoading && this.loadKorbe()} */}
        {/* {soundObj && soundObj.isBuffering && this.loadKorbe()} */}
        {soundObj && !soundObj.isLoaded  && this.loadKorbe()}
        <View style={styles.slider}>
          <Slider
            disabled={!isLoaded}
            step={0.0001}
            // onValueChange={(percentage) => this._seek(percentage)}
            value={seekValue ? seekValue : 0}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'white', paddingLeft: 15}}>
            {positionMillis ? (positionMillis / 100000).toFixed(2) : '0:00'}
          </Text>
          <Text style={{color: 'white', paddingRight: 10}}>
            {durationMillis ? (durationMillis / 100000).toFixed(2) : '0:00'}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 8,
          }}>
          {!isLoaded ? (
            <TouchableOpacity onPress={() => this.loadSound()}>
              <Icon
                name="play-circle"
                color="rgb(0,184,249)"
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          ) : soundObj && soundObj.isPlaying ? (
            <TouchableOpacity onPress={() => this.pauseSound()}>
              <Icon
                name="pause-circle"
                color="rgb(0,184,249)"
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.playSound()}>
              <Icon
                name="play-circle"
                color="rgb(0,184,249)"
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

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

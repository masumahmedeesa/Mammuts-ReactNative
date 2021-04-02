import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native'
import {Player} from '@react-native-community/audio-toolkit'
// import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import {connect} from 'react-redux'

class ToolkitPlayer extends React.Component {
  player = null
  lastSeek = 0
  // _progressInterval = null
  constructor(props) {
    super(props)
    this.state = {
      realSound: null,
      isLoading: false,
      isLoaded: false,
      isPlaying: 'Preparing',

      progress: 0,
      duration: 0,
      currentTime: 0,
      error: '',
    }
  }

  componentDidMount() {
    this.player = null
    this.lastSeek = 0
    // this._progressInterval = IntervalID
    if (this.player) {
      console.log('destroy mount')
      this.player.destroy()
      // clearInterval(this._progressInterval)
    }
  }

  // componentDidUpdate() {
  //   const {isPlaying} = this.state
  //   if (isPlaying === 'Pause') {
  //     this.alwaysRunning()
  //   }
  // }

  loadPlayer = () => {
    // const {realSound} = this.state
    const {soundInfo} = this.props
    if (this.player) {
      console.log('destroy load')
      this.player.destroy()
      this.lastSeek = 0
      // clearInterval(this._progressInterval)
    }

    this.setState({isLoading: true})
    this.player = new Player(soundInfo.url, {autoDestroy: false})
    if (Platform.OS === 'android') {
      this.player.speed = 0.0
    }
    this.player.prepare((err) => {
      if (err) {
        this.setState({isLoading: false})
        console.log(err, 'load player')
        this.setState({error: err.message})
      } else if (this.player) {
        this.player.play((error) => {
          if (error) {
            this.setState({isLoading: false})
            console.log(error, 'playing')
            this.setState({error: error.message})
          } else {
            if (Platform.OS === 'android' && this.player) {
              this.player.speed = 1.0
            }
            // this._progressInterval = IntervalID
            this.setState({duration: this.player.duration})
            this.updateState()
            // this.alwaysRunning()
          }
          //   this.updateState()
        })
        // this.updateState()
      }
      this.setState({isLoading: false, isLoaded: true})
    })
    this.player.on('ended', () => {
      this.updateState()
    })
    this.player.on('pause', () => {
      this.updateState()
    })
  }

  updateState = () => {
    this.setState({
      isPlaying: this.player && this.player.isPlaying ? 'Pause' : 'Play',
    })
    // this.alwaysRunning()
  }

  playPause = () => {
    // const {realSound} = this.state
    if (this.player) {
      this.player.playPause((err, paused) => {
        if (err) {
          this.setState({error: err.message})
          console.log(err, 'playpause')
        }
        this.updateState()
        console.log(this.player, 'play')
        if (Platform.OS === 'android' && this.player) {
          this.player.speed = 1.0
        }
        this.setState({
          duration: this.player.duration,
        })
      })
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

  alwaysRunning = () => {
    // if (this.player) {
    //   if (this.player.isPlaying) {
        console.log('eihane play')
        // this._progressInterval = setInterval(() => {
        // if (this.player && this._shouldUpdateProgressBar()) {
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
        // }
        // }, 100)
      // }
    // }
  }

  _shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200
  }

  render() {
    const {duration, isLoaded, isPlaying, progress, currentTime} = this.state
    // console.log(isPlaying, 'render', progress, currentTime)
    // console.log('eihane')
    // console.log(this.player.currentTime, 'currentTime')
    console.log(isPlaying, currentTime, progress)

    return (
      <SafeAreaView>
        {this.state.isLoading && this.loadKorbe()}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'black', paddingLeft: 15}}>
            {currentTime.toFixed(2)}
          </Text>
          <Text style={{color: 'black', paddingRight: 10}}>
            {duration.toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 8,
          }}>
          {!isLoaded ? (
            <TouchableOpacity onPress={() => this.loadPlayer()}>
              <Icon
                name="play-circle"
                color="rgb(0,184,249)"
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          ) : isPlaying === 'Pause' ? (
            <TouchableOpacity onPress={() => this.playPause()}>
              <Icon
                name="pause-circle"
                color="rgb(0,184,249)"
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.playPause()}>
              <Icon
                name="play-circle"
                color="rgb(0,184,249)"
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* <View>{this.state.error && <Text>No internet</Text>}</View> */}
      </SafeAreaView>
    )
  }
}

export default connect()(ToolkitPlayer)

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

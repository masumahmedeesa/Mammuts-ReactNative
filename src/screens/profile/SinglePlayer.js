import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
} from 'react-native-track-player'
import Icon from 'react-native-vector-icons/Feather'
import styles from './styles'

// var TrackPlayer = require('react-native-track-player')

class SinglePlayerClass extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      soundInfo: ""
    }
  }
  componentDidMount() {
    const {track} = this.props
    // console.log(track, 'gggg')
    let player = track.title
    console.log(player)
    player = TrackPlayer
    
    // console.log(player.usePlaybackState)
    player.setupPlayer().then(async () => {
      // The player is ready to be used
      // let gg = await TrackPlayer.getQueue()
      // console.log('qq',gg)
      // await TrackPlayer.reset()
      // gg = await TrackPlayer.getQueue()
      // console.log('qq2',gg)
      player.add(track).then(() => {
        // console.log('Added')
        // console.log(track)
        this.setState({soundInfo: player})
      })
    })
  }

  togglePlayback = async () => {
    const {playbackState, progress} = this.props
    console.log(playbackState)
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }

  renderProgress = () => {
    const {progress} = this.props
    return (
      <View style={styles.progress}>
        <View style={{flex: progress.position, backgroundColor: 'red'}} />
        <View
          style={{
            flex: progress.duration - progress.position,
            backgroundColor: 'grey',
            // borderRadius: 10
          }}
        />
      </View>
    )
  }

  render() {
    const {playbackState, progress} = this.props
    const {soundInfo} = this.state
    return (
      <View>
        <TouchableOpacity onPress={this.togglePlayback}>
          {playbackState === soundInfo.STATE_PAUSED ? (
            <Icon
              name="pause-circle"
              color="rgb(0,184,249)"
              style={{fontSize: 20}}
            />
          ) : (
            <Icon
              name="play-circle"
              color="rgb(0,184,249)"
              style={{fontSize: 20}}
            />
          )}
        </TouchableOpacity>
        <Text>{playbackState}</Text>
        {progress && <Text>{progress.position}</Text>}
        {progress && <Text>{progress.duration}</Text>}
        {this.renderProgress()}
      </View>
    )
  }
}

const SinglePlayer = (props) => {
  const playbackState = usePlaybackState()
  const progress = useTrackPlayerProgress()
  return (
    <SinglePlayerClass
      {...props}
      playbackState={playbackState}
      progress={progress}
    />
  )
}

export default SinglePlayer

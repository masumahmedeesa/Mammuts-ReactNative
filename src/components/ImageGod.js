import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

export default class ImageGod extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoading: false,
    }
  }
  render() {
    const {propWidth, propHeight, borderRadius, imageUrl} = this.props
    return (
      <FastImage
        style={{
          width: propWidth,
          height: propHeight,
          borderRadius: borderRadius,
          flex: 0,
        }}
        source={{uri: imageUrl}}
        // resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => {
          this.setState({imageLoading: true})
        }}
        onLoadEnd={() => {
          this.setState({imageLoading: false})
        }}>
        <ActivityIndicator
          animating={this.state.imageLoading}
          size="large"
          color="rgb(0,184,249)"
          style={styles.imageLoader}
        />
      </FastImage>
    )
  }
}

const styles = StyleSheet.create({
  imageLoader: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
})

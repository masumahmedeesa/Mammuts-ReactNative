import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  LayoutAnimation,
  Image,
  ScrollView,
  Animated,
} from 'react-native'

export default class AudioAnimation extends Component {
  state = {
    isPressed: false,
    animated: new Animated.Value(0),
    opacityA: new Animated.Value(1),
  }
  constructor(props) {
    super(props)
    this._onPress = this._onPress.bind(this)
  }
  _runAnimation() {
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
  _stopAnimation() {
    Animated.loop(
      Animated.parallel([Animated.timing(animated), Animated.timing(opacityA)]),
    ).stop()
  }
  _onPress() {
    this.setState((state) => ({isPressed: !state.isPressed}))
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
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: 'rgb(0,184,249)',
          }}>
            <View style={{alignItems: 'center', marginTop: 25}}>
              <Text style={{fontWeight: '600'}}>Record</Text>
            </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPress}>
          {this._micButton()}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

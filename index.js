import 'react-native-gesture-handler'
import React from 'react'
import {AppRegistry} from 'react-native'
// import TrackPlayer from 'react-native-track-player'
import {Provider} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
// import jwtDecode from 'jwt-decode'

import App from './App'
import Support from './src/components/Support'
import store from './src/store'
import * as Types from './src/store/actions/types'
import SetAuthToken from './src/utils/setAuthToken'
import {name as appName} from './app.json'

let token = null

const getData = async () => {
  try {
    token = await AsyncStorage.getItem('authToken')
    if (token) {
      SetAuthToken(token)
      // const decode = jwtDecode(token)
      const decode = await AsyncStorage.getItem('authInfo')
      store.dispatch({
        type: Types.SET_USER,
        payload: {
          user: decode,
        },
      })
    }
  } catch (e) {
    console.log(error)
  }
}
getData()

const indexedApp = () => (
  <Provider store={store}>
    <App />
    <Support />
  </Provider>
)
AppRegistry.registerComponent(appName, () => indexedApp)
// TrackPlayer.registerPlaybackService(() => require('./service'))
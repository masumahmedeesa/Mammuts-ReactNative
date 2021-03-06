import Axios from 'axios' //asynchronous
// import jwtDecode from "jwt-decode"
import AsyncStorage from '@react-native-community/async-storage'

import * as Types from './types'
import {URLS} from '../../config/urls'
import SetAuthToken from '../../utils/setAuthToken'

//synchronous
//that's why thunk comes in which returns a extra argument named "dispatch"

const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value)
  } catch (e) {
    console.log(e)
  }
}
const removeData = async (name) => {
  try {
    await AsyncStorage.removeItem(name)
  } catch (e) {
    console.log(e)
  }
}

export const loginAction = (user) => (dispatch) => {
  Axios.post(URLS.LOGIN, user)
    .then((response) => {
      let {token_type, access_token, user, message} = response.data
      if (!message) {
        let actual_token = token_type + ' ' + access_token
        storeData('authToken', actual_token)
        storeData('authInfo', JSON.stringify(user))
        SetAuthToken(actual_token)
        dispatch({
          type: Types.SET_USER,
          payload: {
            user: JSON.stringify(user),
          },
        })
      } else {
        dispatch({
          type: Types.USER_ERROR,
          payload: {
            error: message,
          },
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error in loginAction')
      let finalError = error.response.request._response
      let gg = JSON.parse(finalError)
      dispatch({
        type: Types.USER_ERROR,
        payload: {
          error: gg[0],
        },
      })
      // dispatch({
      // 	type: Types.USER_ERROR,
      // 	payload: {
      // 		error: error.response.data.message,
      // 	},
      // })
    })
}

export const registerAction = (user) => (dispatch) => {
  Axios.post(URLS.REGISTER, user)
    .then((response) => {
      //   console.log(response.data, 'register')
      let {token_type, access_token, user} = response.data
      let actual_token = token_type + ' ' + access_token
      storeData('authToken', actual_token)
      storeData('authInfo', JSON.stringify(user))
      SetAuthToken(actual_token)
      dispatch({
        type: Types.SET_USER,
        payload: {
          user: JSON.stringify(user),
        },
      })
    })
    .catch((error) => {
      let finalError = error.response.request._response
      let gg = JSON.parse(finalError)
      dispatch({
        type: Types.USER_ERROR,
        payload: {
          error: gg[0],
        },
      })
    })
}

export const logoutAction = () => {
  removeData('authToken')
  removeData('authInfo')
  // history.push("/")
  return {
    type: Types.SET_USER,
    payload: {
      user: {},
    },
  }
}

export const updateAction = (user) => (dispatch) => {
  Axios.post(URLS.UPDATE_PROFILE, user)
    .then((response) => {
      storeData('authInfo', JSON.stringify(response.data))
      dispatch({
        type: Types.UPDATE_USER,
        payload: {
          updatedUser: JSON.stringify(response.data),
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in update auth action')
      // dispatch({
      // 	type: Types.USER_ERROR,
      // 	payload: {
      // 		error: error.response.data.message,
      // 	},
      // })
    })
}
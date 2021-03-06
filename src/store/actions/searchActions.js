import Axios from 'axios'
import * as Types from './types'
import {URLS} from '../../config/urls'

export const getAllUsers = () => (dispatch) => {
  Axios.get(URLS.ALLUSERS)
    .then((response) => {
      dispatch({
        type: Types.GET_ALL_USERS,
        payload: {
          allusers: response.data,
        },
      })
    })
    .catch((error) => {
      console.log(error.response, 'error in RICORDO_ACTIONS')
    //   let gg = JSON.parse(finalError)
    //   dispatch({
    //     type: Types.SEARCH_ERROR,
    //     payload: {
    //       error: error.response,
    //     },
    //   })
    })
}

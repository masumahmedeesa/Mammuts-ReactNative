import Axios from 'axios'
import * as Types from './types'
import {URLS} from '../../config/urls'

export const ricodioActionsIndividual = (userId, page, parsedUser) => (
  dispatch,
) => {
  Axios.get(URLS.STORIES_OTHER + `${userId}?page=${page}`)
    .then((response) => {
      dispatch({
        type: Types.OTHER_LOAD_POSTS,
        payload: {
          posts: response.data,
          parsedUser: parsedUser,
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in ricodioActionsIndividual')
    })
}

export const refreshIndividual = () => (dispatch) => {
  dispatch({
    type: Types.OTHER_REFRESH,
  })
}

export const legamiCollectionIndividual = (id) => (dispatch) => {
  Axios.get(URLS.LEGAMI_PERSONAL + id)
    .then((response) => {
      dispatch({
        type: Types.OTHER_LOAD_LEGAMI,
        payload: {
          legami: response.data,
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in legamiCollectionIndividual')
    })
}

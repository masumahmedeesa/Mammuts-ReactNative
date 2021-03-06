import Axios from 'axios'
import * as Types from './types'
import {URLS} from '../../config/urls'

export const ricodioActions = (userId, page) => (dispatch) => {
  Axios.get(URLS.STORIES + `${userId}?page=${page}`)
    .then((response) => {
      // console.log(response.data,'actions')
      dispatch({
        type: Types.GET_POST,
        payload: {
          posts: response.data,
          // total: response.data.total,
        },
      })
    })
    .catch((error) => {
      // let finalError = error.response.request._response
      console.log(error, 'error in RICORDO_ACTIONS')
      // let gg = JSON.parse(finalError)
      // dispatch({
      //   type: Types.POST_ERROR,
      //   payload: {
      //     error: gg[0],
      //   },
      // })
    })
}

export const legamiCollection = () => (dispatch) => {
  Axios.get(URLS.LEGAMI_PERSONAL)
    .then((response) => {
      dispatch({
        type: Types.LEGAMI_PERSONAL,
        payload: {
          legami: response.data,
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in legamiCollection')
      // let finalError = error.response.request._response
      // let gg = JSON.parse(finalError)
      // dispatch({
      //   type: Types.POST_ERROR,
      //   payload: {
      //     error: gg[0],
      //   },
      // })
    })
}

export const legamiAddorRemove = (data) => (dispatch) => {
  Axios.post(URLS.LEGAMI_ADD_REMOVE, data)
    .then((res) => {
      if (res.data.message) {
        dispatch({
          type: Types.LEGAMI_REMOVE,
          payload: {
            removed: res.data,
          },
        })
      }
    })
    .catch((error) => console.log(error, 'legamiAddorRemove'))
}

export const postCreate = (data) => (dispatch) => {
  dispatch({
    type: Types.UPLOAD_POST,
    payload: {
      createdData: data,
    },
  })
}

export const postDelete = (id) => (dispatch) => {
  Axios.delete(URLS.RICORDI + '/' + id)
    .then((res) => {
      dispatch({
        type: Types.REMOVE_POST,
        payload: {
          removedId: res.data.id,
        },
      })
    })
    .catch((error) => console.log(error, 'postDelete actions'))
}

export const postUpdate = (data, commentLength, commentUsers, comments) => (
  dispatch,
) => {
  data['commentLength'] = commentLength
  data['commentUsers'] = commentUsers
  data['comments'] = comments
  dispatch({
    type: Types.EDIT_POST,
    payload: {
      editedPost: data,
    },
  })
}

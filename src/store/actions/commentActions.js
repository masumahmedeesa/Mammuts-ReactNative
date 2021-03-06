import Axios from 'axios'
import * as Types from './types'
import {URLS} from '../../config/urls'

export const loadComments = (id) => (dispatch) => {
  Axios.get(URLS.LOAD_COMMENTS + id)
    .then((res) => {
      dispatch({
        type: Types.LOAD_COMMENTS,
        payload: {
          comments: res.data,
        },
      })
      // this.setState({allComments: res.data})
    })
    .catch((error) => {
      console.log(error, 'loadComments')
    })
}

export const uploadComment = (data) => (dispatch) => {
  dispatch({
    type: Types.UPLOAD_COMMENT,
    payload: {
      newComment: data,
    },
  })
}

export const removeComment = (data) => (dispatch) => {
  Axios.post(URLS.DELETE_COMMENT, data)
    .then((res) => {
      dispatch({
        type: Types.DELETE_COMMENT,
        payload: {
          removedId: res.data.id,
        },
      })
    })
    .catch((error) => console.log(error, 'removeComment'))
}

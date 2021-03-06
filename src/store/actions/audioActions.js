// import Axios from 'axios'
import * as Types from './types'
// import {URLS} from '../../config/urls'

export const getAudioFormData = (data) => (dispatch) => {
  dispatch({
    type: Types.AUDIO_FORM_DATA,
    payload: {
      formdata: data,
    },
  })
}

export const removeAudio = () => (dispatch) => {
  dispatch({
    type: Types.REMOVE_AUDIO,
  })
}

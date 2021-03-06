import * as Types from '../actions/types'

const initialState = {
  formdata: {},
  // formdata: [],
}

function audioReducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUDIO_FORM_DATA: {
      return {
        // formdata: [...state.formdata, action.payload.formdata]
        formdata: action.payload.formdata,
      }
    }
    case Types.REMOVE_AUDIO:
      return {
        formdata: {},
      }
    default:
      return state
  }
}

export default audioReducer

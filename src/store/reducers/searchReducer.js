import * as Types from '../actions/types'

const initialState = {
  allusers: [],
  error: {},
}

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_USERS: {
      return {
        ...state,
        allusers: action.payload.allusers,
        error: {},
      }
    }
    case Types.SEARCH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }
    case Types.REFRESH_USERS: {
      return {
        allusers: [],
        error: {},
      }
    }
    default:
      return state
  }
}

export default searchReducer

import * as Types from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
}
function authReducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_USER:
      return {
        user: action.payload.user,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        error: {},
      }
    case Types.UPDATE_USER:
      return {
        ...state,
        user: action.payload.updatedUser,
      }
    case Types.USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default authReducer

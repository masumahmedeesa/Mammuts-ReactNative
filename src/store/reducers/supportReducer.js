import * as Types from '../actions/types'

const initialState = {
  loading: false,
}

const showLoading = (state, action) =>
  Object.assign({}, state, {
    loading: true,
  })
const hideLoading = (state, action) =>
  Object.assign({}, state, {
    loading: false,
  })

const supportReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case Types.SHOW_LOADING:
      return showLoading(state, action)
    case Types.HIDE_LOADING:
      return hideLoading(state, action)
    default:
      return state
  }
}

export default supportReducer

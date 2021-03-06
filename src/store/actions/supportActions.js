import * as Types from './types'

export const showLoading = () => (dispatch) => {
  dispatch({type: Types.SHOW_LOADING})
}
export const hideLoading = () => (dispatch) => {
  dispatch({type: Types.HIDE_LOADING})
}
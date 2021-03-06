import { combineReducers } from "redux"
import authReducer from "./authReducer"
import supportReducer from './supportReducer'
import postReducer from './postReducers'
import searchReducer from './searchReducer'
import audioReducer from './audioReducer'
import commentReducer from './commentReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	support: supportReducer,
	posts: postReducer,
	search: searchReducer,
	audio: audioReducer,
	comments: commentReducer
})

export default rootReducer

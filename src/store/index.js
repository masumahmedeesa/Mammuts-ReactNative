import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers/rootReducer"
import thunk from "redux-thunk"

const middleware = [thunk]

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

// const store = createStore(
//    rootReducer,
//    compose(
//       applyMiddleware(...middleware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//          window.__REDUX_DEVTOOLS_EXTENSION__()
//    )
// )

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store

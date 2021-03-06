import * as Types from '../actions/types'

const initialState = {
  posts: [],
  // total: 0,
  legami: [],
  isSuccessful: false,
  // error: {},
}

function postReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_POST: {
      let finalData = [...state.posts, ...action.payload.posts]
      // console.log(finalData.length,'GET_POST')
      let lastData = []
      let arr = []
      for (let i = 0; i < finalData.length; i++) {
        if (!arr.includes(finalData[i].id)) {
          arr.push(finalData[i].id)
          lastData.push(finalData[i])
        }
      }
      // console.log(lastData.length,'GET_POST POST')
      return {
        ...state,
        posts: lastData,
      }
    }

    case Types.UPLOAD_POST: {
      let data = [...state.posts]
      // console.log(action.payload.createdData.id)
      // console.log(data.length,'pre')
      // const lastData = [action.payload.createdData, ...state.posts]
      // const lastData = [action.payload.createdData].concat(data)
      data.unshift(action.payload.createdData)
      // console.log(data.length,'lastData')
      // console.log(lastData)
      return {
        ...state,
        posts: data,
      }
    }

    case Types.EDIT_POST: {
      let data = [...state.posts]
      // works fine
      // console.log(data.length,'pre')
      // console.log(action.payload.editedPost)
      data = data.map((single) => {
        if (single.id == action.payload.editedPost.id) {
          return action.payload.editedPost
        }
        return single
      })
      // console.log(data.length,'post')
      return {
        ...state,
        posts: data,
      }
    }
    case Types.REMOVE_POST: {
      let data = [...state.posts]
      // console.log(data.length,'pre')
      let eId = action.payload.removedId
      data = data.filter((single) => single.id != eId)
      // console.log(data.length,'post')
      return {
        ...state,
        posts: data,
      }
    }
    // case Types.POST_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload.error,
    //   }
    case Types.LEGAMI_PERSONAL:
      return {
        ...state,
        legami: action.payload.legami,
        // error: {},
      }
    // case Types.LEGAMI_ADD: {
    //   let data = [...state.legami]
    //   data.unshift(action.payload.added)
    //   return {
    //     ...state,
    //     legami: data
    //   }
    // }
    case Types.LEGAMI_REMOVE: {
      let data = [...state.legami]
      data = data.filter(
        (single) => single.cf_key !== action.payload.removed.cf_key,
      )
      return {
        ...state,
        legami: data,
      }
    }
    default:
      return state
  }
}

export default postReducer

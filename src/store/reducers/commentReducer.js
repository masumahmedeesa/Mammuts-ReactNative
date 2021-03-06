import * as Types from '../actions/types'

const initialState = {
  comments: [],
}

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOAD_COMMENTS: {
      return {
        comments: action.payload.comments,
      }
    }
    case Types.UPLOAD_COMMENT: {
      let data = [...state.comments]
      let newDD = action.payload.newComment
      let ss = newDD.data_inserimento.split('T')
      let ff = ss[0]+ ' ' + ss[1].split('.')[0]
      newDD.data_inserimento = ff
      data.unshift(newDD)
    //   let finalData = data
    //   // console.log(finalData,'postreducer')
    //   let lastData = []
    //   let arr = []
    //   for (let i = 0; i < finalData.length; i++) {
    //     if (!arr.includes(finalData[i].id)) {
    //       arr.push(finalData[i].id)
    //       lastData.push(finalData[i])
    //     }
    //   }
      return {
        comments: data,
      }
    }
    case Types.DELETE_COMMENT:{
        let data = [...state.comments]
        data = data.filter((single)=>single.id !== action.payload.removedId)
        return {
            comments: data
        }
    }

    default:
      return state
  }
}

export default commentReducer

import * as Types from '../actions/types'

const initialState = {
  posts: [],
  // total: 0,
  legami: [],
  isSuccessful: false,
  renderingImages: [],
  structuredData: [],
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

      let particularImages = []
      let structuredData = []
      if (lastData.length > 0) {
        let lenPosts = lastData.length

        for (let j = 0; j < lenPosts; j++) {
          // const user = auth.user
          const parsedUser = action.payload.parsedUser
          let obj = {}
          obj['title'] = 'wav remote download'
          let genjam = lastData[j].audio ? lastData[j].audio : 'nope'
          obj['url'] = 'https://mammuts.it/vocal/' + genjam

          let picturesJJ = []
          if (lastData[j].immagine !== null) {
            for (let i = 0; i < lastData[j].immagine.length; i++) {
              picturesJJ.push(
                'https://mammuts.it' +
                  lastData[j].immagine[i].substring(
                    2,
                    lastData[j].immagine[i].length,
                  ),
              )
            }
          }
          let specialCase = ''
          if (lastData[j].ownerInfo) {
            specialCase = lastData[j].ownerInfo
          }
          let firstCase = ''
          if (parsedUser.id != lastData[j].id_utente) {
            firstCase = []
            firstCase.push(parsedUser.id)
          }

          let finalData = {}
          finalData['id'] = lastData[j].id
          finalData['soundInfo'] = obj
          finalData['soundIsExist'] = lastData[j].audio
          finalData['published'] = lastData[j].data_inserimento
          finalData['name'] = lastData[j].luogo
          finalData['description'] = lastData[j].testo
          finalData['ownerId'] = lastData[j].id_utente
          finalData['privato'] = lastData[j].privato
          finalData['tags'] = firstCase ? firstCase : lastData[j].tags
          finalData['bondnames'] = firstCase
            ? 'Logged user'
            : lastData[j].bondnames
          finalData['ownerInfo'] = specialCase
          finalData['pictures'] = picturesJJ
          finalData['commentLength'] = lastData[j].commentLength
          finalData['commentUsers'] = lastData[j].commentUsers
          finalData['comments'] = lastData[j].comments

          let structedObject = {}
          structedObject['data'] = finalData
          structedObject['id'] = lastData[j].id
          // structedObject['images'] = pictures
          structuredData.push(structedObject)
          const {pictures} = finalData

          for (let k = 0; k < pictures.length; k++) {
            let simpleObj = {}
            simpleObj['id'] = finalData.id
            simpleObj['data'] = finalData
            simpleObj['singlePicture'] = pictures[k]
            particularImages.push(simpleObj)
          }
        }
      }
      // console.log(lastData.length,'GET_POST POST')
      return {
        ...state,
        posts: lastData,
        structuredData: structuredData,
        renderingImages: particularImages,
      }
    }

    case Types.UPLOAD_POST: {
      let data = [...state.posts]
      let structuredData = [...state.structuredData]
      let renderingImages = [...state.renderingImages]

      const parsedUser = action.payload.parsedUserUpload
      let createdData = action.payload.createdData
      // const lastData = [action.payload.createdData, ...state.posts]
      // const lastData = [action.payload.createdData].concat(data)

      let obj = {}
      obj['title'] = 'wav remote download'
      let genjam = createdData.audio ? createdData.audio : 'nope'
      obj['url'] = 'https://mammuts.it/vocal/' + genjam

      let picturesJJ = []
      if (createdData.immagine !== null) {
        for (let i = 0; i < createdData.immagine.length; i++) {
          picturesJJ.push(
            'https://mammuts.it' +
              createdData.immagine[i].substring(
                2,
                createdData.immagine[i].length,
              ),
          )
        }
      }
      let specialCase = ''
      if (createdData.ownerInfo) {
        specialCase = createdData.ownerInfo
      }
      let firstCase = ''
      if (parsedUser.id != createdData.id_utente) {
        firstCase = []
        firstCase.push(parsedUser.id)
      }

      let finalData = {}
      finalData['id'] = createdData.id
      finalData['soundInfo'] = obj
      finalData['soundIsExist'] = createdData.audio
      finalData['published'] = createdData.data_inserimento
      finalData['name'] = createdData.luogo
      finalData['description'] = createdData.testo
      finalData['ownerId'] = createdData.id_utente
      finalData['privato'] = createdData.privato
      finalData['tags'] = firstCase ? firstCase : createdData.tags
      finalData['bondnames'] = firstCase ? 'Logged user' : createdData.bondnames
      finalData['ownerInfo'] = specialCase
      finalData['pictures'] = picturesJJ
      finalData['commentLength'] = createdData.commentLength
      finalData['commentUsers'] = createdData.commentUsers
      finalData['comments'] = createdData.comments

      let structedObject = {}
      structedObject['data'] = finalData
      structedObject['id'] = createdData.id

      const {pictures} = finalData
      let simpleObj = {}
      for (let k = 0; k < pictures.length; k++) {
        simpleObj['id'] = finalData.id
        simpleObj['data'] = finalData
        simpleObj['singlePicture'] = pictures[k]
      }

      data.unshift(createdData)
      structuredData.unshift(structedObject)
      renderingImages.unshift(simpleObj)

      return {
        ...state,
        posts: data,
        structuredData: structuredData,
        renderingImages: renderingImages,
      }
    }

    case Types.EDIT_POST: {
      let data = [...state.posts]
      let structuredData = [...state.structuredData]
      let renderingImages = [...state.renderingImages]

      const parsedUser = action.payload.parsedUserUpdate
      let editedPost = action.payload.editedPost
      // works fine

      let obj = {}
      obj['title'] = 'wav remote download'
      let genjam = editedPost.audio ? editedPost.audio : 'nope'
      obj['url'] = 'https://mammuts.it/vocal/' + genjam

      let picturesJJ = []
      if (editedPost.immagine !== null) {
        for (let i = 0; i < editedPost.immagine.length; i++) {
          picturesJJ.push(
            'https://mammuts.it' +
              editedPost.immagine[i].substring(
                2,
                editedPost.immagine[i].length,
              ),
          )
        }
      }
      let specialCase = ''
      if (editedPost.ownerInfo) {
        specialCase = editedPost.ownerInfo
      }
      let firstCase = ''
      if (parsedUser.id != editedPost.id_utente) {
        firstCase = []
        firstCase.push(parsedUser.id)
      }

      let finalData = {}
      finalData['id'] = editedPost.id
      finalData['soundInfo'] = obj
      finalData['soundIsExist'] = editedPost.audio
      finalData['published'] = editedPost.data_inserimento
      finalData['name'] = editedPost.luogo
      finalData['description'] = editedPost.testo
      finalData['ownerId'] = editedPost.id_utente
      finalData['privato'] = editedPost.privato
      finalData['tags'] = firstCase ? firstCase : editedPost.tags
      finalData['bondnames'] = firstCase ? 'Logged user' : editedPost.bondnames
      finalData['ownerInfo'] = specialCase
      finalData['pictures'] = picturesJJ
      finalData['commentLength'] = editedPost.commentLength
      finalData['commentUsers'] = editedPost.commentUsers
      finalData['comments'] = editedPost.comments

      let structedObject = {}
      structedObject['data'] = finalData
      structedObject['id'] = editedPost.id
      // structuredData.push(structedObject)
      const {pictures} = finalData

      let simpleObj = {}
      for (let k = 0; k < pictures.length; k++) {
        simpleObj['id'] = finalData.id
        simpleObj['data'] = finalData
        simpleObj['singlePicture'] = pictures[k]
        // particularImages.push(simpleObj)
      }

      data = data.map((single) => {
        if (single.id == editedPost.id) {
          return editedPost
        }
        return single
      })

      structuredData = structuredData.map((single) => {
        if (single.id == editedPost.id) {
          return structedObject
        }
        return single
      })

      renderingImages = renderingImages.map((single) => {
        if (single.id == editedPost.id) {
          return simpleObj
        }
        return single
      })

      return {
        ...state,
        posts: data,
        structuredData: structuredData,
        renderingImages: renderingImages,
      }
    }

    case Types.REMOVE_POST: {
      let data = [...state.posts]
      let structuredData = [...state.structuredData]
      let renderingImages = [...state.renderingImages]

      let eId = action.payload.removedId
      data = data.filter((single) => single.id != eId)
      structuredData = structuredData.filter((single) => single.id != eId)
      renderingImages = renderingImages.filter((single) => single.id != eId)
      // console.log(data.length,'post')
      return {
        ...state,
        posts: data,
        structuredData: structuredData,
        renderingImages: renderingImages,
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
    case Types.REFRESH_POSTS: {
      return {
        posts: [],
        renderingImages: [],
        structuredData: [],
        legami: []
      }
    }
    default:
      return state
  }
}

export default postReducer

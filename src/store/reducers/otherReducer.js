import * as Types from '../actions/types'

const initialState = {
  posts: [],
  legami: [],
  renderingImages: [],
  structuredData: [],
}

function otherReducer(state = initialState, action) {
  switch (action.type) {
    case Types.OTHER_LOAD_POSTS: {
      let finalData = [...state.posts, ...action.payload.posts]
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
          // finalData['bondnames'] = lastData[j].bondnames
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

    case Types.OTHER_REFRESH:
      return {
        posts: [],
        structuredData: [],
        renderingImages: [],
        legami: []
      }
    case Types.OTHER_LOAD_LEGAMI:
      return {
        ...state,
        legami: action.payload.legami,
      }
    default:
      return state
  }
}

export default otherReducer

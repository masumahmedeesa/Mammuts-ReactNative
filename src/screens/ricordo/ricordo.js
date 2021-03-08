import React from 'react'
import {
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import {ricodioActions, refreshPosts, legamiCollection} from '../../store/actions/postActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
import ImageGod from '../../components/ImageGod'

class RicordoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      imageLoading: false,
      onRefreshing: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {page} = this.state
    if (prevState.page !== page) {
      const user = JSON.parse(this.props.auth.user)
      this.props.showLoading()
      if (user) {
        this.props.ricodioActions(user.id, page, user)
      }
      this.props.hideLoading()
    }
  }

  ggTT = () => {
    this.setState({page: this.state.page + 1})
  }

  BottomView = () => {
    return (
      <View>
        {this.props.loading ? (
          <ActivityIndicator
            size="large"
            color="rgb(0,184,249)"
            style={{marginLeft: 6}}
          />
        ) : null}
      </View>
    )
  }

  renderDoubleImage = ({item, index}) => {
    const {navigation, posts, auth} = this.props
    const user = JSON.parse(auth.user)
    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    let ffgg = posts.renderingImages.length
    // console.log(index, posts.renderingImages.length)
    return (
      <View style={{flex: 1}} key={index}>
        <TouchableHighlight
          style={
            index + 1 == ffgg
              ? {backgroundColor: '#000000'}
              : {backgroundColor: '#323232'}
          }
          onPress={() =>
            navigation.navigate('Story', {
              data: item.data,
              images: item.data.pictures,
              user: user,
              sender: 'Ricordo',
              // navigation: navigation,
            })
          }>
          <ImageGod
            propWidth={screenWidth / 2}
            propHeight={screenHeight / 4}
            imageUrl={item.singlePicture}
            borderRadius={0}
          />
        </TouchableHighlight>
      </View>
    )
  }

  handleRefresh = () => {
    // this.setState({onRefreshing: true})
    this.props.refreshPosts()
    const user = JSON.parse(this.props.auth.user)
    this.props.showLoading()
    if (user) {
      this.props.legamiCollection(user.id)
      this.props.ricodioActions(user.id, 1, user)
    }
    this.props.hideLoading()
    // this.setState({onRefreshing: false})
  }

  render() {
    const {posts} = this.props
    // console.log(this.state.onRefreshing)
    if (posts.renderingImages && posts.renderingImages.length > 0) {
      return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={{width: '100%'}}>
            <FlatList
              style={{width: '100%'}}
              keyExtractor={(item, index) => index}
              numColumns={2}
              data={posts.renderingImages}
              onEndReachedThreshold={0.1}
              onEndReached={this.ggTT}
              renderItem={this.renderDoubleImage}
              ListFooterComponent={this.BottomView}
              refreshing={this.state.onRefreshing}
              onRefresh={this.handleRefresh}
            />
          </SafeAreaView>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'center',
            }}>
            <Icon name="frown" color="silver" style={{fontSize: 36}} />
            <Text style={{color: 'silver', fontSize: 21, paddingLeft: 8}}>
              Non hai caricato nessuna immagine.
            </Text>
          </View>
        </View>
      )
    }
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts,
    loading: state.support.loading,
  }
}
const Ricordo = (props) => {
  const navigation = useNavigation()
  return <RicordoScreen {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {
  ricodioActions,
  refreshPosts,
  showLoading,
  hideLoading,
  legamiCollection
})(Ricordo)

/* <FastImage
  style={{width, height: this.state.height}}
  source={{
   uri: 'https://google.com/image.png',
  }}
  onLoad={
    (evt) => {
      this.setState({
        height: evt.nativeEvent.height/evt.nativeEvent.width*width,
      });
    }
  }
/> */
// ({item}) => {
//   return (
//     <FastImage
//       style={{width: 200, height: 200}}
//       source={{uri: item.singlePicture}}
//       resizeMode={FastImage.resizeMode.contain}
//     />
//   )
// }
//   imageGenerator = () => {
//     const {posts} = this.props
//     let actualPosts = posts.posts
//     // console.log(actualPosts.length)
//     if (actualPosts.length > 0) {
//       let lenPosts = actualPosts.length
//       let particularImages = []
//       for (let j = 0; j < lenPosts; j++) {
//         let Pictures = actualPosts[j].immagine ? actualPosts[j].immagine : []
//         if (Pictures === null || Pictures == '') {
//           continue
//         }
//         const finalData = this.dataClassifier(actualPosts[j])
//         const {pictures} = finalData

//         for (let k = 0; k < pictures.length; k++) {
//           let simpleObj = {}
//           simpleObj['id'] = finalData.id
//           simpleObj['data'] = finalData
//           simpleObj['singlePicture'] = pictures[k]
//           particularImages.push(simpleObj)
//         }
//       }
//       this.setState({
//         allImages: particularImages,
//         postLength: lenPosts,
//         fetchingStatus: false,
//       })
//     }
//     // console.log(this.state.allImages.length,'imageGenerator')
//   }
//   dataClassifier(single) {
//     const {auth} = this.props
//     const user = auth.user
//     const parsedUser = JSON.parse(user)
//     let obj = {}
//     obj['title'] = 'wav remote download'
//     let genjam = single.audio ? single.audio : 'nope'
//     obj['url'] = 'https://mammuts.it/vocal/' + genjam
//     let pictures = []
//     if (single.immagine !== null) {
//       for (let i = 0; i < single.immagine.length; i++) {
//         pictures.push(
//           'https://mammuts.it' +
//             single.immagine[i].substring(2, single.immagine[i].length),
//         )
//       }
//     }
//     let specialCase = ''
//     if (single.ownerInfo) {
//       specialCase = single.ownerInfo
//     }
//     let firstCase = ''
//     if (parsedUser.id != single.id_utente) {
//       firstCase = []
//       firstCase.push(parsedUser.id)
//     }

//     let finalData = {}
//     finalData['id'] = single.id
//     finalData['soundInfo'] = obj
//     finalData['soundIsExist'] = single.audio
//     finalData['published'] = single.data_inserimento
//     finalData['name'] = single.luogo
//     finalData['description'] = single.testo
//     finalData['ownerId'] = single.id_utente
//     finalData['privato'] = single.privato
//     finalData['tags'] = firstCase ? firstCase : single.tags
//     finalData['bondnames'] = firstCase ? 'Logged user' : single.bondnames
//     finalData['ownerInfo'] = specialCase
//     finalData['pictures'] = pictures

//     return finalData
//   }
/* <ScrollView style={styles.container}>
          {this.renderRicordo(posts.posts)}
        </ScrollView> */

/* <View style={{paddingTop: 8, paddingBottom: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(0,184,249)',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={this.ggTT}>
            <Text style={{color: 'white'}}>LOAD MORE</Text>
          </TouchableOpacity>
        </View> */

// renderRicordo = (actualPosts) => {
//     const {navigation} = this.props
//     if (actualPosts.length > 0) {
//       let lenPosts = actualPosts.length
//       //   if (lenPosts > 16) {
//       //     lenPosts = 16
//       //   }
//       //   console.log(lenPosts)
//       var stories = []
//       for (let j = 0; j < lenPosts; j++) {
//         let Pictures = actualPosts[j].immagine ? actualPosts[j].immagine : []

//         if (Pictures === null || Pictures == '') {
//           continue
//         }
//         const finalData = this.dataClassifier(actualPosts[j])
//         const {pictures, id} = finalData
//         let dd = Date.now() + id

//         for (let k = 0; k < pictures.length; k++) {
//           stories.push(
//             <View
//               key={dd + pictures[k]}
//               style={{
//                 flex: 1,
//                 paddingBottom: 2,
//                 paddingRight: 2,
//               }}>
//               <TouchableHighlight
//                 onPress={() =>
//                   navigation.navigate('Story', {
//                     data: finalData,
//                     images: pictures,
//                     // navigation: navigation,
//                   })
//                 }>
//                 <FastImage
//                   style={{width: '100%', height: 130}}
//                   source={{uri: pictures[k], priority: FastImage.priority.high}}
//                   resizeMode={FastImage.resizeMode.contain}
//                 />
//                 <Image
//                   style={{width: '100%', height: 130}}
//                   source={{uri: pictures[k]}}
//                   resizeMode="cover"
//                   // onLoadStart={() => this.props.showLoading()}
//                   // onLoadEnd={() => this.props.hideLoading()}
//                 />
//               </TouchableHighlight>
//             </View>,
//           )
//         }
//       }
//       var firstTwo = []
//       for (let k = 0; k < stories.length; k = k + 2) {
//         if (k + 1 < stories.length) {
//           firstTwo.push(
//             <View key={k} style={{flex: 1, flexDirection: 'row'}}>
//               {stories[k]}
//               {stories[k + 1]}
//             </View>,
//           )
//         } else {
//           firstTwo.push(
//             <View key={k} style={{flex: 1, flexDirection: 'row'}}>
//               {stories[k]}
//             </View>,
//           )
//         }
//       }
//       console.log(stories.length)
//       return <View>{firstTwo}</View>
//     } else {
//       return (
//         <View>
//           <Text>No images found :(</Text>
//         </View>
//       )
//     }
//   }
// [
//   {
//     audio: 'audio/iJZ5XSHFe2rPVSp7RKnc1A6SpyUo3jqZMyBZAHFR.aac',
//     bondnames: [[Object]],
//     commentLength: 0,
//     commentUsers: [],
//     comments: [],
//     data_inserimento: '2021-03-05 10:30:19',
//     id: '690',
//     id_legame: '35',
//     id_utente: '35',
//     immagine: [
//       '../upload/ricordo/tyINHgj7wXsF8dTrDnzW1cQNb3wjgo7QrhDWlidb.jpg',
//     ],
//     luogo: 'everything alright?',
//     privato: '1',
//     tags: ['6'],
//     testo: 'jfijerwiu bieriu irrigate ieurgieirgie',
//   }
// ]

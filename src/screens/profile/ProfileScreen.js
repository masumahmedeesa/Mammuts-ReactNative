import React from 'react'
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  RefreshControl,
  SafeAreaView
} from 'react-native'
import Axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker'
import {connect} from 'react-redux'
import ImageGod from '../../components/ImageGod'
import {URLS} from '../../config/urls'
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Feather'
import EachPost from './EachPost'
import Connect from './Connect'
import Post from './Post'
import {
  ricodioActions,
  legamiCollection,
  refreshPosts,
  sortByMonthPaging
} from '../../store/actions/postActions'
import {updateAction} from '../../store/actions/authActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
import ModalForSorting from '../../components/ModalForSorting'

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: 'post',
      refreshing: false,
      page: 1,
      modalVisible: false,
    }
    this.selectImage = this.selectImage.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    let {page} = this.state
    if (prevState.page !== page) {
      const user = JSON.parse(this.props.auth.user)
      const {posts} = this.props
      this.props.showLoading()
      if (user) {
        if (posts.singleMonth) {
          // console.log(this.state.page, posts.singleMonth)
          this.props.sortByMonthPaging(user.id, posts.singleMonth, page, user)
        } else {
          this.props.ricodioActions(user.id, page, user)
        }
      }
      this.props.hideLoading()
    }
  }

  setPageOk = () => {
    // console.log('eikhane ashse from posts')
    this.setState({page: 1})
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  handleRefresh = () => {
    this.setState({page: 1})
    this.props.refreshPosts()
    const user = JSON.parse(this.props.auth.user)
    this.props.showLoading()
    if (user) {
      this.props.legamiCollection(user.id)
      this.props.ricodioActions(user.id, 1, user)
    }
    this.props.hideLoading()
  }

  selectImageOption = () => {
    Alert.alert(
      'Choose',
      'Select an option',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Gallery', onPress: () => this.selectImage('openPicker')},
        {text: 'Camera', onPress: () => this.selectImage('openCamera')},
      ],
      {cancelable: false},
    )
  }

  uploadData = async (data, url) => {
    const response = await Axios({
      method: 'post',
      url: url,
      data: data,
    })
    return response.data
  }

  selectImage(method) {
    ImagePicker[method]({
      width: 750,
      height: 600,
      cropping: true,
      multiple: false,
      includeBase64: true,
      mediaType: 'photo',
    }).then(async (image) => {
      this.props.showLoading()
      try {
        const fileName = image.path.split('/')
        const data = new FormData()
        data.append('file', {
          uri: image.path,
          type: image.mime,
          name: fileName[fileName.length - 1],
        })

        let cc = ''
        try {
          cc = (await this.uploadData(data, URLS.UPLOAD_PROFILE_PICTURE))
            .immagine
        } catch (e) {
          this.props.hideLoading()
          console.log(e)
        }

        if (cc) {
          this.props.updateAction({image_profile: cc})
        }
        this.props.hideLoading()
      } catch (e) {
        this.props.hideLoading()
        console.log(e)
      }
    })
  }

  renderProfileImage = () => {
    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    const {auth} = this.props
    const user = JSON.parse(auth.user)

    let profileImage = ''
    if (user.image_profile) {
      profileImage = 'https://mammuts.it/' + user.image_profile
    }

    return (
      <View>
        <Animatable.View
          animation="bounceIn"
          style={{
            alignItems: 'center',
            backgroundColor: '#eef',
            borderRadius: 10,
            // width: screenWidth * 0.94
          }}>
          <ImageGod
            propWidth={screenWidth}
            propHeight={screenHeight * 0.42}
            imageUrl={
              profileImage
                ? profileImage
                : 'https://mammuts.it/upload/profile/logo2.jpg'
            }
            borderRadius={10}
          />
        </Animatable.View>
      </View>
    )
  }

  pressPostTab = () => {
    this.setState({tabView: 'post'})
  }
  pressConnectTab = () => {
    this.setState({tabView: 'connect'})
  }

  ggTT = () => {
    this.setState({page: this.state.page + 1})
  }

  renderPosts = () => {
    const {navigation} = this.props
    const posts = this.props.posts.structuredData
    const user = this.props.auth.user

    if (posts && posts.length > 0) {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
          {posts.map((single) => {
            // 8 miliseconds
            const {pictures, id} = single.data
            let dd = Date.now() + id
            return (
              <View key={dd}>
                <EachPost
                  data={single.data}
                  images={pictures}
                  user={JSON.parse(user)}
                  navigation={navigation}
                />
              </View>
            )
          })}

          {posts && posts.length > 0 && (
            <View style={{paddingTop: 8, paddingBottom: 10}}>
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
            </View>
          )}
        </SafeAreaView>
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
              Non hai ancora caricato alcun ricordo.
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    const {navigation, auth, posts} = this.props
    const user = JSON.parse(auth.user)

    const {tabView, refreshing, modalVisible} = this.state
    // console.log(this.state.page,'ProfileScreen')
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }>
          {this.renderProfileImage()}
          <View style={{padding: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 19, fontWeight: '600', color: 'hotpink'}}>
                {user.nome} {user.cognome}
              </Text>
            </View>

            <Text style={{fontSize: 16, fontWeight: '600', color: 'silver'}}>
              {user.email}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.cardTwo,
              {marginTop: 10, marginLeft: 10, marginRight: 10},
            ]}
            onPress={this.selectImageOption}>
            <Text style={{textAlign: 'center', fontSize: 16, color: 'silver'}}>
              Modifica L'immagine Profilo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 10, marginRight: 10}}
            onPress={this.toggleModal}>
            <View style={styles.forCalendar}>
              <Icon name="filter" size={22} color="rgb(0,184,249)" />
              <Text
                style={{
                  color: 'silver',
                  fontSize: 18,
                  marginLeft: 5,
                  // marginTop: 1,
                  textAlign: 'center',
                }}>
                {posts.singleMonth ? posts.singleMonth : 'Cerca per mese'}
              </Text>
            </View>
          </TouchableOpacity>

          <ModalForSorting
            data={posts.months}
            setPageOk={this.setPageOk}
            modalVisible={modalVisible}
            onPress={this.toggleModal}
          />

          <View style={{marginTop: 15}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={
                  tabView === 'post' ? styles.newTabView : {padding: 8, flex: 1}
                }
                onPress={this.pressPostTab}>
                <Text
                  style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
                  La Mia Storia
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  tabView === 'connect'
                    ? styles.newTabView
                    : {padding: 8, flex: 1}
                }
                onPress={this.pressConnectTab}>
                <Text
                  style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
                  I Miei Legami
                </Text>
              </TouchableOpacity>
            </View>

            {tabView === 'post' ? (
              this.renderPosts()
            ) : tabView === 'connect' ? (
              <Connect navigation={navigation} />
            ) : // legami={posts.legami}
            null}
          </View>
        </ScrollView>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts,
  }
}
const ProfileScreenFunction = (props) => {
  const navigation = useNavigation()
  return <ProfileScreen {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {
  ricodioActions,
  showLoading,
  hideLoading,
  updateAction,
  legamiCollection,
  refreshPosts,
  sortByMonthPaging
})(ProfileScreenFunction)

// <Post navigation={navigation} posts={posts.structuredData} setPageOk={this.setPageOk}/>

// dataClassifier(single) {
//   const {auth} = this.props
//   const user = auth.user
//   const parsedUser = JSON.parse(user)
//   let obj = {}
//   obj['title'] = 'wav remote download'
//   let genjam = single.audio ? single.audio : 'nope'
//   obj['url'] = 'https://mammuts.it/vocal/' + genjam
//   let pictures = []
//   if (single.immagine !== null) {
//     for (let i = 0; i < single.immagine.length; i++) {
//       pictures.push(
//         'https://mammuts.it' +
//           single.immagine[i].substring(2, single.immagine[i].length),
//       )
//     }
//   }
//   let specialCase = ''
//   if (single.ownerInfo) {
//     specialCase = single.ownerInfo
//   }
//   let firstCase = ''
//   if (parsedUser.id != single.id_utente) {
//     firstCase = []
//     firstCase.push(parsedUser.id)
//   }

//   let finalData = {}
//   finalData['id'] = single.id
//   finalData['soundInfo'] = obj
//   finalData['soundIsExist'] = single.audio
//   finalData['published'] = single.data_inserimento
//   finalData['name'] = single.luogo
//   finalData['description'] = single.testo
//   finalData['ownerId'] = single.id_utente
//   finalData['privato'] = single.privato
//   finalData['tags'] = firstCase ? firstCase : single.tags
//   finalData['bondnames'] = firstCase ? 'Logged user' : single.bondnames
//   finalData['ownerInfo'] = specialCase
//   finalData['pictures'] = pictures

//   return finalData
// }

// renderRicordo = (actualPosts) => {
//   const {navigation} = this.props
//   if (actualPosts.length > 0) {
//     let lenPosts = actualPosts.length
//     // if (lenPosts > 16) {
//     //   lenPosts = 16
//     // }
//     var stories = []
//     for (let j = 0; j < lenPosts; j++) {
//       let Pictures = actualPosts[j].immagine ? actualPosts[j].immagine : []

//       if (Pictures === null || Pictures == '') {
//         continue
//       }
//       const finalData = this.dataClassifier(actualPosts[j])
//       const {pictures, id} = finalData
//       let dd = Date.now() + id

//       for (let k = 0; k < pictures.length; k++) {
//         stories.push(
//           <View
//             key={dd + pictures[k]}
//             style={{
//               flex: 1,
//               paddingBottom: 2,
//               paddingRight: 2,
//             }}>
//             <TouchableHighlight
//               onPress={() =>
//                 navigation.navigate('Story', {
//                   data: finalData,
//                   images: pictures,
//                   // navigation: navigation,
//                 })
//               }>
//               <Image
//                 style={{width: '100%', height: 130}}
//                 source={{uri: pictures[k]}}
//                 resizeMode="cover"
//                 // onLoadStart={() => this.props.showLoading()}
//                 // onLoadEnd={() => this.props.hideLoading()}
//               />
//             </TouchableHighlight>
//           </View>,
//         )
//       }
//     }
//     var firstTwo = []
//     for (let k = 0; k < stories.length; k = k + 2) {
//       if (k + 1 < stories.length) {
//         firstTwo.push(
//           <View key={k} style={{flex: 1, flexDirection: 'row'}}>
//             {stories[k]}
//             {stories[k + 1]}
//           </View>,
//         )
//       } else {
//         firstTwo.push(
//           <View key={k} style={{flex: 1, flexDirection: 'row'}}>
//             {stories[k]}
//           </View>,
//         )
//       }
//     }
//     return <View>{firstTwo}</View>
//   } else {
//     return (
//       <View>
//         <Text>No images found :(</Text>
//       </View>
//     )
//   }
// }
/* <Tabs tabBarUnderlineStyle={styles.tabBorder}>
              <Tab
                tabStyle={styles.tabStyle}
                textStyle={styles.textStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTextStyle={styles.activeTextStyle}
                heading="5 Ricordi">
                <View style={{backgroundColor: '#000000', flex: 1}}>
                  <View style={{marginTop: 15, flex: 1}}>{firstTwo}</View>
                </View>
              </Tab>
            </Tabs> */

/* <View style={{marginTop: 14}}>
<Tabs tabBarUnderlineStyle={styles.tabBorder}>
  <Tab
    tabStyle={styles.tabStyle}
    textStyle={styles.textStyle}
    activeTabStyle={styles.activeTabStyle}
    activeTextStyle={styles.activeTextStyle}
    heading="La Mia Storia">
    <View style={{backgroundColor: '#000000', flex: 1}}>
      <ScrollView>
        <EachPost
          // image= "1.png"
          name="Casarile (mi)"
          description="Registro audio pubblico foto indico il luogo dove ho scattato foto Posso rendere il post visibile solo a me"
          published="26/12/2020 17:48"
          navigation={navigation}
        />
        <EachPost
          // image="2.png"
          name="italy"
          description="Hi Rahat, I'm doing a test to better explain the functions of the site and what the app should do, even if I know you already know."
          published="26/08/2020 14:33"
          navigation={navigation}
        />
        <EachPost
          // image="cat.jpeg"
          name="Casarile (mi)"
          description="Registro audio pubblico foto indico il luogo dove ho scattato foto Posso rendere il post visibile solo a me"
          published="26/12/2020 17:48"
          navigation={navigation}
        />
      </ScrollView>
    </View>
  </Tab>

  <Tab
    tabStyle={styles.tabStyle}
    textStyle={styles.textStyle}
    activeTabStyle={styles.activeTabStyle}
    activeTextStyle={styles.activeTextStyle}
    heading="I Miei Legami">
    <View style={{backgroundColor: '#000000', flex: 1}}>
      <ScrollView style={{marginTop: 20}}>
        <Text style={styles.textStyle}>
          Non hai legami approvati
        </Text>
      </ScrollView>
    </View>
  </Tab>
</Tabs>
</View> */

// var stories = []
// for (let i = 0; i < Pictures.length; i++) {
//   let ch = Pictures[i].imageName
//   stories.push(
//     <View
//       key={i}
//       style={{
//         flex: 1,
//         paddingBottom: 2,
//         paddingRight: 2,
//       }}>
//       <TouchableHighlight
//         onPress={() =>
//           navigation.navigate('Story', {
//             id: Pictures[i].id,
//             name: Pictures[i].name,
//             description: Pictures[i].description,
//             imageName: Pictures[i].imageName,
//             comments: Pictures[i].comments,
//             privacy: Pictures[i].privacy,
//             audio: Pictures[i].audio,
//             published: Pictures[i].published,
//           })
//         }>
//         {ch == 'cat' ? (
//           <Image
//             style={{width: '100%', height: 130}}
//             source={require('../../../assets/images/cat.jpeg')}
//             resizeMode="cover"
//           />
//         ) : ch == 'cat1' ? (
//           <Image
//             style={{width: '100%', height: 130}}
//             source={require('../../../assets/images/cat1.jpg')}
//             resizeMode="cover"
//           />
//         ) : ch == 'cat2' ? (
//           <Image
//             style={{width: '100%', height: 130}}
//             source={require('../../../assets/images/cat2.jpg')}
//             resizeMode="cover"
//           />
//         ) : ch == 'cat3' ? (
//           <Image
//             style={{width: '100%', height: 130}}
//             source={require('../../../assets/images/cat3.jpg')}
//             resizeMode="cover"
//           />
//         ) : ch == 'cat4' ? (
//           <Image
//             style={{width: '100%', height: 130}}
//             source={require('../../../assets/images/cat4.jpg')}
//             resizeMode="cover"
//           />
//         ) : null}
//       </TouchableHighlight>
//     </View>,
//   )
// }
// // console.log(stories.length);
// var firstTwo = []

// for (let k = 0; k < stories.length; k = k + 2) {
//   if (k + 1 < stories.length) {
//     firstTwo.push(
//       <View key={k} style={{flex: 1, flexDirection: 'row'}}>
//         {stories[k]}
//         {stories[k + 1]}
//       </View>,
//     )
//   } else {
//     firstTwo.push(
//       <View key={k} style={{flex: 1, flexDirection: 'row'}}>
//         {stories[k]}
//       </View>,
//     )
//   }
// }

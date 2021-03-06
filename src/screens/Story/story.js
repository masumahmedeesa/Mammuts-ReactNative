import React from 'react'
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableHighlight,
  Dimensions,
  Switch,
  Alert,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  // Platform,
  // ToastAndroid,
  // AlertIOS
} from 'react-native'
import {connect} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import Toast from 'react-native-simple-toast'
import Axios from 'axios'
import {URLS} from '../../config/urls'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
import {removeAudio} from '../../store/actions/audioActions'
import {
  loadComments,
  uploadComment,
  removeComment,
} from '../../store/actions/commentActions'
import {postDelete} from '../../store/actions/postActions'
import SoundPlayer from '../profile/SoundPlayer'
import Record from '../Meme/Record/record'
import styles from './styles'

class StoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnable: this.props.route.params.data.privato == 0 ? false : true,
      commento: '',
    }
  }

  componentDidMount() {
    const {audio} = this.props
    this.props.showLoading()
    if (audio.formdata) {
      this.props.removeAudio()
    }
    this.loadMoreComments()
    this.props.hideLoading()
  }

  loadMoreComments = () => {
    const {data} = this.props.route.params
    const {id} = data
    this.props.loadComments(id)
  }

  deleteCommentFromDb = (id) => {
    // const {allComments} = this.state
    Alert.alert(
      'Warning!',
      'Sei sicuro di cancellare questo commento?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.props.showLoading()
            this.props.removeComment({commentId: id})
            this.props.hideLoading()
          },
        },
      ],
      {cancelable: false},
    )
  }

  commentSection = () => {
    const {comments, user} = this.props
    const parsedUser = JSON.parse(user)
    if (comments.length > 0) {
      const dataa = comments.map((single) => {
        const dd = toString(single.data_inserimento) + single.id
        let obj = {}
        if (single.audio) {
          obj['title'] = 'wav remote download'
          let genjam = single.audio ? single.audio : 'nope'
          obj['url'] = 'https://mammuts.it' + genjam
        }

        return (
          <View key={dd} style={[styles.cardW, {marginTop: 5}]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, paddingRight: 5}}>
                <Image
                  source={
                    single.user.image_profile
                      ? {uri: 'https://mammuts.it/' + single.user.image_profile}
                      : require('../../../assets/images/cat.jpeg')
                  }
                  // onLoadStart={() => this.props.showLoading()}
                  // onLoadEnd={() => this.props.hideLoading()}
                  style={{width: '100%', height: 45, borderRadius: 50}}
                />
              </View>
              <View
                style={{
                  flex: 7,
                  backgroundColor: '#303030',
                  borderRadius: 7,
                  padding: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', padding: 1}}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: 'rgb(0,184,249)',
                        fontWeight: '500',
                      }}>
                      {single.user.nome + ' ' + single.user.cognome}
                    </Text>
                    <Text
                      style={{
                        color: 'silver',
                        marginTop: 5,
                        marginLeft: 5,
                        fontSize: 11,
                      }}>
                      {single.data_inserimento}
                    </Text>
                  </View>
                  {parsedUser.nome === single.user.nome &&
                    parsedUser.cognome === single.user.cognome && (
                      <TouchableOpacity
                        onPress={() => this.deleteCommentFromDb(single.id)}>
                        <Icon
                          name="trash-2"
                          color="red"
                          style={{fontSize: 21}}
                        />
                      </TouchableOpacity>
                    )}
                </View>
                <View style={{padding: 3}}>
                  {single.testo ? (
                    <Text style={{color: '#fff', fontSize: 12}}>
                      {single.testo}
                    </Text>
                  ) : single.audio ? (
                    <View style={{paddingTop: 2, paddingBottom: 2}}>
                      {obj.url && <SoundPlayer soundInfo={obj} />}
                    </View>
                  ) : (
                    <Text style={{color: 'silver'}}>
                      La connessione a Internet è interrotta!
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        )
      })
      // this.props.hideLoading()
      return dataa
    } else {
      return (
        <View style={{paddingLeft: 16}}>
          <Text style={{color: 'silver'}}>Ancora nessun commento.</Text>
        </View>
      )
    }
  }

  renderPictures = () => {
    const {images} = this.props.route.params
    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    return (
      <View>
        {images.map((single) => {
          const dd = Date.now() + single
          return (
            <View
              key={dd}
              // animation="bounceIn"
              style={{alignItems: 'center'}}>
              <Image
                style={{
                  width: screenWidth * 0.94,
                  height: screenHeight * 0.35,
                  borderRadius: 10,
                }}
                source={{uri: single}}
                resizeMode="cover"
                // onLoadStart={() => this.props.showLoading()}
                // onLoadEnd={() => this.props.hideLoading()}
              />
              <View style={{paddingBottom: 8}} />
            </View>
          )
        })}
      </View>
    )
  }

  switchHandler = async () => {
    this.props.showLoading()
    const {isEnable} = this.state
    const {data} = this.props.route.params
    const {id} = data
    let swh
    try {
      swh = await this.uploadData(
        {privato: isEnable ? 0 : 1, ricordoId: id},
        URLS.CHANGE_PRIVATO,
      )
    } catch (e) {
      this.props.hideLoading()
      console.warn(e, 'text comment')
    }
    if (swh.data_inserimento) {
      this.setState({isEnable: !this.state.isEnable})
      Toast.show('La privacy è cambiata :)')
    } else {
      this.props.hideLoading()
      Toast.show('Nessuna connessione internet.')
    }
    this.props.hideLoading()
  }

  renderBondNames = () => {
    const {data} = this.props.route.params
    const {navigation} = this.props
    const {bondnames} = data
    return (
      <View>
        {bondnames.map((single) => {
          const dd = Date.now() + single.nome
          return (
            <View key={dd} style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{paddingLeft: 5}}
                onPress={() => navigation.navigate('Profile')}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: 'rgb(0,184,249)',
                  }}>
                  {single ? single.nome + ' ' + single.cognome : 'Nobody'}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }

  commentoChangeHandler = (value) => {
    this.setState({commento: value})
  }

  uploadData = async (data, url) => {
    const response = await Axios({
      method: 'post',
      url: url,
      data: data,
    })
    return response.data
  }

  uploadTextAsComment = async () => {
    this.props.showLoading()
    const {commento} = this.state
    const {data} = this.props.route.params
    const {id} = data
    let ct
    try {
      ct = await this.uploadData(
        {testo: commento, postId: id},
        URLS.TEXTCOMMENT,
      )
      this.props.uploadComment(ct)
    } catch (e) {
      this.props.hideLoading()
      console.warn(e, 'text comment')
    }
    this.setState({commento: ''})
    if (ct.testo) {
      Toast.show('Il commento è stato caricato con successo.')
    } else {
      this.props.hideLoading()
      Toast.show('Error uploading.')
    }
    this.props.hideLoading()
  }

  uploadAudioAsComment = async () => {
    this.props.showLoading()
    const {audio} = this.props
    const {data} = this.props.route.params
    const {id} = data
    let cc, finalRes
    if (audio.formdata) {
      try {
        cc = await this.uploadData(audio.formdata, URLS.UPLOAD_AUDIO)
        let audioFileName = '/' + cc.audio
        finalRes = await this.uploadData(
          {audio: audioFileName, postId: id},
          URLS.AUDIOCOMMENT,
        )
        this.props.uploadComment(finalRes)
      } catch (e) {
        this.props.hideLoading()
        console.log(e, 'uploading audio in comment!')
      }
    }
    this.props.removeAudio()
    if (finalRes.audio) {
      Toast.show(
        "L'audio è stato caricato correttamente come commento.",
        Toast.LONG,
      )
    } else {
      this.props.hideLoading()
      Toast.show('Error uploading')
    }
    this.props.hideLoading()
  }

  removeWholePost = (id) => {
    const {navigation} = this.props
    Alert.alert(
      'Warning!',
      'Sei sicuro di cancellare questa memoria?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.props.showLoading()
            this.props.postDelete(id)
            this.props.hideLoading()
            // setTimeout(()=>{
            navigation.navigate('Profile')
            // },800)
            Toast.show('Memory has been deleted successfully!', Toast.LONG)
          },
        },
      ],
      {cancelable: false},
    )
  }

  render() {
    const {isEnable, commento} = this.state
    const {user, navigation } = this.props
    const {data, images} = this.props.route.params
    const {
      id,
      name,
      description,
      published,
      soundInfo,
      soundIsExist,
      tags,
      bondnames,
    } = data
    const parsedUser = JSON.parse(user)

    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.container}>
          {tags.length > 0 && (
            <View style={{flexDirection: 'row', paddingLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontWeight: '500',
                  paddingBottom: 7,
                }}>
                Presenti nel ricordo
              </Text>
              {/* Jump to the personal profile */}
              {bondnames === 'Logged user' ? (
                <TouchableOpacity
                  style={{paddingLeft: 5}}
                  onPress={() => navigation.navigate('Profile')}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: 'rgb(0,184,249)',
                    }}>
                    {parsedUser.nome + ' ' + parsedUser.cognome}
                  </Text>
                </TouchableOpacity>
              ) : (
                this.renderBondNames()
              )}
            </View>
          )}

          <View style={{paddingBottom: 8}} />

          <View style={styles.firstColumn}>
            <View style={{paddingLeft: 4}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
                {published}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('EditMeme', {
                    images: images,
                    data: data,
                    // soundInfo: soundInfo,
                  })
                }}>
                <Icon
                  name="edit"
                  color="silver"
                  style={{fontSize: 20, paddingRight: 10}}
                />
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.removeWholePost(id)
                }}>
                <Icon name="trash-2" color="hotpink" style={{fontSize: 20}} />
              </TouchableHighlight>
            </View>
          </View>

          <View style={{paddingLeft: 14, paddingTop: 12, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="map-pin"
                color="rgb(0,184,249)"
                style={{fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'silver',
                  marginLeft: 5,
                }}>
                {name}
              </Text>
            </View>
          </View>
          <View
            style={{paddingLeft: 14, paddingTop: 7, paddingRight: 6, flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'silver'}}>
              {description}
            </Text>
          </View>

          {soundIsExist.length > 0 ? (
            <View
              style={{
                paddingTop: 8,
                paddingBottom: 10,
                paddingLeft: 8,
                paddingRight: 8,
              }}>
              <SoundPlayer soundInfo={soundInfo} />
            </View>
          ) : (
            <View style={{paddingBottom: 8}} />
          )}

          {this.renderPictures()}

          <View
            style={[
              styles.cardTwo,
              {marginTop: 15, marginLeft: 10, marginRight: 10},
            ]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'rgb(0,184,249)',
              }}>
              Privacy Del Post
            </Text>

            <View style={{flex: 1, flexDirection: 'row', paddingTop: 3}}>
              <Text style={{fontSize: 16, flex: 6, color: 'white'}}>
                Abilita questa opzione per rendere il post visible solo a te
              </Text>
              <View style={{flex: 1, paddingTop: 5, paddingRight: 5}}>
                <Switch
                  trackColor={{false: '#000000', true: '#fff'}}
                  thumbColor={isEnable ? 'rgb(0,184,249)' : '#f4f3f3'}
                  onValueChange={this.switchHandler}
                  value={isEnable}
                  ios_backgroundColor="#000000"
                />
              </View>
            </View>
          </View>

          <View style={[styles.cardW, {marginTop: 30}]}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'silver'}}>
              Commento
            </Text>
          </View>

          {this.commentSection()}

          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#323232',
              borderRadius: 8,
            }}>
            <TextInput
              name="commento"
              placeholder={'Lascia un commento'}
              placeholderTextColor="gray"
              returnKeyType="go"
              style={styles.textInputW}
              value={commento}
              autoCapitalize="none"
              multiline
              onChangeText={this.commentoChangeHandler}
            />
            <TouchableHighlight
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                flex: 1,
                borderRadius: 8,
              }}
              onPress={this.uploadTextAsComment}>
              <Icon
                name="send"
                style={{fontSize: 24, fontWeight: '500', color: 'silver'}}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.universal}>
            <View style={styles.foto}>
              <View>
                <Record />
              </View>
            </View>
          </View>

          <TouchableHighlight
            style={styles.universal}
            onPress={this.uploadAudioAsComment}>
            <View
              style={{
                backgroundColor: '#323232',
                borderRadius: 8,
                padding: 2,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: 'white'}}>
                  Oppure registra iun audio
                </Text>
                <Icon
                  name="mic"
                  style={{fontSize: 35, padding: 5, color: 'white'}}
                />
              </View>
            </View>
          </TouchableHighlight>

          <View style={{marginBottom: 16}} />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    audio: state.audio,
    comments: state.comments.comments,
  }
}

const StoryScreenFunction = (props) => {
  const navigation = useNavigation()
  return <StoryScreen {...props} navigation={navigation} />
}
export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  removeAudio,
  loadComments,
  uploadComment,
  removeComment,
  postDelete,
})(StoryScreenFunction)

// {ch == 'cat' ? (
//   <Image
//     style={{
//       width: screenWidth * 0.94,
//       height: screenHeight * 0.2,
//       borderRadius: 10,
//     }}
//     source={require('../../../assets/images/cat.jpeg')}
//     resizeMode="cover"
//   />
// ) : ch == 'cat1' ? (
//   <Image
//     style={{
//       width: screenWidth * 0.94,
//       height: screenHeight * 0.2,
//       borderRadius: 10,
//     }}
//     source={require('../../../assets/images/cat1.jpg')}
//     resizeMode="cover"
//   />
// ) : ch == 'cat2' ? (
//   <Image
//     style={{
//       width: screenWidth * 0.94,
//       height: screenHeight * 0.2,
//       borderRadius: 10,
//     }}
//     source={require('../../../assets/images/cat2.jpg')}
//     resizeMode="cover"
//   />
// ) : ch == 'cat3' ? (
//   <Image
//     style={{
//       width: screenWidth * 0.94,
//       height: screenHeight * 0.2,
//       borderRadius: 10,
//     }}
//     source={require('../../../assets/images/cat3.jpg')}
//     resizeMode="cover"
//   />
// ) : ch == 'cat4' ? (
//   <Image
//     style={{
//       width: screenWidth * 0.94,
//       height: screenHeight * 0.2,
//       borderRadius: 10,
//     }}
//     source={require('../../../assets/images/cat4.jpg')}
//     resizeMode="cover"
//   />
// ) : null}

/* <Animatable.View
key={dd}
animation="bounceIn"
style={{alignItems: 'center'}}>
<Image
  style={{
    width: screenWidth * 0.94,
    height: screenHeight * 0.2,
    borderRadius: 10,
  }}
  source={{uri: single}}
  resizeMode="cover"
/>
</Animatable.View> */
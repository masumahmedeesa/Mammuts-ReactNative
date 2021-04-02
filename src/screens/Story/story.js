import React from 'react'
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Switch,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import Toast from 'react-native-simple-toast'
import Axios from 'axios'
import ImageGod from '../../components/ImageGod'
import {URLS} from '../../config/urls'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
import {removeAudio} from '../../store/actions/audioActions'
import {
  loadComments,
  uploadComment,
  removeComment,
  refreshComment,
} from '../../store/actions/commentActions'
import {postDelete} from '../../store/actions/postActions'
import SoundPlayer from '../profile/SoundPlayer'
import RecordPlayer from '../expo/RecordPlayer'
// import ExpoPlayer from '../expo/ExpoPlayer'
// import Record from '../Meme/Record/record'
// import DumyPlayer from '../Meme/Record/DumyPlayer'
import styles from './styles'

class StoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnable: this.props.route.params.data.privato == 0 ? false : true,
      commento: '',
    }
    // console.log(this.props.route.params.data.privato)
  }

  componentDidMount() {
    const {audio} = this.props
    this.props.showLoading()
    if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
      this.props.removeAudio()
    }
    this.props.refreshComment()
    this.loadMoreComments()
    this.props.hideLoading()
  }

  // componentWillUnmount(){
  //   // console.log('unmount')
  //   this.props.showLoading()
  //   this.props.refreshComment()
  //   this.props.hideLoading()
  // }

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
    const {comments, otherLevel, navigation} = this.props
    const {user, sender} = this.props.route.params
    const parsedUser = user
    const parsedLevel = JSON.parse(otherLevel)

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
                <ImageGod
                  propWidth={'100%'}
                  propHeight={45}
                  imageUrl={
                    single.user.image_profile
                      ? 'https://mammuts.it/' + single.user.image_profile
                      : 'https://mammuts.it/upload/profile/logo2.jpg'
                  }
                  borderRadius={50}
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
                    <TouchableOpacity
                      onPress={() => {
                        if (parsedLevel.id == single.user.id) {
                          navigation.navigate('Profile')
                        } else if (user.id == single.user.id) {
                          navigation.goBack()
                        } else {
                          // sender
                          if (sender === 'Individual') {
                            navigation.navigate('Other', {
                              user: single.user,
                            })
                          } else {
                            navigation.navigate('Individual', {
                              user: single.user,
                            })
                          }
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: 'rgb(0,184,249)',
                          // fontWeight: '500',
                        }}>
                        {single.user.nome + ' ' + single.user.cognome}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'silver',
                        marginTop: 5,
                        marginLeft: 5,
                        fontSize: 12,
                      }}>
                      {single.data_inserimento}
                    </Text>
                  </View>
                  {parsedLevel.nome === single.user.nome &&
                    parsedLevel.cognome === single.user.cognome && (
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
                    <Text style={{color: '#fff', fontSize: 14}}>
                      {single.testo}
                    </Text>
                  ) : single.audio ? (
                    <View style={{paddingTop: 2, paddingBottom: 2}}>
                      {obj.url && <SoundPlayer soundInfo={obj} />}
                      {/* {obj.url && <ExpoPlayer soundInfo={obj} />} */}
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
              style={{
                alignItems: 'center',
                backgroundColor: '#323232',
                borderRadius: 10,
                height: screenHeight * 0.4,
                marginBottom: 3,
              }}>
              <ImageGod
                propWidth={screenWidth}
                propHeight={screenHeight * 0.4}
                imageUrl={
                  single
                    ? single
                    : 'https://mammuts.it/upload/profile/logo2.jpg'
                }
                borderRadius={0}
              />
              {/* <Image
                style={{
                  width: screenWidth * 0.94,
                  height: screenHeight * 0.35,
                  borderRadius: 10,
                }}
                source={{uri: single}}
                resizeMode="cover"
                // onLoadStart={() => this.props.showLoading()}
                // onLoadEnd={() => this.props.hideLoading()}
              /> */}
              <View style={{paddingBottom: 10}} />
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
      Toast.show('La privacy è cambiata :)', Toast.LONG)
    } else {
      this.props.hideLoading()
      Toast.show('Nessuna connessione internet :(', Toast.LONG)
    }
    this.props.hideLoading()
  }

  renderBondNames = () => {
    const {data, sender, user} = this.props.route.params
    const {navigation, otherLevel} = this.props
    const parsedLevel = JSON.parse(otherLevel)
    const {bondnames} = data
    return (
      <View>
        {bondnames.map((single) => {
          const dd = Date.now() + single.nome
          return (
            <View key={dd} style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{paddingLeft: 5}}
                onPress={() => {
                  if (parsedLevel.id == single.id) {
                    navigation.navigate('Profile')
                  } else if (user.id == single.id) {
                    navigation.goBack()
                  } else {
                    // sender
                    if (sender === 'Individual') {
                      navigation.navigate('Other', {
                        user: single,
                      })
                    } else {
                      navigation.navigate('Individual', {
                        user: single,
                      })
                    }
                    // else if (sender === 'Individual') {
                    //   navigation.navigate('Other', {
                    //     user: single,
                    //   })
                    // }
                  }
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
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
      Toast.show('Il commento è stato caricato con successo.', Toast.LONG)
    } else {
      this.props.hideLoading()
      Toast.show('Errore di connessione a Internet.', Toast.LONG)
    }
    this.props.hideLoading()
  }

  uploadAudioAsComment = async () => {
    this.props.showLoading()
    const {audio} = this.props
    const {data} = this.props.route.params
    const {id} = data
    let cc, finalRes
    if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
      // console.log(audio.formdata)
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
    if (finalRes && finalRes.audio) {
      Toast.show(
        "L'audio è stato caricato correttamente come commento.",
        Toast.LONG,
      )
    } else {
      this.props.hideLoading()
      Toast.show('Errore di connessione a Internet :(', Toast.LONG)
    }
    this.props.hideLoading()
  }

  removeWholePost = (id) => {
    const {navigation} = this.props
    const {sender} = this.props.route.params
    Alert.alert(
      'Attenzione!',
      'Sei sicuro di volere cancellare questa ricordo?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.props.showLoading()
            this.props.postDelete(id)
            this.props.hideLoading()
            // setTimeout(()=>{

            navigation.navigate(sender ? sender : 'Profile')
            // },800)
            Toast.show(
              'La memoria è stata cancellata con successo!',
              Toast.LONG,
            )
          },
        },
      ],
      {cancelable: false},
    )
  }

  render() {
    const {isEnable, commento} = this.state
    const {navigation, otherLevel} = this.props
    const {data, images, sender, user} = this.props.route.params
    const {
      id,
      name,
      description,
      published,
      soundInfo,
      soundIsExist,
      tags,
      ownerInfo,
      bondnames,
      ownerId,
    } = data
    const parsedUser = user
    // console.log(parsedUser, 'Story')
    const parsedLevel = JSON.parse(otherLevel)
    // console.log(name ? name : 'nai', 'story----')
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.container}>
          {tags.length > 0 && (
            <View style={{flexDirection: 'row', paddingLeft: 12}}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'silver',
                  fontWeight: '400',
                  paddingBottom: 7,
                }}>
                Presenti nel ricordo
              </Text>
              {/* Jump to the personal profile */}
              {bondnames === 'Logged user' ? (
                <TouchableOpacity style={{paddingLeft: 5}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '400',
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

          <View
            style={{
              flex: 1,
              paddingLeft: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              {parsedUser && parsedUser.id == ownerId ? (
                <ImageGod
                  propWidth={35}
                  propHeight={35}
                  imageUrl={
                    parsedUser.image_profile
                      ? 'https://mammuts.it/' + parsedUser.image_profile
                      : 'https://mammuts.it/upload/profile/logo2.jpg'
                  }
                  borderRadius={50}
                />
              ) : (
                <ImageGod
                  propWidth={35}
                  propHeight={35}
                  imageUrl={
                    ownerInfo.image_profile
                      ? 'https://mammuts.it/' + ownerInfo.image_profile
                      : 'https://mammuts.it/upload/profile/logo2.jpg'
                  }
                  borderRadius={50}
                />
              )}
              <View>
                {parsedUser.id == ownerId ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'rgb(0,184,249)',
                      fontWeight: '400',
                      paddingLeft: 6,
                    }}>
                    Ricordo personale
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      if (parsedLevel.id == ownerId) {
                        navigation.navigate('Profile')
                      } else if (user.id == ownerId) {
                        navigation.goBack()
                      } else {
                        // sender
                        if (sender === 'Individual') {
                          navigation.navigate('Other', {
                            user: ownerInfo,
                          })
                        } else {
                          navigation.navigate('Individual', {
                            user: ownerInfo,
                          })
                        }
                      }
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'rgb(0,184,249)',
                        fontWeight: '400',
                        paddingLeft: 6,
                        // paddingTop: 6,
                      }}>
                      {ownerInfo.nome && 'Ricordo di ' + ownerInfo.nome}
                    </Text>
                  </TouchableOpacity>
                )}

                <Text
                  style={{
                    fontSize: 12,
                    // fontWeight: '600',
                    color: 'silver',
                    paddingLeft: 6,
                  }}>
                  Pubblicato {published}
                </Text>
              </View>
            </View>

            {ownerId == parsedLevel.id && parsedLevel.id == parsedUser.id && (
              <View style={{flexDirection: 'row', paddingRight: 10}}>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('EditMeme', {
                      images: images,
                      data: data,
                      sender: sender ? sender : 'Profile',
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
            )}
          </View>

          {name ? (
            <View style={styles.firstColumn}>
              <View style={{paddingLeft: 4, marginTop: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="map-pin"
                    color="rgb(0,184,249)"
                    style={{fontSize: 19}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      marginLeft: 5,
                    }}>
                    {name}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View />
          )}

          {description ? (
            <View
              style={{
                paddingLeft: 14,
                paddingTop: 7,
                paddingRight: 6,
                paddingBottom: 8,
                flex: 1,
              }}>
              <Text style={{fontSize: 16, color: 'white'}}>{description}</Text>
            </View>
          ) : (
            <View />
          )}

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

          {parsedLevel.id == parsedUser.id && (
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
          )}

          <View style={[styles.cardW, {marginTop: 30}]}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'silver'}}>
              Commento
            </Text>
          </View>
          <View>{this.commentSection()}</View>

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
                style={{fontSize: 24, fontWeight: '400', color: 'silver'}}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.universal}>
            <View style={styles.foto}>
              <View>
                <RecordPlayer />
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
                <Text style={{fontSize: 18, color: 'white'}}>
                  Oppure registra un audio
                </Text>
                <Icon
                  name="mic"
                  style={{fontSize: 30, padding: 5, color: 'white'}}
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
    otherLevel: state.auth.user,
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
  refreshComment,
  postDelete,
})(StoryScreenFunction)

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

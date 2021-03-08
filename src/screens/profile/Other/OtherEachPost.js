import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native'
import {connect} from 'react-redux'
// import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Feather'
import ImageGod from '../../../components/ImageGod'
import styles from '../styles'
import SoundPlayer from '../SoundPlayer'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'

class OtherEachPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen1: false,
    }
  }

  renderComment = () => {
    const {data, navigation, otherLevel, user} = this.props
    const parsedLevel = JSON.parse(otherLevel)
    const {commentUsers, comments} = data
    let obj = {}
    if (comments.audio) {
      obj['title'] = 'wav remote download'
      let genjam = comments.audio ? comments.audio : 'nope'
      obj['url'] = 'https://mammuts.it' + genjam
    }
    // console.log('here')
    return (
      <View style={[styles.cardW, {marginTop: 7, marginBottom: 7}]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingRight: 5}}>
            <ImageGod
              propWidth={35}
              propHeight={35}
              imageUrl={
                commentUsers.image_profile
                  ? 'https://mammuts.it/' + commentUsers.image_profile
                  : 'https://mammuts.it/upload/profile/logo_mammuts.png'
              }
              borderRadius={50}
            />
          </View>
          <View
            style={{
              flex: 10,
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
                    if (parsedLevel.id == commentUsers.id) {
                      navigation.navigate('Profile')
                    } else if (user.id == commentUsers.id) {
                      //   navigation.navigate('Individual')
                    } else {
                      navigation.navigate('Individual', {user: commentUsers})
                    }
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgb(0,184,249)',
                      fontWeight: '500',
                    }}>
                    {commentUsers.nome + ' ' + commentUsers.cognome}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'silver',
                    marginTop: 1,
                    marginLeft: 5,
                    fontSize: 12,
                  }}>
                  {comments.data_inserimento}
                </Text>
              </View>
            </View>
            <View style={{padding: 3}}>
              {comments.testo ? (
                <Text style={{color: '#fff', fontSize: 12}}>
                  {comments.testo}
                </Text>
              ) : comments.audio ? (
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
  }

  modalToggle = () => {
    this.setState({isOpen1: !this.state.isOpen1})
  }

  renderPictures = () => {
    const {images} = this.props
    let Pictures = images
    const screenHeight = Dimensions.get('screen').height
    var stories = []
    for (let i = 0; i < Pictures.length; i++) {
      stories.push(
        <View
          style={{
            flex: 1,
            paddingBottom: 2,
            paddingRight: 2,
            backgroundColor: '#323232',
          }}>
          <ImageGod
            propWidth={'100%'}
            propHeight={screenHeight * 0.4}
            imageUrl={
              Pictures[i]
                ? Pictures[i]
                : 'https://mammuts.it/upload/profile/logo_mammuts.png'
            }
            borderRadius={0}
          />
        </View>,
      )
    }

    var firstTwo = []
    for (let k = 0; k < stories.length; k = k + 2) {
      if (k + 1 < stories.length) {
        firstTwo.push(
          <View key={k} style={{flex: 1, flexDirection: 'row'}}>
            {stories[k]}
            {stories[k + 1]}
          </View>,
        )
      } else {
        firstTwo.push(
          <View key={k} style={{flex: 1, flexDirection: 'row'}}>
            {stories[k]}
          </View>,
        )
      }
    }
    if (Pictures.length > 0) return <View>{firstTwo}</View>
    else return <View />
  }

  renderBondNames = () => {
    const {data, navigation, otherLevel, user} = this.props
    const parsedLevel = JSON.parse(otherLevel)
    const {bondnames} = data
    return (
      <View>
        {bondnames.map((single) => {
          const dd = Date.now() + single.nome
          return (
            <View key={dd}>
              <TouchableOpacity
                style={{paddingLeft: 5}}
                onPress={() => {
                  if (parsedLevel.id == single.id) {
                    navigation.navigate('Profile')
                  } else if (user.id == single.id) {
                    // navigation.navigate('Individual')
                    // No job
                  } else {
                    navigation.navigate('Individual', {user: single})
                  }
                }}>
                <Text
                  style={{
                    fontSize: 14,
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

  render() {
    const {data, user, navigation, images, otherLevel} = this.props
    const {
      name,
      description,
      published,
      soundInfo,
      soundIsExist,
      ownerId,
      tags,
      bondnames,
      ownerInfo,
      commentLength,
      //   commentUsers,
      //   comments,
    } = data

    const parsedUser = user
    const parsedLevel = JSON.parse(otherLevel)

    return (
      <View style={{paddingTop: 9}}>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Story', {
              images: images,
              data: data,
              user: parsedUser,
              sender: 'Other',
              // navigation: navigation,
            })
          }>
          <View style={{backgroundColor: '#404040', padding: 8}}>
            {tags.length > 0 && (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'silver',
                    paddingBottom: 7,
                  }}>
                  Presenti nel ricordo
                </Text>

                {bondnames === 'Logged user' ? (
                  <TouchableOpacity
                    style={{paddingLeft: 5}}
                    // onPress={() => navigation.navigate('Profile')}
                  >
                    <Text
                      style={{
                        fontSize: 14,
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

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                {parsedUser.id == ownerId ? (
                  <ImageGod
                    propWidth={35}
                    propHeight={35}
                    imageUrl={
                      parsedUser.image_profile
                        ? 'https://mammuts.it/' + parsedUser.image_profile
                        : 'https://mammuts.it/upload/profile/logo_mammuts.png'
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
                        : 'https://mammuts.it/upload/profile/logo_mammuts.png'
                    }
                    borderRadius={50}
                  />
                )}
                <View>
                  {parsedUser.id == ownerId ? (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'rgb(0,184,249)',
                        fontWeight: '400',
                        paddingLeft: 6,
                        // paddingTop: 6,
                      }}>
                      Ricordo personale
                    </Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (parsedLevel.id == ownerId) {
                          navigation.navigate('Profile')
                        } else {
                          navigation.navigate('Individual', {user: ownerInfo})
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
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
                      color: 'silver',
                      paddingLeft: 6,
                    }}>
                    Pubblicato {published}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 9}}>
              <Icon
                name="map-pin"
                color="rgb(0,184,249)"
                style={{fontSize: 18}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: 'silver',
                  marginLeft: 5,
                }}>
                {name}
              </Text>
            </View>

            <View
              style={{
                paddingLeft: 2,
                paddingTop: 8,
                paddingBottom: 8,
                flex: 1,
              }}>
              <Text style={{fontSize: 14, color: 'white'}}>{description}</Text>
            </View>

            {soundIsExist.length > 0 && (
              <View style={{paddingTop: 6, paddingBottom: 6}}>
                <SoundPlayer soundInfo={soundInfo} />
              </View>
            )}

            <View style={{paddingTop: 6}}>{this.renderPictures()}</View>

            <View style={{paddingTop: 5}} />
            {commentLength > 0 && this.renderComment()}
            {commentLength > 1 && (
              <View style={{marginBottom: 7}}>
                <Text style={{color: 'rgb(0,184,249)'}}>
                  Leggi altre {commentLength - 1} comunicazioni...
                </Text>
              </View>
            )}

            <TouchableHighlight
              onPress={() => {
                navigation.navigate('Story', {
                  images: images,
                  data: data,
                  user: parsedUser,
                  sender: 'Other',
                })
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#323232',
                  borderRadius: 8,
                  padding: 5,
                }}>
                <View>
                  <Text style={{color: 'grey', padding: 1}}>
                    Lascia un commento..
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
                    <Icon
                      name="send"
                      style={{fontSize: 20, fontWeight: '500', color: 'silver'}}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingRight: 5,
                      paddingLeft: 5,
                      borderRadius: 8,
                    }}>
                    <Icon
                      name="mic"
                      style={{fontSize: 20, fontWeight: '500', color: 'silver'}}
                    />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    otherLevel: state.auth.user,
  }
}

const OtherEachPostFunction = (props) => {
  return <OtherEachPost {...props} />
}

export default connect(mapStateToProps, {showLoading, hideLoading})(
  OtherEachPostFunction,
)

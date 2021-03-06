import React from 'react'
import {
  Text,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  Switch,
  Image,
  Dimensions,
} from 'react-native'
// import {WebView} from 'react-native-webview'
import {connect} from 'react-redux'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Feather'
import SpecialIcon from 'react-native-vector-icons/MaterialIcons'
// import HTMLView from 'react-native-htmlview'
import styles from '../styles'
import SoundPlayer from '../SoundPlayer'
// import SinglePlayer from './SinglePlayer'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'

class OtherEachPostClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen1: false,
    }
  }

  renderComment = (name, message) => {
    return (
      <View style={[styles.cardW, {marginTop: 7}]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingRight: 5}}>
            <Image
              source={require('../../../../assets/images/cat.jpeg')}
              style={{width: 35, height: 35, borderRadius: 50}}
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
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgb(0,184,249)',
                    fontWeight: '500',
                  }}>
                  {name}
                </Text>
                <Text
                  style={{
                    color: 'silver',
                    marginTop: 1,
                    marginLeft: 5,
                    fontSize: 12,
                  }}>
                  25/08/2020
                </Text>
              </View>
              <Icon name="trash-2" color="silver" style={{fontSize: 15}} />
            </View>
            <View style={{padding: 3}}>
              <Text style={{color: '#fff', fontSize: 12}}>{message}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  modalToggle = () => {
    this.setState({isOpen1: !this.state.isOpen1})
  }

  renderPictures = (Pictures) => {
    const screenHeight = Dimensions.get('screen').height
    // const screenWidth = Dimensions.get('screen').width
    var stories = []
    // console.log(Pictures, 'renderPictures')
    // this.props.showLoading()
    for (let i = 0; i < Pictures.length; i++) {
      stories.push(
        <View
          style={{
            flex: 1,
            paddingBottom: 2,
            paddingRight: 2,
          }}>
          <TouchableHighlight>
            <Image
              style={{width: '100%', height: screenHeight * 0.3}}
              source={{uri: Pictures[0]}}
              resizeMode="cover"
              onLoadStart={()=>this.props.showLoading()}
              onLoadEnd={()=>this.props.hideLoading()}
            />
          </TouchableHighlight>
        </View>,
      )
    }
    // this.props.hideLoading()
    // console.log(stories.length)
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

  render() {
    let {
      name,
      description,
      published,
      navigation,
      image,
      track,
      info,
      images,
      soundInfo,
      soundIsExist,
    } = this.props
    // soundInfo = "https://mammuts.it/vocal/" + soundInfo
    // console.log(images)
    // console.log(desc)
    const {image_profile} = info
    return (
      <View>
        <View style={{paddingTop: 8}}>
          <View
            style={{backgroundColor: '#404040', borderRadius: 10, padding: 7}}>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
              {image_profile ?
                <Image
                  source={{uri: "https://mammuts.it/"+image_profile}}
                  style={{width: 35, height: 35, borderRadius: 50}}
                /> : <Image
                  source={require('../../../../assets/images/cat.jpeg')}
                  style={{width: 35, height: 35, borderRadius: 50}}
                />}

                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgb(0,184,249)',
                      fontWeight: '500',
                      paddingLeft: 6,
                      // paddingTop: 6,
                    }}>
                    Ricordo di Davide
                  </Text>

                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '600',
                      color: 'silver',
                      paddingLeft: 6,
                    }}>
                    Pubblicato {published}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  style={{paddingTop: 5}}
                  onPress={() => {
                    this.modalToggle()
                  }}>
                  <SpecialIcon
                    name="report"
                    color="hotpink"
                    style={{fontSize: 20}}
                  />
                </TouchableHighlight>
              </View>

              <Modal
                isVisible={this.state.isOpen1}
                onBackdropPress={this.modalToggle}
                // deviceHeight={screenHeight * 0.5}
                // deviceWidth={screenWidth * 0.98}
                backdropOpacity={0.3}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }}>
                  <View>
                    <Text>Segnala il post</Text>
                    <Text>Motiva la tua segnalazione</Text>
                    <TextInput
                      placeholder={
                        'scrivi qui le motivazioni della segnalazione di questo post'
                      }
                      placeholderTextColor="gray"
                      returnKeyType="go"
                      style={styles.textInputTT}
                      onSubmitEditing={() => {}}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <Button title="Annulla" onPress={this.modalToggle} />
                      <Button
                        title="Invia la segnalazione"
                        onPress={this.modalToggle}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 7}}>
              <Icon
                name="map-pin"
                color="rgb(0,184,249)"
                style={{fontSize: 15}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'silver',
                  marginLeft: 5,
                }}>
                {name}
              </Text>
            </View>

            {soundIsExist.length > 0 && (
              <View style={{paddingTop: 6, paddingBottom: 6}}>
                <SoundPlayer soundInfo={soundInfo} />
              </View>
            )}
            {/* <SinglePlayer track={track}/> */}
            <View style={{paddingLeft: 2, paddingTop: 3, flex: 1}}>
              <Text style={{fontSize: 14, fontWeight: '600', color: 'silver'}}>
                {description}
              </Text>
            </View>

            <View style={{paddingTop: 6}}>
              {this.renderPictures(images)}
              {/* <Image
                style={{
                  width: screenWidth * 0.96,
                  height: screenHeight * 0.3,
                  borderRadius: 10,
                }}
                source={require('../../../assets/images/cat4.jpg')}
                resizeMode="cover"
              /> */}
            </View>

            {/* <View style={[styles.cardTwo, {marginTop: 10, marginLeft: 2}]}>
              <Text style={{fontSize: 14, fontWeight: '500', color: 'cyan'}}>
                Privacy Del Post
              </Text>
  
              <View style={{flex: 1, flexDirection: 'row', paddingTop: 3}}>
                <Text style={{fontSize: 13, flex: 6}}>
                  Abilita questa opzione per rendere il post visible solo a te
                </Text>
                <View style={{flex: 1, paddingTop: 5, paddingRight: 5}}>
                  <Switch
                    trackColor={{false: '#000000', true: '#fff'}}
                    // thumbColor={isEnable ? 'rgb(0,184,249)' : '#f4f3f3'}
                    // onValueChange={switchHandler}
                    // value={isEnable}
                    ios_backgroundColor="#000000"
                  />
                </View>
              </View>
            </View> */}

            <View style={{paddingTop: 5}} />
            {/* {this.renderComment(
              'Davide Cavallari',
              'Registro audio pubblico foto indico il luogo dove ho scattato foto Posso rendere il post visibile solo a me',
            )} */}

            <View
              style={{
                marginTop: 6,
                marginLeft: 2,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#323232',
                borderRadius: 8,
              }}>
              <TextInput
                placeholder={'Lascia un commento'}
                placeholderTextColor="gray"
                returnKeyType="go"
                style={styles.textInputW}
                onSubmitEditing={() => {}}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    Alert.alert('Comment', 'Can upload comment in beckend :)', [
                      {text: 'Okay'},
                    ])
                  }}>
                  <Icon
                    name="send"
                    style={{fontSize: 20, fontWeight: '500', color: 'silver'}}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 5,
                    paddingLeft: 5,
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    Alert.alert('Audio', 'Can upload audio in beckend :)', [
                      {text: 'Okay'},
                    ])
                  }}>
                  <Icon
                    name="mic"
                    style={{fontSize: 20, fontWeight: '500', color: 'silver'}}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const OtherEachPost = (props) => {
  return <OtherEachPostClass {...props} />
}

export default connect(null, {showLoading, hideLoading})(OtherEachPost)
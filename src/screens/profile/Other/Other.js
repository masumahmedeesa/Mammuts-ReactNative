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
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import Axios from 'axios'
// import {Tabs, Tab} from 'native-base'
// import Modal from 'react-native-modal'
// import Icon from 'react-native-vector-icons/Feather'
// import SpecialIcon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'
import {URLS} from '../../../config/urls'
import styles from '../styles'
// import EachPost from '../EachPost'
// import Pictures from '../../../model/pictures'
import Connect from './ConnectOther'
import Post from './OtherPost'

class OtherClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: 'post',
      stories: [],
      legamies: [],
    }
  }

  componentDidMount() {
    this.props.showLoading()
    this.fetchStories()
    this.fetchLegami()
    this.props.hideLoading()
  }

  // componentWillUnmount() {
  //   console.log('Iddddd')
  //   this.setState({tabView: 'post', stories: [], legamies: []})
  // }

  fetchLegami = () => {
    const {info} = this.props.route.params
    if (info) {
      Axios.get(URLS.LEGAMI_PERSONAL + info.cf_key)
        .then((response) => {
          this.setState({legamies: response.data})
        })
        .catch((error) => {
          console.log(error, 'error in ricordiActions')
        })
    }
  }

  fetchStories = () => {
    const {info} = this.props.route.params
    // console.log(info)
    if (info) {
      const {id} = info
      // console.log(id)
      Axios.get(URLS.FIRST_PICTURES + id)
        .then((response) => {
          // console.log(response.data.length)
          this.setState({stories: response.data.data})
        })
        .catch((error) => {
          console.log(error, 'error in Individual')
        })
    }
  }
  pressPostTab = () => {
    this.setState({tabView: 'post'})
  }
  pressConnectTab = () => {
    this.setState({tabView: 'connect'})
  }
  renderRicordo = (posts, navigation) => {
    // console.log(posts,'renderRicordo')
    if (posts.length > 0) {
      let lenPosts = posts.length
      // if (lenPosts > 8) {
      //   lenPosts = 8
      // }
      var stories = []
      for (let j = 0; j < lenPosts; j++) {
        let Pictures = posts[j].immagine
        if (Pictures.length > 0) {
          let realPicture =
            'https://mammuts.it' + Pictures[0].substring(2, Pictures[0].length)
          stories.push(
            <View
              key={realPicture}
              style={{
                flex: 1,
                paddingBottom: 2,
                paddingRight: 2,
              }}>
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate('Story', {
                    realPicture: realPicture,
                    postInfo: posts[j],
                    navigation: navigation,
                  })
                }>
                <Image
                  style={{width: '100%', height: 130}}
                  source={{uri: realPicture}}
                  resizeMode="cover"
                  onLoadStart={()=>this.props.showLoading()}
                  onLoadEnd={()=>this.props.hideLoading()}
                />
              </TouchableHighlight>
            </View>,
          )
        }
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
      return <View>{firstTwo}</View>
    } else {
      return (
        <View>
          <Text>No images found :(</Text>
        </View>
      )
    }
  }

  render() {
    // if (this.state.stories) console.log(this.state.stories.length)
    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    const {navigation} = this.props
    const {tabView, stories, legamies} = this.state
    // console.log(stories.length, legamies.length)
    const {info} = this.props.route.params
    const {nome, cognome, email, image_profile} = info

    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <StatusBar barStyle="light-content" />

        <ScrollView style={styles.container}>
          <Animatable.View animation="bounceIn" style={{alignItems: 'center'}}>
            {image_profile ? (
              <Image
                source={{uri: 'https://mammuts.it/' + image_profile}}
                style={{
                  width: screenWidth * 0.94,
                  height: screenHeight * 0.3,
                  borderRadius: 10,
                }}
              />
            ) : (
              <Image
                source={require('../../../../assets/images/logo2.jpg')}
                style={{
                  width: screenWidth * 0.94,
                  height: screenHeight * 0.3,
                  borderRadius: 10,
                }}
              />
            )}
          </Animatable.View>
          <View style={{padding: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 19, fontWeight: '600', color: 'hotpink'}}>
                {nome + ' ' + cognome}
              </Text>
            </View>

            <Text style={{fontSize: 16, fontWeight: '600', color: 'silver'}}>
              {email}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 8,
              padding: 6,
              backgroundColor: 'red',
            }}
            onPress={() => {}}>
            <Text style={{textAlign: 'center', fontSize: 16}}>
              Rimuovi dai legami
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 14}}>
            <View style={styles.newTabView}>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
                Ricordi
              </Text>
            </View>
            <View style={{backgroundColor: '#000000', flex: 1}}>
              <View style={{marginTop: 15, flex: 1}}>
                {stories.length > 0 && this.renderRicordo(stories, navigation)}
              </View>
            </View>
          </View>

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
              <Post
                navigation={navigation}
                name={nome + ' ' + cognome}
                info={info}
              />
            ) : tabView === 'connect' ? (
              <Connect navigation={navigation} legamies={legamies} />
            ) : null}
          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

const OtherScreen = (props) => {
  const navigation = useNavigation()
  return <OtherClass {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {showLoading, hideLoading})(
  OtherScreen,
)

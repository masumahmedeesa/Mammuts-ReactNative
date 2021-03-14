import React from 'react'
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import ImageGod from '../../../components/ImageGod'
import * as Animatable from 'react-native-animatable'
import {
  ricodioActionsIndividual,
  refreshIndividual,
  legamiCollectionIndividual,
} from '../../../store/actions/individualActions'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'
import {refreshComment} from '../../../store/actions/commentActions'
import styles from '../styles'
import Connect from './ConnectIndividual'
import Post from './IndividualPost'

class IndividualClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: 'post',
    }
  }

  componentDidMount() {
    const {user} = this.props.route.params
    this.props.showLoading()
    this.props.refreshComment()
    if (user) {
      this.props.ricodioActionsIndividual(user.id, 1, user)
      this.props.legamiCollectionIndividual(user.id)
    }
    this.props.hideLoading()
  }

  componentWillUnmount() {
    this.props.refreshIndividual()
  }

  renderProfileImage = () => {
    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    const {user} = this.props.route.params

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
                : "https://mammuts.it/upload/profile/logo2.jpg"
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

  render() {
    const {navigation, posts} = this.props
    const {user} = this.props.route.params

    const {tabView} = this.state

    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.container}>
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
                posts={posts.structuredData}
                user={user}
              />
            ) : tabView === 'connect' ? (
              <Connect navigation={navigation} user={user}/>
            ) : null}
          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    // auth: state.auth,
    posts: state.individual,
  }
}

const IndividualScreen = (props) => {
  const navigation = useNavigation()
  return <IndividualClass {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  ricodioActionsIndividual,
  refreshIndividual,
  refreshComment,
  legamiCollectionIndividual,
})(IndividualScreen)

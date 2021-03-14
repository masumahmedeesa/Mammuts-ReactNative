import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import ImageGod from '../../components/ImageGod'
import {getAllUsers, refreshUsers} from '../../store/actions/searchActions'
import {legamiAddorRemove} from '../../store/actions/postActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
import styles from './styles'

class SearchScreenClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
      refreshing: false,
    }
  }

  componentDidMount() {
    this.props.showLoading()
    this.props.getAllUsers()
    // const user = JSON.parse(this.props.auth.user)
    // if (user) {
    //   this.props.legamiCollection(user.id)
    // }
    this.props.hideLoading()
  }

  handleRefresh = () => {
    // this.setState({refreshing: true})
    this.props.showLoading()
    this.props.refreshUsers()
    this.props.getAllUsers()
    this.props.hideLoading()
    // this.setState({refreshing: false})
  }
  SearchAl = (value) => (
    <View
      style={{
        backgroundColor: 'lightslategrey',
        borderRadius: 5,
        marginLeft: 4,
      }}>
      <Text style={{color: '#fff', fontSize: 17, padding: 4}}>{value}</Text>
    </View>
  )

  inputTextChange = (value) => {
    this.setState({
      item: value,
    })
  }

  renderFilteredusers = () => {
    const {legamies, navigation} = this.props
    const {item} = this.state
    const filteredUsers = this.findUser(item)
    if (filteredUsers.length > 0) {
      return (
        <View style={{paddingBottom: 30}}>
          {filteredUsers.map((single) => {
            const {nome, cognome, email, image_profile} = single
            const dd = Date.now() + single.nome + single.cognome + single.id
            let flag = false
            const legamiView = legamies.map((l) => {
              if (l.id == single.id) {
                flag = true
                return (
                  <TouchableOpacity
                    key={dd}
                    onPress={() => this.removeLegami(single.cf_key)}
                    style={styles.addBoxRed}>
                    <Text style={styles.addTextRed}>Rimuovere</Text>
                  </TouchableOpacity>
                )
              }
            })
            return (
              <View key={dd} style={styles.listView}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Individual', {info: item})}
                  style={{flex: 8}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, paddingRight: 5}}>
                      <ImageGod
                        propWidth={45}
                        propHeight={45}
                        imageUrl={
                          image_profile
                            ? 'https://mammuts.it/' + image_profile
                            : 'https://mammuts.it/upload/profile/logo_mammuts.png'
                        }
                        borderRadius={50}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Individual', {user: single})
                      }
                      style={{flex: 6, paddingTop: 3, paddingLeft: 4}}>
                      <Text style={styles.normalText}>
                        {nome + ' ' + cognome}
                      </Text>
                      <Text style={styles.normalText}>{email}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>

                {flag ? (
                  legamiView
                ) : (
                  <TouchableOpacity
                    onPress={() => this.addLegami(single.cf_key)}
                    style={styles.addBox}>
                    <Text style={styles.addText}>Aggiungi</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          })}
        </View>
      )
    } else {
      return <View>{this.renderUsers()}</View>
    }
  }

  addLegami = (cfKey) => {
    Alert.alert(
      'INSERISCI!',
      'Sei sicuro di aggiungerlo come amico?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.props.showLoading()
            this.props.legamiAddorRemove({cfKey: cfKey, bb: 'add'})
            this.props.hideLoading()
          },
        },
      ],
      {cancelable: false},
    )
  }

  removeLegami = (cfKey) => {
    Alert.alert(
      'AVVERTIMENTO!',
      'Sei sicuro di eliminare questa cravatta?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.props.showLoading()
            this.props.legamiAddorRemove({cfKey: cfKey, bb: 'remove'})
            this.props.hideLoading()
          },
        },
      ],
      {cancelable: false},
    )
  }

  renderUsers = () => {
    const {allusers, legamies, navigation} = this.props
    // console.log(legamies)
    if (allusers.length > 0) {
      return (
        <View style={{paddingBottom: 78}}>
          {allusers.map((single) => {
            const {nome, cognome, email, image_profile} = single
            const dd = Date.now() + single.email + single.id
            let flag = false
            const legamiView = legamies.map((l) => {
              if (l.id == single.id) {
                flag = true
                return (
                  <TouchableOpacity
                    key={dd}
                    onPress={() => this.removeLegami(single.cf_key)}
                    style={styles.addBoxRed}>
                    <Text style={styles.addTextRed}>Rimuovere</Text>
                  </TouchableOpacity>
                )
              }
            })
            return (
              <View key={dd} style={styles.listView}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Individual', {info: item})}
                  style={{flex: 8}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, paddingRight: 5}}>
                      <ImageGod
                        propWidth={45}
                        propHeight={45}
                        imageUrl={
                          image_profile
                            ? 'https://mammuts.it/' + image_profile
                            : 'https://mammuts.it/upload/profile/logo_mammuts.png'
                        }
                        borderRadius={50}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Individual', {user: single})
                      }
                      style={{flex: 6, paddingTop: 2, paddingLeft: 4}}>
                      <Text style={styles.normalText}>
                        {nome + ' ' + cognome}
                      </Text>
                      <Text style={styles.normalText}>{email}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>

                {flag ? (
                  legamiView
                ) : (
                  <TouchableOpacity
                    onPress={() => this.addLegami(single.cf_key)}
                    style={styles.addBox}>
                    <Text style={styles.addText}>Aggiungi</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          })}
        </View>
      )
    } else {
      return <View />
    }
  }

  findUser = (query) => {
    if (query === '') {
      return []
    }
    const {allusers} = this.props
    const data = allusers
    // console.log(data)
    const regex = new RegExp(`${query.trim()}`, 'i')
    return data.filter((single) => {
      return single.nome.search(regex) >= 0 || single.cognome.search(regex) >= 0
    })
  }

  render() {
    const {item} = this.state
    // console.log(this.state.refreshing)
    // const filteredUsers = this.findUser(item)

    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <View>
          <View style={styles.search}>
            <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
              <Icon
                name="search"
                type="FontAwesome"
                style={styles.searchBtnIcon}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={'Cerca un legame'}
              placeholderTextColor="grey"
              returnKeyType="go"
              style={styles.textInput}
              onChangeText={(val) => this.inputTextChange(val)}
              value={item}
              // onEndEditing={(e) => SearchHandler(e.nativeEvent.text)}
              // value={this.state.query}
              // onSubmitEditing={() => {}}
            />
          </View>

          <View style={{marginTop: 13}} />

          <View style={{marginLeft: 8, flexDirection: 'row'}}>
            <Text style={{color: 'rgb(0,184,249)', fontSize: 17, marginTop: 3}}>
              You are searching for
            </Text>
            {item ? this.SearchAl(item) : null}
          </View>

          <View style={{marginTop: 5}} />
          <ScrollView
            style={{padding: 8}}
            refreshControl={
              <RefreshControl
                progressBackgroundColor="cyan"
                // colors="rgb(0,184,249)"
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }>
            {this.renderFilteredusers()}
            <View style={{paddingBottom: 20}} />
          </ScrollView>
        </View>

        <View style={{marginTop: 10}} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    allusers: state.search.allusers,
    legamies: state.posts.legami,
  }
}
const SearchScreen = (props) => {
  const navigation = useNavigation()
  return <SearchScreenClass {...props} navigation={navigation} />
}

export default connect(mapStateToProps, {
  getAllUsers,
  showLoading,
  hideLoading,
  refreshUsers,
  legamiAddorRemove,
})(SearchScreen)

// renderRicordo = (posts, navigation) => {
//   // console.log(posts,'renderRicordo')
//   if (posts.length > 0) {
//     let lenPosts = posts.length
//     if (lenPosts > 8) {
//       lenPosts = 8
//     }
//     var stories = []
//     for (let j = 0; j < lenPosts; j++) {
//       let Pictures = posts[j].immagine
//       if (Pictures.length > 0) {
//         let realPicture =
//           'https://mammuts.it' + Pictures[0].substring(2, Pictures[0].length)
//         stories.push(
//           <View
//             key={realPicture}
//             style={{
//               flex: 1,
//               paddingBottom: 2,
//               paddingRight: 2,
//             }}>
//             <TouchableHighlight
//               onPress={() =>
//                 navigation.navigate('Story', {
//                   realPicture: realPicture,
//                   postInfo: posts[j],
//                   navigation: navigation,
//                 })
//               }>
//               <Image
//                 style={{width: '100%', height: 130}}
//                 source={{uri: realPicture}}
//                 resizeMode="cover"
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

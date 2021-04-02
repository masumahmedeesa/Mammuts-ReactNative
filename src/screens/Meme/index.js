import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  FlatList,
  SafeAreaView,
  LogBox,
  Platform,
} from 'react-native'
import Axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import Autocomplete from 'react-native-autocomplete-input'
// import Autocomplete from 'native-base-autocomplete'
import Toast from 'react-native-simple-toast'
import ImageGod from '../../components/ImageGod'
import styles from './styles'
import {URLS} from '../../config/urls'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
// import {getAllUsers} from '../../store/actions/searchActions'
import {postCreate, legamiCollection} from '../../store/actions/postActions'
import {removeAudio} from '../../store/actions/audioActions'
// import Record from './Record/record'
// import DumyPlayer from './Record/DumyPlayer'
// import RecorPlayer from './Record/RecordPlayer'
// import { Constants } from 'react-native-unimodules';
// console.log(Constants.systemFonts);
// import ExpoPlayer from '../expo/ExpoPlayer'
// import ExpoRecorder from '../expo/ExpoRecorder'
import RecordPlayer from '../expo/RecordPlayer'

class MemeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnable: false,
      imageList: [],
      uploadedImageList: [],
      disabled: false,
      dove: '',
      racconta: '',

      filteredUsers: [],
      selectedUser: [],
      query: '',
    }
    this.selectImage = this.selectImage.bind(this)
    this.renderGalleryItem = this.renderGalleryItem.bind(this)
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    const {audio} = this.props
    this.props.showLoading()
    if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
      this.props.removeAudio()
    }
    this.props.hideLoading()
  }

  switchHandler = () => {
    this.setState({isEnable: !this.state.isEnable})
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
      method: 'POST',
      url: url,
      data: data,
    })
    return response.data
  }

  removeData = async (imageName) => {
    const response = await Axios.get(URLS.REMOVE_FILE + imageName)
    return response.data
  }

  selectImage(method) {
    ImagePicker[method]({
      width: 550,
      height: 500,
      cropping: true,
      multiple: false,
      includeBase64: true,
      mediaType: 'photo',
    }).then(async (image) => {
      try {
        this.props.showLoading()
        const fileName = image.path.split('/')
        // console.log(image.path)
        const data = new FormData()
        data.append('file', {
          uri: image.path,
          name: fileName[fileName.length - 1],
          type: image.mime,
          // type: 'multipart/form-data',
        })
        // console.log(image.path,fileName[fileName.length - 1],image.mime)
        let cc = ''
        try {
          cc = (await this.uploadData(data, URLS.UPLOAD_FILE)).immagine
          // console.log(cc, 'uploaded')
        } catch (e) {
          this.props.hideLoading()
          console.log(e)
        }
        const result = data
        if (result) {
          this.setState({
            imageList: [...this.state.imageList, result],
            uploadedImageList: [...this.state.uploadedImageList, cc],
          })
        }
        this.props.hideLoading()
      } catch (e) {
        this.props.hideLoading()
        console.log(e)
      }
    })
  }

  onRemoveGalleryImage = (_index) => {
    const deleteIt = async () => {
      this.props.showLoading()

      let imageName = ''
      if (this.state.uploadedImageList.length > 0)
        imageName = this.state.uploadedImageList[_index].split('/')[3]
      try {
        const rmf = await this.removeData(imageName)
      } catch (e) {
        this.props.hideLoading()
        console.log(e, 'rGallery')
      }
      const imageList = this.state.imageList.filter((item, index) => {
        return _index !== index
      })
      const uploadedImageList = this.state.uploadedImageList.filter(
        (item, index) => {
          return _index !== index
        },
      )
      this.setState({
        imageList,
        uploadedImageList,
      })
      this.props.hideLoading()
    }
    Alert.alert(
      'Delete Gallery Image',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: deleteIt,
        },
      ],
      {cancelable: false},
    )
  }

  renderGalleryItem({item, index}) {
    // console.log(('renderGalleryItemSecond', JSON.stringify(item._parts[0][1].uri)))
    return (
      <View key={item.file} style={{width: '33%', margin: 2}}>
        <ImageGod
          propWidth={'100%'}
          propHeight={100}
          imageUrl={item._parts[0][1].uri}
          borderRadius={10}
        />
        {/* <Image
          source={{uri: item._parts[0][1].uri}}
          style={styles.photoThumb}
        /> */}
        <TouchableOpacity
          style={styles.photo}
          onPress={() => this.onRemoveGalleryImage(index)}>
          <Icon name="trash" style={styles.photoTrash} />
        </TouchableOpacity>
      </View>
    )
  }

  renderGallery = () => {
    if (this.state.imageList.length === 0) {
      return null
    }
    return (
      <View style={styles.photos}>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            numColumns={3}
            data={this.state.imageList}
            keyExtractor={(item) => item.file}
            renderItem={this.renderGalleryItem}
          />
        </SafeAreaView>
      </View>
    )
  }

  // taggaChangeHandler = (value) => {
  //   this.setState({tagga: value})
  // }

  doveChangeHandler = (value) => {
    this.setState({dove: value})
  }

  raccontaChangeHandler = (value) => {
    this.setState({racconta: value})
  }

  // uploadData = async (data, url) => {
  //   // console.log(data,'upload')
  //   const response = await Axios({
  //     method: 'post',
  //     url: url,
  //     data: data,
  //   })
  //   return response.data
  // }

  findUser = (query) => {
    if (query === '') {
      return []
    }
    const {search} = this.props
    const data = search
    const regex = new RegExp(`${query.trim()}`, 'i')
    return data.filter((single) => {
      return single.nome.search(regex) >= 0 || single.cognome.search(regex) >= 0
    })
  }

  autoCompleteTextController = (text) => {
    this.setState({query: text})
  }

  onPressedAuto = (item) => {
    // console.log('clicked')
    this.setState({query: item.nome + ' ' + item.cognome})
  }

  selectedUserPress = (item) => {
    let finalData = [...this.state.selectedUser, item]
    let lastData = []
    let arr = []
    for (let i = 0; i < finalData.length; i++) {
      if (!arr.includes(finalData[i].id)) {
        arr.push(finalData[i].id)
        lastData.push(finalData[i])
      }
    }
    this.setState({selectedUser: lastData, query: ''})
  }

  renderUsers = () => {
    const {selectedUser} = this.state
    // console.log(selectedUser)
    return (
      <View>
        {selectedUser.map((single) => {
          const {image_profile, nome, cognome, email} = single
          return (
            <View key={single.id}>
              <View style={{paddingLeft: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, paddingRight: 5}}>
                    <ImageGod
                      propWidth={45}
                      propHeight={45}
                      imageUrl={
                        image_profile
                          ? 'https://mammuts.it/' + image_profile
                          : 'https://mammuts.it/upload/profile/logo2.jpg'
                      }
                      borderRadius={50}
                    />
                  </View>
                  <View style={{flex: 6, paddingTop: 2}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'rgb(0,184,249)',
                        fontWeight: '500',
                      }}>
                      {nome + ' ' + cognome}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'rgb(0,184,249)',
                        fontWeight: '500',
                      }}>
                      {email}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 10}} />
            </View>
          )
        })}
      </View>
    )
  }

  renderSearchedItem = ({item}) => {
    // console.log(item.nome)
    if (item) {
      const dd = Date.now() + item.cf_key
      return (
        <View key={dd} style={styles.renderSearch}>
          <TouchableOpacity
            onPress={() => {
              this.onPressedAuto(item)
              this.selectedUserPress(item)
            }}>
            <Text>{item.nome + ' ' + item.cognome}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return <View />
    }
  }

  uploadAllKindsOfData = async (data) => {
    const response = await Axios({
      method: 'POST',
      url: URLS.RICORDI,
      data: data,
    })
    return response.data
  }

  submitHandler = async () => {
    const {audio, navigation} = this.props
    const {
      dove,
      racconta,
      isEnable,
      uploadedImageList,
      selectedUser,
    } = this.state

    this.props.showLoading()
    let cc
    let audioFileName = ''
    if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
      // console.log(audio.formdata._parts, 'ashse')
      try {
        cc = await this.uploadData(audio.formdata, URLS.UPLOAD_AUDIO)
        audioFileName = cc.audio.substring(6, cc.audio.length)
      } catch (e) {
        this.props.hideLoading()
        console.log(e, 'submitHandler uploading audio')
      }
    }

    // console.log(audioFileName ? audioFileName: 'audifileNAI')

    const tags = selectedUser.map((single) => single.id)

    let res
    try {
      res = await this.uploadAllKindsOfData({
        bondnames: selectedUser ? selectedUser : [],
        tags: tags ? tags : [],
        privato: isEnable ? 1 : 0,
        place: dove,
        description: racconta,
        file: uploadedImageList ? uploadedImageList : [],
        // empty array na pathaiye hoito empty string pathaile valo
        audio: audioFileName ? audioFileName : [],
      })
    } catch (e) {
      this.props.hideLoading()
      console.warn(e, 'main uploading')
    }
    this.props.hideLoading()

    const user = JSON.parse(this.props.auth.user)
    this.props.postCreate(res, user)

    if (res) {
      this.setState({
        isEnable: false,
        imageList: [],
        uploadedImageList: [],
        disabled: false,
        dove: '',
        racconta: '',
        filteredUsers: [],
        selectedUser: [],
        query: '',
      })
      if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
        this.props.removeAudio()
      }
      Toast.show('La tua memoria è stata caricata con successo!', Toast.LONG)
      navigation.navigate('Profile')
    } else {
      Toast.show('Errore di connessione a Internet :(', Toast.LONG)
    }
  }

  render() {
    const {isEnable, query, selectedUser, dove, racconta} = this.state
    // console.log(uploadedImageList, 'uploadedImageList')
    // console.log(this.props.search)

    const filteredUsers = this.findUser(query)
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()

    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          {Platform.OS === 'android' && (
            <View style={{marginTop: 10}}>
              <View style={styles.newStyle}>
                <Text style={styles.textNew}>Tagga un tuo legame</Text>
              </View>
            </View>
          )}
          <View style={{marginTop: Platform.OS === 'ios' ? 47 : 25}} />
          <View style={styles.containerAuto}>
            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              data={
                filteredUsers.length === 1 && comp(query, filteredUsers[0].nome)
                  ? []
                  : filteredUsers
              }
              defaultValue={query}
              onChangeText={this.autoCompleteTextController}
              placeholder="Tagga un tuo legame"
              // renderItem={({item}) => this.renderSearchedItem({item})}
              // renderItem={single => <ListItem>
              //   <Text>{single.nome}</Text>
              // </ListItem>}
              renderItem={this.renderSearchedItem}
              // renderItem={(single) => this.renderSearchedItem(single)}
            />
          </View>

          {selectedUser.length > 0 ? this.renderUsers() : <View />}

          <View style={{marginTop: 0}}>
            <View style={styles.newStyle}>
              <Text style={styles.textNew}>
                Dove hai vissuto questo ricordo?
              </Text>
            </View>
            <View style={styles.searchSS}>
              <TextInput
                name="dove"
                placeholder={'Dove hai vissuto questo ricordo?'}
                placeholderTextColor="grey"
                value={dove}
                returnKeyType="next"
                autoCapitalize="none"
                style={styles.textInput}
                multiline
                onChangeText={this.doveChangeHandler}
                // onEndEditing={(e) => SearchHandler(e.nativeEvent.text)}
                // value={this.state.query}
                // onSubmitEditing={() => {}}
              />
            </View>
          </View>

          <View style={{marginTop: 15}}>
            <View style={styles.newStyle}>
              <Text style={styles.textNew}>
                Racconta il bello di un momento
              </Text>
            </View>
            <View style={styles.searchSS}>
              <TextInput
                name="racconta"
                placeholder={'Racconta il bello di un momento'}
                value={racconta}
                placeholderTextColor="grey"
                returnKeyType="next"
                autoCapitalize="none"
                style={styles.textInputMulti}
                multiline
                onChangeText={this.raccontaChangeHandler}
                // onEndEditing={(e) => SearchHandler(e.nativeEvent.text)}
                // value={this.state.query}
                // onSubmitEditing={() => {}}
              />
            </View>
          </View>

          <View style={styles.foto}>
            <TouchableOpacity
              style={styles.gallery}
              onPress={this.selectImageOption}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Icon name="aperture" color="white" style={{fontSize: 50}} />
                <Text
                  style={{
                    fontSize: 19,
                    color: 'white',
                    padding: 3,
                    fontWeight: '700',
                  }}>
                  Carica una foto
                </Text>
              </View>
            </TouchableOpacity>
            {this.renderGallery()}
          </View>

          <View style={styles.foto}>
            <View>
              <RecordPlayer />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View style={[styles.cardTwo, {marginLeft: 10, marginRight: 10}]}>
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
          </View>

          {dove.length > 0 && racconta.length > 0 ? (
            <TouchableOpacity onPress={this.submitHandler}>
              <View style={styles.publiccaView}>
                <Text style={styles.publiccaText}>Pubblica</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.publiccaView}>
              <Text style={styles.publiccaDisabled}>Pubblica</Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const MemeScreenFunction = (props) => {
  const navigation = useNavigation()

  return <MemeScreen {...props} navigation={navigation} />
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.posts.legami,
    audio: state.audio,
    isSuccessful: state.posts.isSuccessful,
  }
}
export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  legamiCollection,
  postCreate,
  removeAudio,
})(MemeScreenFunction)

/// ios AutoComplete
{
  /* <Autocomplete
autoCapitalize="none"
autoCorrect={false}
// inputContainerStyle={styles.autocompleteContainer}
// containerStyle={styles.autocompleteContainer}
data={
  filteredUsers.length === 1 && comp(query, filteredUsers[0].nome)
    ? []
    : filteredUsers
}
defaultValue={query}
onChangeText={this.autoCompleteTextController}
placeholder="Tagga un tuo legame"
// renderItem={({item}) => this.renderSearchedItem({item})}
// renderItem={single => <ListItem>
//   <Text>{single.nome}</Text>
// </ListItem>}
renderItem={(single) => this.renderSearchedItem(single)}
/> */
}
/* <TextInput
                name="tagga"
                placeholder={'Tagga un tuo legame'}
                placeholderTextColor="grey"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={this.taggaChangeHandler}
                // onEndEditing={(e) => SearchHandler(e.nativeEvent.text)}
                // onSubmitEditing={() => {}}
              /> */
/* <View style={styles.foto}>
            <TouchableOpacity
              style={styles.gallery}
              onPress={() => navigation.navigate('Playlist')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Icon name="mic" color="silver" style={{fontSize: 50}} />
                <Text
                  style={{
                    fontSize: 19,
                    color: 'gray',
                    padding: 3,
                    fontWeight: '700',
                  }}>
                  Record Audio
                </Text>
              </View>
            </TouchableOpacity>
          </View> */

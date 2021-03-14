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
  Image,
  SafeAreaView,
  LogBox,
} from 'react-native'
import Axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import Autocomplete from 'react-native-autocomplete-input'
import ImageGod from '../../../components/ImageGod'
import SoundPlayer from '../../profile/SoundPlayer'
import Toast from 'react-native-simple-toast'
import styles from '../styles'
import {URLS} from '../../../config/urls'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'
import {legamiCollection, postUpdate} from '../../../store/actions/postActions'
import {removeAudio} from '../../../store/actions/audioActions'
// import Record from '../Record/record'
import RecordPlayer from '../../expo/RecordPlayer'

class EditMemeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnable: this.props.route.params.data.privato == 0 ? false : true,
      imageList: [],
      audioInfo: this.props.route.params.data.soundInfo,
      uploadedImageList: [],
      disabled: false,
      dove: this.props.route.params.data.name,
      racconta: this.props.route.params.data.description,

      filteredUsers: [],
      selectedUser: this.props.route.params.data.bondnames,
      newSelectedUser: [], // for newly added
      query: '',
    }
    // console.log(this.props.route.params.data.soundInfo)
    this.selectImage = this.selectImage.bind(this)
    this.renderGalleryItem = this.renderGalleryItem.bind(this)
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    const user = JSON.parse(this.props.auth.user)
    const {audio} = this.props
    let nList = this.props.route.params.images
    this.props.showLoading()
    if (nList.length > 0) {
      let newList = nList.map((single) => {
        return (
          '../' +
          single.split('/')[3] +
          '/' +
          single.split('/')[4] +
          '/' +
          single.split('/')[5]
        )
      })
      this.setState({imageList: newList})
    }
    if (user) {
      // console.log(user.cf_key)
      this.props.legamiCollection(user.id)
    }
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
      method: 'post',
      url: url,
      data: data,
    })
    return response.data
  }

  removeData = async (url, fileName, id) => {
    const response = await Axios.get(url + fileName + '/' + id)
    return response.data
  }

  selectImage(method) {
    ImagePicker[method]({
      width: 500,
      height: 500,
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
          cc = (await this.uploadData(data, URLS.UPLOAD_FILE)).immagine
        } catch (e) {
          this.props.hideLoading()
          console.log(e)
        }
        if (cc) {
          this.setState({
            imageList: [...this.state.imageList, cc],
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

  onRemoveGalleryImage = (_index, igName) => {
    const {id} = this.props.route.params.data
    const deleteIt = async () => {
      this.props.showLoading()
      let imageName = ''
      if (this.state.imageList.length > 0)
        imageName = this.state.imageList[_index].split('/')[3]
      try {
        const rmf = await this.removeData(URLS.REMOVE_FILE_EDIT, imageName, id)
        this.props.hideLoading()
      } catch (e) {
        this.props.hideLoading()
        console.log(e, 'Gallery')
      }
      const imageList = this.state.imageList.filter((item, index) => {
        return _index !== index
      })
      const uploadedImageList = this.state.uploadedImageList.filter(
        (single) => {
          if (single !== igName) {
            return single
          }
        },
      )
      this.setState({
        imageList,
        // newImageList,
        uploadedImageList,
      })
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
    const suitableName =
      'https://mammuts.it/upload/ricordo/' + item.split('/')[3]
    return (
      <View key={item.file} style={{width: '33%', margin: 2}}>
        <ImageGod
          propWidth={'100%'}
          propHeight={100}
          imageUrl={suitableName}
          borderRadius={10}
        />
        <TouchableOpacity
          style={styles.photo}
          onPress={() => this.onRemoveGalleryImage(index, item)}>
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
            keyExtractor={(item) => item}
            renderItem={this.renderGalleryItem}
          />
        </SafeAreaView>
      </View>
    )
  }

  doveChangeHandler = (value) => {
    this.setState({dove: value})
  }

  raccontaChangeHandler = (value) => {
    this.setState({racconta: value})
  }

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
    // console.log(item)
    this.setState({query: item.nome + ' ' + item.cognome})
  }

  uniqueArrayList(finalData) {
    let lastData = []
    let arr = []
    for (let i = 0; i < finalData.length; i++) {
      if (!arr.includes(finalData[i].id)) {
        arr.push(finalData[i].id)
        lastData.push(finalData[i])
      }
    }
    return lastData
  }

  selectedUserPress = (item) => {
    let finalData = [...this.state.selectedUser, item]
    let lastData = this.uniqueArrayList(finalData)
    const bondnamesPrevious = this.props.route.params.data.bondnames
    let newTags = []
    if (lastData.length > 0) {
      for (let i = 0; i < lastData.length; i++) {
        let flag = 0
        for (let j = 0; j < bondnamesPrevious.length; j++) {
          if (lastData[i].id === bondnamesPrevious[j].id) {
            flag = 1
          }
        }
        if (flag === 0) {
          newTags.push(lastData[i].id)
        }
      }
    }
    this.setState({
      selectedUser: lastData,
      query: '',
      newSelectedUser: newTags,
    })
  }

  renderUsers = () => {
    const {selectedUser} = this.state
    return (
      <View>
        {selectedUser.map((single) => {
          const {image_profile, nome, cognome, email} = single
          const dd = Date.now() + nome + single.id
          return (
            <View key={dd}>
              <View style={{paddingLeft: 10}}>
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
    const {id} = this.props.route.params.data
    const response = await Axios({
      method: 'PUT',
      url: URLS.RICORDI + '/' + id,
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
      imageList,
      selectedUser,
      newSelectedUser,
      audioInfo,
    } = this.state

    const {commentLength, commentUsers, comments} = this.props.route.params.data
    const {sender} = this.props.route.params

    this.props.showLoading()
    let cc
    let audioFileName = ''
    if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
      try {
        cc = await this.uploadData(audio.formdata, URLS.UPLOAD_AUDIO)
        audioFileName = cc.audio.substring(6, cc.audio.length)
      } catch (e) {
        this.props.hideLoading()
        console.log(e, 'submitHandler uploading audio')
      }
    }
    if (audioInfo.url) {
      if (audioInfo.url.length > 33) {
        audioFileName =
          audioInfo.url.split('/')[4] + '/' + audioInfo.url.split('/')[5]
      }
    }

    let allTags = []
    if (selectedUser.length > 0) {
      allTags = selectedUser.map((single) => single.id)
    }

    let res
    try {
      // this.props.showLoading()
      res = await this.uploadAllKindsOfData({
        bondnames: selectedUser ? selectedUser : [],
        allTags: allTags ? allTags : [],
        tags: newSelectedUser ? newSelectedUser : [],
        privato: isEnable ? 1 : 0,
        place: dove,
        description: racconta,
        allImages: imageList ? imageList : [],
        file: uploadedImageList ? uploadedImageList : [],
        audio: audioFileName ? audioFileName : [],
      })
      // this.props.hideLoading()
    } catch (e) {
      this.props.hideLoading()
      console.warn(e, 'main uploading')
    }
    if (JSON.stringify(audio.formdata) !== JSON.stringify({})) {
      this.props.removeAudio()
    }
    this.props.hideLoading()

    if (res) {
      this.setState({
        isEnable: false,
        imageList: [],
        audioInfo: '',
        uploadedImageList: [],
        disabled: false,
        dove: '',
        racconta: '',
        filteredUsers: [],
        newSelectedUser: [],
        selectedUser: [],
        query: '',
      })
      const user = JSON.parse(this.props.auth.user)
      this.props.postUpdate(res, commentLength, commentUsers, comments, user)
      // setTimeout(() => {
      Toast.show('La memoria è stata aggiornata con successo!')
      // }, 800)
      navigation.navigate(sender ? sender : 'Profile')
    } else {
      Toast.show('Errore di connessione a Internet :(')
    }
  }

  removeAudioFromDb = (audioInfo, id) => {
    const fileName = audioInfo.url.split('/')[5]
    Alert.alert(
      'Warning!',
      'Sei sicuro di eliminare questo audio?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: async () => {
            this.props.showLoading()
            let rma
            try {
              rma = await this.removeData(URLS.REMOVE_AUDIO, fileName, id)
              this.props.hideLoading()
              this.setState({audioInfo: ''})
            } catch (e) {
              this.props.hideLoading()
              console.log(e, 'Removing audio')
            }
          },
        },
      ],
      {cancelable: false},
    )
  }

  renderAudioPlayer = () => {
    const {audioInfo} = this.state
    const {id} = this.props.route.params.data
    if (audioInfo.url) {
      if (audioInfo.url.length > 35) {
        return (
          <View style={styles.foto}>
            <View style={{paddingBottom: 5}}>
              <SoundPlayer soundInfo={audioInfo} />
            </View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  this.removeAudioFromDb(audioInfo, id)
                }}
                style={{
                  backgroundColor: 'red',
                  padding: 1,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
                  Elimina
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.foto}>
            <View style={{paddingBottom: 5}}>
              <RecordPlayer/>
            </View>
          </View>
        )
      }
    } else {
      return (
        <View style={styles.foto}>
          <View style={{paddingBottom: 5}}>
            <RecordPlayer/>
          </View>
        </View>
      )
    }
  }

  render() {
    const {isEnable, query, selectedUser, dove, racconta} = this.state
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
              renderItem={this.renderSearchedItem}
              // renderItem={(single) => this.renderSearchedItem(single)}
            />
          </View>

          {selectedUser.length > 0 ? this.renderUsers() : <View />}

          <View style={{marginTop: 15}}>
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

          {this.renderAudioPlayer()}

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

const EditMemeScreenFunction = (props) => {
  const navigation = useNavigation()

  return <EditMemeScreen {...props} navigation={navigation} />
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
  postUpdate,
  removeAudio,
})(EditMemeScreenFunction)

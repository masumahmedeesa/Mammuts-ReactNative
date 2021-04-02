import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
// import Axios from 'axios'
// import {Content} from 'native-base'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import EachPost from './EachPost'
// import {URLS} from '../../config/urls'
import {ricodioActions, sortByMonthPaging} from '../../store/actions/postActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
// import {TouchableOpacity} from 'react-native-gesture-handler'
// import localTrack from '../../data/pure.m4a'
// import localTrack2 from '../../data/test.mp3'

// var mediaInfo1 = {
//   id: '1',
//   url:
//     'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj',
//   title: 'Pure',
//   artist: 'David Chavez',
//   // artwork: 'https://i.picsum.photos/id/500/200/200.jpg',
//   duration: 28,
// }

// var mediaInfo2 = {
//   id: '2',
//   url: localTrack,
//   title: 'kure',
//   artist: 'David Chavez',
//   // artwork: 'https://i.picsum.photos/id/500/200/200.jpg',
//   duration: 28,
// }

// const audioTests = [
//   {
//     title: 'mp3 via require()',
//     isRequire: true,
//     url: require('./test1.mp3'),
//   },
//   {
//     title: 'wav remote download',
//     url:
//       'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj',
//   },
//   {
//     title: 'aac via require()',
//     isRequire: true,
//     url: require('./test2.wav'),
//   },
// ]

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {page} = this.state
    if (prevState.page !== page) {
      const user = JSON.parse(this.props.user)
      const {onno} = this.props
      this.props.showLoading()
      if (user) {
        if (onno.singleMonth) {
          // console.log(this.state.page, onno.singleMonth)
          this.props.sortByMonthPaging(user.id, onno.singleMonth, page, user)
        } else {
          this.props.ricodioActions(user.id, page, user)
        }
      }
      this.props.hideLoading()
    }
  }

  ggTT = () => {
    this.setState({page: this.state.page + 1})
    const {setPageOk} = this.props
    setPageOk()
  }

  render() {
    const {navigation, posts, user, onno} = this.props
    // console.log(this.state.page, onno.singleMonth)
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
}

function mapStateToProps(state) {
  return {
    onno: state.posts,
    user: state.auth.user,
  }
}

// export default Post
export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  ricodioActions,
  sortByMonthPaging
})(Post)

/* <EachPost
              images=""
              soundIsExist="okay"
              soundInfo={audioTests[1]}
              name="Casarile (mi)"
              description="Registro audio pubblico foto indico il luogo dove ho scattato foto Posso rendere il post visibile solo a me"
              published="26/12/2020 17:48"
              navigation={navigation}
            /> */
// dataClassifier(single) {
//   // console.log(single,'dataclassifier')
//   const {user} = this.props
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
//   finalData['commentLength'] = single.commentLength
//   finalData['commentUsers'] = single.commentUsers
//   finalData['comments'] = single.comments

//   return finalData
// }

// fetchData = () => {
//   const {page, data} = this.state
//   Axios.get(URLS.RICORDI + `?page=${page}`)
//     .then((response) => {
//       // console.log(response.data.data.length,'actions')
//       // this.setState({data: data.concat(response.data.data), isLoading: false})
//       this.setState({
//         data: [...data, ...response.data.data],
//         isLoading: false,
//       })
//     })
//     .catch((error) => {
//       console.log(error, 'fetchData')
//     })
// }

// renderPaginate = () => {
//   console.warn('END')
//   // this.setState({page: this.state.page + 1, isLoading: true}, () => {
//   //   this.fetchData()
//   // })
//   this.setState({page: this.state.page + 1, isLoading: true})
//   console.log('BITCH')
// }

// renderFooter = () => {
//   return (
//     <View>
//       {this.state.isLoading && <Text style={{color: 'white'}}>LOADING</Text>}
//     </View>
//   )
// }

// renderItem = ({item}) => {
//   const {navigation} = this.props
//   let single = item
//   let obj = {}
//   obj['title'] = 'wav remote download'
//   let genjam = single.audio ? single.audio : 'nope'
//   obj['url'] = 'https://mammuts.it/vocal/' + genjam
//   let pictures = []
//   for (let i = 0; i < single.immagine.length; i++) {
//     pictures.push(
//       'https://mammuts.it' +
//         single.immagine[0].substring(2, single.immagine[0].length),
//     )
//   }
//   return (
//     <View key={single.id}>
//       <EachPost
//         images={pictures}
//         soundInfo={obj}
//         soundIsExist={single.audio}
//         published={single.data_inserimento}
//         name={single.luogo}
//         description={single.testo}
//         navigation={navigation}
//       />
//     </View>
//   )
// }

/* <FlatList
data={data}
showsHorizontalScrollIndicator={false}
renderItem={this.renderItem}
keyExtractor={(item) => item.id}
onEndReached={this.renderPaginate}
// onEndReachedThreshold={0}
// ListFooterComponent={this.renderFooter}
// refreshing={true}
// ListEmptyComponent={() => (
//   <View>
//     <Text>There is no ads available</Text>
//   </View>
// )}
/> */

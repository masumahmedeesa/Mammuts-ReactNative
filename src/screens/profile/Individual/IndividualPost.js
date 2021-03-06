import React from 'react'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Axios from 'axios'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'
import {URLS} from '../../../config/urls'
import EachPost from './IndividualEachPost'

const audioTests = [
  {
    title: 'wav remote download',
    url:
      'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj',
  },
  {
    title: 'aac via require()',
    isRequire: true,
    url: require('./test2.wav'),
  },
]

class IndividualPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      page: 1,
    }
  }
  componentDidMount() {
    this.props.showLoading()
    this.fetchStories()
    this.props.hideLoading()
  }

  componentDidUpdate(prevProps, prevState) {
    let {page} = this.state
    if (prevState.page !== page) {
      this.props.showLoading()
      this.fetchStories()
      this.props.hideLoading()
    }
  }
  fetchStories = () => {
    const {info} = this.props
    const {page,stories} = this.state
    if (info) {
      const {id} = info
      Axios.get(URLS.RICORDI + `/${id}?page=${page}`)
        .then((response) => {
          this.setState({stories: stories.concat(response.data.data)})
        })
        .catch((error) => {
          console.log(error, 'error in Individual')
        })
    }
  }

  ggTT = () => {
    this.setState({page: this.state.page + 1})
  }

  // }
  render() {
    const {navigation, info} = this.props
    // const {image_profile} = info
    // const {name} = this.props.route.params
    const {stories} = this.state
    return (
      <View>
        <View style={{backgroundColor: '#000000', flex: 1}}>
          <ScrollView>
            {stories.length > 0 &&
              stories.map((single) => {
                let obj = {}
                obj['title'] = 'wav remote download'
                let genjam = single.audio ? single.audio : 'nope'
                obj['url'] = 'https://mammuts.it/vocal/' + genjam
                let pictures = []
                for (let i = 0; i < single.immagine.length; i++) {
                  pictures.push(
                    'https://mammuts.it' +
                      single.immagine[0].substring(
                        2,
                        single.immagine[0].length,
                      ),
                  )
                }
                {/* console.log(single) */}
                return (
                  <View key={single.id}>
                    <EachPost
                      info={info}
                      images={pictures}
                      soundInfo={obj}
                      soundIsExist={single.audio}
                      published={single.data_inserimento}
                      name={single.luogo}
                      description={single.testo}
                      navigation={navigation}
                    />
                  </View>
                )
              })}

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
            {/* <EachPost
              // track={mediaInfo1}
              gg={name}
              soundInfo={audioTests[0]}
              name="Casarile (mi)"
              description="Registro audio pubblico foto indico il luogo dove ho scattato foto Posso rendere il post visibile solo a me"
              published="26/12/2020 17:48"
              navigation={navigation}
            /> */}
            {/* <EachPost
              gg={name}
              // track={mediaInfo2}
              soundInfo={audioTests[1]}
              name="italy"
              description="Hi Rahat, I'm doing a test to better explain the functions of the site and what the app should do, even if I know you already know."
              published="26/08/2020 14:33"
              navigation={navigation}
            /> */}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default connect(null, {showLoading, hideLoading})(IndividualPost)

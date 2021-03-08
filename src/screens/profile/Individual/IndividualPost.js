import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {connect} from 'react-redux'
import EachPost from './IndividualEachPost'
import {ricodioActionsIndividual} from '../../../store/actions/individualActions'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'

class IndividualPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {page} = this.state
    if (prevState.page !== page) {
      const user = this.props.user
      this.props.showLoading()
      if (user) {
        this.props.ricodioActionsIndividual(user.id, page, user)
      }
      this.props.hideLoading()
    }
  }

  ggTT = () => {
    this.setState({page: this.state.page + 1})
  }

  render() {
    const {navigation, posts, user} = this.props
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
                  user={user}
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
            {!this.props.isLoading && (
              <Text style={{color: 'silver', fontSize: 21, paddingLeft: 8}}>
                Non hai ancora caricato alcun ricordo.
              </Text>
            )}
          </View>
        </View>
      )
    }
  }
}

// function mapStateToProps(state) {
//   return {
//     // posts: state.posts.posts,
//     // user: state.auth.user,
//     isLoading: state.support.loading,
//   }
// }

// export default Post
export default connect(null, {
  showLoading,
  hideLoading,
  ricodioActionsIndividual,
})(IndividualPost)

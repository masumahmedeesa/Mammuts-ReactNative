import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Modal,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  //   TouchableWithoutFeedback,
  //   FlatList,
} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import {
  sortByMonth,
  selectSingleMonth,
  ricodioActions,
} from '../store/actions/postActions'
import {showLoading, hideLoading} from '../store/actions/supportActions'

class ModalForSorting extends React.Component {

  tests = (month) => {
    const user = JSON.parse(this.props.auth.user)
    this.props.showLoading()
    this.props.selectSingleMonth(month)
    if (user) {
      this.props.sortByMonth(user.id, month, 1, user)
    }
    this.props.hideLoading()
    const {onPress} = this.props
    onPress()
  }

  previousPosts = () => {
    const user = JSON.parse(this.props.auth.user)
    this.props.showLoading()
    this.props.selectSingleMonth('')
    if (user) {
      this.props.ricodioActions(user.id, 1, user)
    }
    this.props.hideLoading()
    const {onPress} = this.props
    onPress()
  }

  renderData = () => {
    const {data, setPageOk} = this.props
    let screenWidth = Dimensions.get('screen').width
    if (data && data.length > 0) {
      let stories = []
      for (let i = 0; i < data.length; i++) {
        stories.push(
          <View
            key={data[i].months}
            style={
              data.length - i == 1
                ? {marginTop: 7, marginBottom: 30}
                : {marginTop: 7, marginBottom: 7}
            }>
            <TouchableHighlight
              style={{
                backgroundColor: '#2196F3',
                width: screenWidth * 0.73,
                padding: 6,
                borderRadius: 8,
              }}
              onPress={() => {
                setPageOk()
                this.tests(data[i].months)
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {data[i].months}
              </Text>
            </TouchableHighlight>
          </View>,
        )
      }
      return <View>{stories}</View>
    }
  }

  render() {
    let screenHeight = Dimensions.get('screen').height
    let screenWidth = Dimensions.get('screen').width
    const {modalVisible, onPress, setPageOk} = this.props
    // console.log('modal', data)
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onPress}>
        <TouchableOpacity
          onPress={onPress}
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View
            style={{
              height:
                Platform.OS == 'ios'
                  ? screenHeight * 0.34
                  : screenHeight * 0.28,
              width: screenWidth,
              alignItems: 'center',
              backgroundColor: Platform.OS == 'ios' ? '#222222' : '#222222',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginBottom: 37,
            }}>
            <ScrollView
              directionalLockEnabled={true}
              contentContainerStyle={{
                marginTop: 20,
                marginBottom: 40,
              }}>
              <View>
                <View style={{marginTop: 7, marginBottom: 7}}>
                  <TouchableHighlight
                    style={{
                      backgroundColor: '#2196F3',
                      width: screenWidth * 0.73,
                      padding: 6,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setPageOk()
                      this.previousPosts()
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      All Ricordo
                    </Text>
                  </TouchableHighlight>
                </View>
                {this.renderData()}
              </View>
            </ScrollView>

            <TouchableHighlight
              style={{
                // backgroundColor: '#2196F3',
                backgroundColor: '#4c4c4c',
                width: screenWidth * 0.93,
                padding: 4,
                borderRadius: 8,
              }}
              onPress={onPress}>
              <View style={styles.forCalendar}>
                <Icon name="x" size={21} color="rgb(0,184,249)" />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    marginLeft: 5,
                    textAlign: 'center',
                  }}>
                  Vicino
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    //   posts: state.posts,
    //   loading: state.support.loading,
  }
}

export default connect(mapStateToProps, {
  sortByMonth,
  selectSingleMonth,
  showLoading,
  hideLoading,
  ricodioActions,
})(ModalForSorting)

const styles = StyleSheet.create({
  forCalendar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // marginBottom: 10,
    // backgroundColor: '#4c4c4c',
    borderRadius: 10,
    // padding: 8,
  },
})

import React from 'react'
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import {showLoading, hideLoading} from '../../../store/actions/supportActions'
import {legamiAddorRemove} from '../../../store/actions/postActions'
import ImageGod from '../../../components/ImageGod'
import styles from '../styles'

class ConnectOther extends React.Component {
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

  renderIndividualPeople = (item) => {
    const {nome, cognome, image_profile, email} = item
    const {legamies, otherLevel, navigation, user} = this.props
    const parsedLevel = JSON.parse(otherLevel)
    let flag = false
    const dd = Date.now() + item.id
    const legamiView = legamies.map((l) => {
      if (l.id == item.id) {
        flag = true
        return (
          <TouchableOpacity
            key={dd}
            onPress={() => this.removeLegami(item.cf_key)}
            style={styles.addBoxRed}>
            <Text style={styles.addTextRed}>Rimuovere</Text>
          </TouchableOpacity>
        )
      }
    })

    return (
      <View
        style={{
          marginTop: 17,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (parsedLevel.id == item.id) {
              navigation.navigate('Profile')
            } else if (user.id == item.id) {
              // do nothing
            } else {
              navigation.navigate('Individual', {user: item})
            }
          }}
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
            <View style={{flex: 6, paddingTop: 3, paddingLeft: 5}}>
              <Text style={styles.normalText}>{nome + ' ' + cognome}</Text>
              <Text style={styles.normalText}>{email}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {flag ? (
          legamiView
        ) : (
          <TouchableOpacity
            onPress={() => this.addLegami(item.cf_key)}
            style={styles.addBox}>
            <Text style={styles.addText}>Aggiungi</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  render() {
    const {legami} = this.props
    // console.log(legami.length, this.state.count)
    if (legami && legami.length > 0) {
      return (
        <View style={{padding: 8}}>
          {legami.map((single) => {
            return (
              <View key={single.id}>{this.renderIndividualPeople(single)}</View>
            )
          })}

          <View style={{marginBottom: 20}} />
        </View>
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
            <Text
              style={{
                color: 'silver',
                fontSize: 21,
                paddingLeft: 8,
                paddingTop: 3,
              }}>
              Non hai legami
            </Text>
          </View>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    legami: state.other.legami,
    legamies: state.posts.legami,
    otherLevel: state.auth.user,
  }
}

export default connect(mapStateToProps, {
  legamiAddorRemove,
  showLoading,
  hideLoading,
})(ConnectOther)

// navigation.navigate('Individual', {info: item})

import React from 'react'
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styles from './styles'

class Connect extends React.Component {
  renderIndividualPeople = (item) => {
    // console.log(imageProfile)
    const {nome, cognome, image_profile, email} = item
    // const {navigation} = this.props
    return (
      <View
        style={{
          marginTop: 17,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Individual', {info: item})}
          style={{flex: 8}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingRight: 5}}>
              {image_profile ? (
                <Image
                  source={{uri: 'https://mammuts.it/' + image_profile}}
                  style={{width: '100%', height: 45, borderRadius: 50}}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/cat.jpeg')}
                  style={{width: '100%', height: 45, borderRadius: 50}}
                />
              )}
            </View>
            <View style={{flex: 6, paddingTop: 3}}>
              <Text style={styles.normalText}>{nome + ' ' + cognome}</Text>
              <Text style={styles.normalText}>{email}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert('Remove', 'Remove from ties', [{text: 'Okay'}])
          }
          style={styles.addBoxRed}>
          <Text style={styles.addTextRed}>Rimuovere</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {legami} = this.props
    // console.log(legami)
    return (
      <View style={{padding: 8}}>
        {legami.map((single) => {
          return (
            <View key={single.id}>
              {this.renderIndividualPeople(single)}
              {/* single.nome + ' ' + single.cognome,
                  single.email,
                  single.image_profile, */}
            </View>
          )
        })}
        {/* {this.renderIndividualPeople('Davide Cavallari jdf iisdn')} */}

        <View style={{marginBottom: 20}} />
      </View>
    )
  }
}

export default Connect

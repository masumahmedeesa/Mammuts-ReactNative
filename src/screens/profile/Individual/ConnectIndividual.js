import React from 'react'
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styles from '../styles'

class ConnectIndividual extends React.Component {
  renderIndividualPeople = (item) => {
    // console.log(imageProfile)
    const {nome, cognome, image_profile, email} = item
    const {navigation} = this.props
    return (
      <View
        style={{
          marginTop: 17,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Other', {info: item})}
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
                  source={require('../../../../assets/images/cat.jpeg')}
                  style={{width: '100%', height: 45, borderRadius: 50}}
                />
              )}
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
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert('Add', 'Add to ties', [{text: 'Okay'}])}
          style={{
            flex: 2,
            backgroundColor: '#323232',
            borderRadius: 10,
            padding: 2,
          }}>
          <Text style={{color: 'white', textAlign: 'center', paddingTop: 3}}>
            Aggiungi ai legami
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {legamies} = this.props
    return (
      <View>
        {legamies.map((single) => {
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
        {/* {this.renderIndividualPeople('Davide Mallak')} */}
        <View style={{marginBottom: 20}} />
      </View>
    )
  }
}

export default ConnectIndividual

// navigation.navigate('Individual', {info: item})
// {Alert.alert('Go', 'To a new page!', [{text: 'Okay'}])}
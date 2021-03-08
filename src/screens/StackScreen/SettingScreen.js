import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

class SettingScreen extends React.Component {
  render() {
    const {navigation} = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000',
        }}>
        <View style={{marginBottom: 15}} />
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#323232',
            margin: 11,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('Privacy')
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="hash"
              style={{
                marginLeft: 9,
                color: 'rgb(0,184,249)',
                fontSize: 25,
              }}
            />
            <Text
              style={{
                color: '#fff',
                padding: 3,
                marginLeft: 9,
                fontSize: 17,
              }}>
              Privacy Policy
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#323232',
            margin: 11,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('Copyright')
          }}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="copyright"
              style={{
                marginLeft: 9,
                color: 'rgb(0,184,249)',
                fontSize: 25,
              }}
            />
            <Text
              style={{
                color: '#fff',
                padding: 3,
                marginLeft: 9,
                fontSize: 17,
              }}>
              Copyright
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#323232',
            margin: 11,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('Terms')
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="file-text"
              style={{
                marginLeft: 9,
                color: 'rgb(0,184,249)',
                fontSize: 25,
              }}
            />
            <Text
              style={{
                color: '#fff',
                padding: 3,
                marginLeft: 9,
                fontSize: 17,
              }}>
              Termini E Condizioni
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}

const SettingScreenFunction = (props) => {
  const navigation = useNavigation()

  return <SettingScreen {...props} navigation={navigation} />
}

export default SettingScreenFunction

import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Modal,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import DatePicker from 'react-native-date-picker'

class ModalView extends React.Component {
  render() {
    let screenHeight = Dimensions.get('screen').height
    let screenWidth = Dimensions.get('screen').width
    const {modalVisible, setDate, date, onPress} = this.props
    // console.log('modal', date)
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        visible={modalVisible}
        onRequestClose={onPress}>
        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View
            style={{
              height:
                Platform.OS == 'ios'
                  ? screenHeight * 0.34
                  : screenHeight * 0.28,
              width: screenWidth,
              alignItems: 'center',
              backgroundColor: Platform.OS == 'ios' ? '#323232' : '#4c4c4c',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <DatePicker
              textColor={Platform.OS == 'ios' ? '#fff' : '#fff'}
              date={date}
              mode="date"
              format="YYYY-MM-DD"
              androidVariant="nativeAndroid"
              onDateChange={setDate}
            />

            <TouchableHighlight
              style={{
                backgroundColor: '#2196F3',
                width: screenWidth * 0.83,
                padding: 4,
                borderRadius: 8,
              }}
              onPress={onPress}>
              <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>
                Impostare la data
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ModalView

import React from 'react'
import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native'

const Loader = (props) => {
  return (
    <Modal
      transparent
      animationType={'none'}
      visible={props.isLoading}
      onRequestClose={() => {
        // console.log('close modal')
      }}>
      <View style={styles.modalBackground}>
        <View>
          <ActivityIndicator
            size="large"
            color="cyan"
            animating={props.loading}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

export default Loader

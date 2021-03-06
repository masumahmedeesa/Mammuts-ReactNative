import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

const RadioButton = (props) => {
  return (
    <TouchableOpacity style={styles.circle} onPress={props.onPress}>
      {props.checked ? <View style={styles.checkedCircle} /> : <View />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'deepskyblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'yellow',
  },
});

export default RadioButton;

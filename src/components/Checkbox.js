import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const Checkbox = (props) => {
  return (
    <TouchableOpacity onPress={props.termsHandler} style={{marginTop: 10}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            height: 22,
            width: 22,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: 'deepskyblue',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}>
          {props.terms ? (
            <Animatable.View animation="bounce">
              <Feather name="check" style={{color: 'yellow', fontSize: 17}} />
            </Animatable.View>
          ) : (
            <View />
          )}
        </View>

        <View style={{flex: 17}}>
          {props.terms ? (
            <Text style={{color: 'cyan', marginTop: 1.5}}>{props.text}</Text>
          ) : (
            <Text style={{color: 'silver', marginTop: 1.5}}>{props.text}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;

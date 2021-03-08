import React from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'

export default class CopyrightScreen extends React.Component {
  render() {
    const runFirst = `
      document.body.style.backgroundColor = 'black';
      true;
    `
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: 'https://www.mammuts.it/copyright',
          }}
          onMessage={(event) => {}}
          injectedJavaScript={runFirst}
        />
      </View>
    )
  }
}

import React from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'

export default class PrivacyScreen extends React.Component {
  render() {
    const runFirst = `
      document.body.style.backgroundColor = 'black';
      // setTimeout(function() { window.alert('Mammuts, Privacy Policy') }, 2000);
      true;
    `
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: 'https://www.mammuts.it/privacy-policy',
            // uri: 'https://google.com'
          }}
          onMessage={(event) => {}}
          injectedJavaScript={runFirst}
        />
      </View>
    )
  }
}

import React from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'

export default class TermsScreen extends React.Component {
  render() {
    const runFirst = `
      window.isNativeApp = true;
      true;
    `
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: 'https://www.mammuts.it/termini-condizioni',
          }}
          injectedJavaScriptBeforeContentLoaded={runFirst}
          // injectedJavaScript={runFirst}
        />
      </View>
    )
  }
}

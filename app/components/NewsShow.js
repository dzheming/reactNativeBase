import React, {PureComponent} from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'

export default class NewsShow extends PureComponent {
  render() {
    let {navigation, route} = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{uri: route.params.url}} />
      </SafeAreaView>
    );
  }
}
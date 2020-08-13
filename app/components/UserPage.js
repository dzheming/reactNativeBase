import React, {PureComponent} from 'react';
import { Button,View } from 'react-native';

export default class UserPage extends PureComponent {
  render() {
    let {navigation} = this.props;
    return (
      <View style={{ backgroundColor: "blue", flex: 1 }}>
              <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home', { screen: 'NewsShow' })}
      />
      </View>
    );
  }
}
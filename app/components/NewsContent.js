import React, {PureComponent} from 'react';
import ImageNews from './ImageNews'
import NormalNews from './NormalNews'

export default class NewsContent extends PureComponent {
  render() {
    let { item, onPress } = this.props;
    return item.multigraphCutList &&
      item.multigraphCutList.length <= 4 &&
      item.multigraphCutList.length > 1 ? (
      <ImageNews newData={item} onPress={onPress}/>
    ) : (
      <NormalNews newData={item} onPress={onPress}/>
    );
  }
}

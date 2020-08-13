import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  simpleStyle,
} from './styles';

export class PropsGaea {
  constructor() {
    this.gaeaName = '大图浏览';
    this.gaeaIcon = 'square-o';
    this.gaeaUniqueKey = 'nt-image-viewer';
  }
}

export class Props extends PropsGaea {
  constructor() {
    super(...arguments);
    this.show = false;
    this.imageUrls = [];
    this.enableImageZoom = true;
    this.visible = false;
    this.flipThreshold = 80;
    this.maxOverflow = 300;
    this.failImageSource = '';
    this.index = 0;
    this.saveToLocalByLongPress = true;
    this.menuContext = {
      saveToLocal: '保存到相册',
      cancel: '取消'
    };
    this.onShowModal = () => {};
    this.onCancel = () => {};
    this.loadingRender = () => {
      return null;
    };
    this.onSaveToCamera = () => {};
    this.onChange = () => {};
    this.onClick = (close) => {
      close();
    };
    this.onDoubleClick = (close) => {};
    this.renderHeader = () => {
      return null;
    };
    this.renderFooter = () => {
      return null;
    };
    this.renderIndicator = (currentIndex, allSize) => {
      return (
        <View style={simpleStyle.count}>
          <Text style={simpleStyle.countText}>
            {currentIndex + '/' + allSize}
          </Text>
        </View>
      );
    };
    this.renderArrowLeft = () => {
      return null;
    };
    this.renderArrowRight = () => {
      return null;
    };
  }
}
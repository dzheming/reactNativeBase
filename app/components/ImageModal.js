import React, {Component} from 'react';
import {
  View,
  Modal,
  Dimensions,
  ActivityIndicator,
  CameraRoll,
} from 'react-native';
import ImageViewer from '../utils/ImageViewer';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      animating: true,
    };
    this.renderLoad = this.renderLoad.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this._Close = this._Close.bind(this);
  }
  _Close() {
    this.props.cancel();
  }
  renderLoad() {
    return (
      <View style={{marginTop: screenHeight / 2 - 20}}>
        <ActivityIndicator animating={this.state.animating} size={'large'} />
      </View>
    );
  }
  savePhoto(url) {
        if (Platform.OS === 'ios') {  //ios图片保存
            let promise = CameraRoll.saveToCameraRoll(url);
            promise.then(function (result) {
                alert("已保存到系统相册")
            }).catch(function (error) {
                alert('保存失败！\n' + error);
            });
        } else {  //Android  先下载到本地
            let DownloadFileOptions = {
                fromUrl: url,          //下载路径
                toFile: this.androidDownPath     // Local filesystem path to save the file to
            }
            let result = RNFS.downloadFile(DownloadFileOptions);
            let _this = this;
            result.promise.then(function (val) {
                console.log("文件保存成功：" + _this.androidDownPath)
                let promise = CameraRoll.saveToCameraRoll(_this.androidDownPath);
                promise.then(function (result) {
                    // console.error(JSON.stringify(result))
                    alert("已保存到系统相册")
                }).catch(function (error) {
                    alert('保存失败！\n' + error);
                });

            }, function (val) {
                console.log('Error Result:' + JSON.stringify(val));
            }
            ).catch(function (error) {
                console.log(error.message);
            });
        }
  }

  render() {
    let imageData = this.state.data;
    let ImageObjArray = [];
    for (let i = 0; i < imageData.length; i++) {
      let Obj = {};
      Obj.url = imageData[i];
      ImageObjArray.push(Obj);
    }
    return (
      <View
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.props.modalVisible}
        >
          <ImageViewer
            imageUrls={ImageObjArray} // 照片路径
            enableImageZoom={true} // 是否开启手势缩放
            saveToLocalByLongPress={true} //是否开启长按保存
            index={this.props.curentImage} // 初始显示第几张
            loadingRender={this.renderLoad}
            enableSwipeDown={false}
            menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
            onChange={(index) => {}} // 图片切换时触发
            onClick={() => {
              // 图片单击事件
              this._Close();
            }}
            onSave={(url) => {
              this.savePhoto(url);
            }}
            
          />
        </Modal>
      </View>
    );
  }
}

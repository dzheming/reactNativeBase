import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getDifferTime} from '../utils/utils';
import {styles} from '../styles/newsPage';
import ImageModal from './ImageModal';
const windowWidth = Dimensions.get('window').width;

export default class ImageNews extends PureComponent {
  state = {
    modalVisible: false,
    curentImage: 0,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setCurrentImage = (index) => {
    this.setState({curentImage: index});
  };
  render() {
    let d = this.props.newData;
    let {modalVisible, curentImage} = this.state;
    let imgWidth =
      (windowWidth - 30) / (d.multigraphCutList.length > 3 ? 3 : 2) - 10;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              {d.topicName ? (
                <Text style={styles.topicName}> #{d.topicName}# </Text>
              ) : null}
              <Text style={styles.title}>{d.title}</Text>
              <View style={styles.multiImageContainer}>
                <FlatList
                  horizontal={true}
                  data={d.multigraphCutList}
                  keyExtractor={(item, index) => index + ''}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.openButton}
                        onPress={() => {
                          this.setModalVisible(true);
                          this.setCurrentImage(index);
                        }}>
                        <Image
                          source={{uri: item}}
                          style={{
                            width: imgWidth,
                            height: imgWidth,
                            marginRight: 5,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}></FlatList>
              </View>
              <View style={styles.userContainer}>
                <Image
                  source={
                    d.submitted_user.img_url
                      ? {uri: d.submitted_user.img_url}
                      : require('../assets/defaultUser.png')
                  }
                  style={styles.userImg}
                />
                <View style={styles.submitContainer}>
                  <Text style={styles.submitName}>{d.submitted_user.nick}</Text>
                  <Text style={styles.inPoolTime}>
                    {getDifferTime(d.time_into_pool / 1000, Date.now())}前入榜
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <ImageModal
          modalVisible={modalVisible}
          cancel={() => this.setModalVisible(false)}
          data={d.multigraphList}
          curentImage={curentImage}
        />
      </View>
    );
  }
}

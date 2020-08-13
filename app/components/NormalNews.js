import React, {PureComponent} from 'react';
import {Image, Text, View, TouchableOpacity, } from 'react-native';
import {getDifferTime} from '../utils/utils';
import {styles} from '../styles/newsPage';
import Link from "../assets/icons/link.svg";
import ImageModal from './ImageModal';
export default class NormalNews extends PureComponent {
  state = {
    modalVisible: false,
    curentImage: 0
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setCurrentImage = (index) => {
    this.setState({curentImage: index})
  }
  render() {
    let d = this.props.newData;
    let { modalVisible, curentImage } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity 
        onPress={this.props.onPress}
        >
        {d.topicName ? (
          <Text style={styles.topicName}> #{d.topicName}# </Text>
        ) : null}
        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{d.title}</Text>
            {d.url ? (
              <View style={styles.uriContainer}>
                <Link color="gray" width={15} hight={15}/>
                <Text style={styles.urlText}>
                  {d.url.split('/')[2].replace('www.', '')}
                </Text>
              </View>
            ) : null}
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
          <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
            this.setCurrentImage(0);
          }}
        >
          <View style={styles.rightContainer}>
            <Image source={{uri: d.img_url}} style={styles.rightImg} />
          </View>
          </TouchableOpacity>
        </View>
        </TouchableOpacity >
        <ImageModal 
          modalVisible={modalVisible} 
          cancel={() => this.setModalVisible(false)} 
          data={[d.original_img_url]}
          curentImage={curentImage}
          />
      </View>
    );
  }
}

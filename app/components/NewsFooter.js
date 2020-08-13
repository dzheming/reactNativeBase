import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Fire from '../assets/icons/fire.svg';
import FireActive from '../assets/icons/fireActive.svg';
import Message from '../assets/icons/message.svg';
import Heart from '../assets/icons/heart.svg';
import HeartActive from '../assets/icons/heartActive.svg';
import Share from '../assets/icons/share.svg';
const firePress = () => {};

const heartPress = () => {};

const sharePress = () => {};
export default function NewsFooter(props) {
  let {d, messagePress} = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        paddingBottom: 10,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => firePress()}
        style={{
          alignSelf: 'flex-start',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        {d.has_uped ? (
          <FireActive width={18} height={18} color="gray" />
        ) : (
          <Fire width={18} height={18} color="gray" />
        )}
        {d.ups > 0 ? (
          <Text style={{marginLeft: 5, color: 'gray'}}>{d.ups}</Text>
        ) : null}
        </TouchableOpacity>
      
        <TouchableOpacity
        onPress={messagePress}
        style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
        <Message width={18} height={18} color="gray" />
        {d.comments_count > 0 ? (
          <Text style={{marginLeft: 5, color: 'gray'}}>{d.comments_count}</Text>
        ) : null}
        </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => heartPress()}
        style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
        {d.has_saved ? (
          <HeartActive width={18} height={18} color="gray" />
        ) : (
          <Heart width={18} height={18} color="gray" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => sharePress()}
        style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Share width={18} height={18} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

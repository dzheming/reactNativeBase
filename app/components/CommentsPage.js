import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, Text, Image} from 'react-native';
import NormalNews from './NormalNews';
import NewsFooter from './NewsFooter';
import {getDifferTime} from '../utils/utils';

const COMMIT_URL = 'https://dig.chouti.com/comments/show?sort=1&id=';
export default function CommentsPage(props) {
  let [comments, setComments] = useState([]);
  let {navigation, route} = props;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let url = COMMIT_URL + route.params.d.id;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data.commentList) {
          setComments(responseData.data.commentList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderComments = ({item}) => {
    return (
      <View style={{backgroundColor: '#fff', paddingTop: 5, paddingLeft: 15, paddingRight: 10}}>
        {Comments({item})}
        {item.childs ? (
          <View style={{paddingLeft: 30, paddingTop: 5}}>
            <FlatList
              listKey={item.user.jid + '' + item.createTime}
              data={item.childs}
              renderItem={Comments}
              keyExtractor={(item, index) =>
                item.user.jid + '' + item.createTime
              }
            />
            </View>
        ) : null}
      </View>
    );
  };

  const Comments = ({item}) => {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.user.img_url
                ? {uri: item.user.img_url}
                : require('../assets/defaultUser.png')
            }
            style={{
              width: 26,
              height: 26,
              borderRadius: 50,
            }}
          />
          <Text style={{marginLeft: 5, fontSize: 12, color: 'gray'}}>
            {item.user.jid} {getDifferTime(item.createTime / 1000, Date.now())}
            前
          </Text>
        </View>
        <Text style={{paddingLeft: 28, fontSize: 14}}> {item.content}</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingTop: 10,
          paddingBottom: 100,
        }}>
        <Text style={{fontSize: 16, color: 'gray'}}>暂无评论</Text>
      </View>
    );
  };

  const renderHeader = () => {
    let item = route.params.d;
    return (
      <View>
        <NormalNews newData={item} />
        <NewsFooter d={item} messagePress={() => fetchData} />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={{marginBottom: 5}}
        ListFooterComponent={() => {
          return <View style={{height: 20, backgroundColor: '#fff'}}></View>;
        }}
        ListEmptyComponent={renderEmpty}
        data={comments}
        renderItem={renderComments}
        keyExtractor={(item, index) => item.user.jid + '' + item.createTime}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}

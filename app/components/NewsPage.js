import React, {PureComponent} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import NewsContent from './NewsContent';
import JRNLoadMoreFooter, {LOAD_MORE_STATE} from './JRNLoadMoreFooter';
import NewsFooter from './NewsFooter';

const REQUEST_URL = 'https://dig.chouti.com/link/hot';
export default class NewsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      afterTime: 0,
      showFooter: LOAD_MORE_STATE.CANCEL,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    if (
      this.state.showFooter === LOAD_MORE_STATE.REFRESHING ||
      this.state.showFooter === LOAD_MORE_STATE.NO_MORE_DATA
    ) {
      return;
    }
    let url = REQUEST_URL;
    if (this.state.afterTime > 0) {
      url = url + '?afterTime=' + this.state.afterTime;
    }
    this.setState({showFooter: LOAD_MORE_STATE.REFRESHING});
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        let afterTime = 0;
        if (responseData.data.length > 0) {
          let d = responseData.data[responseData.data.length - 1];
          afterTime = d.time_into_pool;
        }
        if (responseData.data.length < 24) {
          this.setState({showFooter: LOAD_MORE_STATE.NO_MORE_DATA});
        } else {
          this.setState({showFooter: LOAD_MORE_STATE.CANCEL});
        }
        this.setState({
          data: this.state.data.concat(responseData.data),
          loaded: true,
          afterTime: afterTime,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({showFooter: LOAD_MORE_STATE.CANCEL});
      });
  }

  refresh = () => {
    if (this.state.showFooter === LOAD_MORE_STATE.REFRESHING) {
      return;
    }
    this.setState({refreshing: true})
    let url = REQUEST_URL;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        let newData = []
        responseData.data.forEach(d => {
          if (this.state.data.findIndex((v) => v.id === d.id ) < 0) {
            newData.push(d)
          }
        });
        this.setState({
          data: [...newData, ...this.state.data],
          refreshing: false
        });
      })
      .catch((error) => {
        this.setState({refreshing: false})
        console.log(error);
      });
  }

  onPressItem = (url) => {
    let {navigation} = this.props;
    navigation.navigate('NewsShow', {
      url: url,
    });
  };

  messagePress = (item) => {
    let {navigation} = this.props;
    navigation.navigate('CommentsPage', {
      d: item,
    });
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#f5f5f5',
        }}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderNews}
          keyExtractor={(item, index) => item.id + ''}
          ListFooterComponent={() => {
            return <JRNLoadMoreFooter state={this.state.showFooter} />;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={this.fetchData}
          onRefresh={this.refresh}
          refreshing={this.state.refreshing}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={{height: 5}}></View>;
          }}
          initialNumToRender={5}
        />
      </SafeAreaView>
    );
  }

  renderLoadingView() {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  renderNews = ({item}) => {
    return (
      <View>
        <NewsContent item={item} onPress={() => this.onPressItem(item.url)} />
        <NewsFooter
          d={item}
          messagePress={() => this.messagePress(item)}
        />
      </View>
    );
  };
}

import colors from "./colors";
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    backgroundColor: colors.MAIN_COLOR,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 3,
    paddingRight: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  multiImageContainer: {
    marginTop: 10,
  },
  uriContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  userContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  userImg: {
    width: 26,
    height: 26,
    borderRadius: 50,
  },
  submitContainer: {
    marginLeft: 10,
  },
  submitName: {
    color: colors.TEXT_GRAY_COLOR,
    fontSize: 14,
  },
  inPoolTime: {
    color: colors.TEXT_GRAY_COLOR,
    fontSize: 10,
  },
  topicName: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.TAG_BG_COLOR,
    color: colors.TAG_TEXT_COLOR,
    fontSize: 14,
    fontWeight: ('bold', '700'),
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 18,
    letterSpacing: 1,
  },
  rightImg: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    shadowColor: colors.GRAY_COLOR,
    shadowOffset: {width: 2,height: 4},
    shadowRadius: 20,
  },
  urlText: {
    fontSize: 14,
    marginLeft: 4,
  },
  imageView: {
    width: windowWidth,
  }
});
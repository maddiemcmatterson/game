import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const MARGIN = 0.025*Layout.window.height;
const IMAGE_SIZE = 0.2*Layout.window.height;

export default StyleSheet.create({


  gamesContainer: {
    backgroundColor: 'floralwhite',
    alignItems: 'center',
    flex: 1,
  },
  
  gamesImage: {
    height: IMAGE_SIZE,
    aspectRatio: 1,
    resizeMode: 'cover',
    margin: MARGIN,

  },
  
  gamesImagePress: {
  },

  gamesTitleText: {
    marginHorizontal: 25,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "center",
  },

  gamesListArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'floralwhite',
  },

  gamesHeading: {
    marginHorizontal: 25,
    marginTop: MARGIN,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "center",
  },
});

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const MARGIN = 0.0125*Layout.window.height;
const IMAGE_SIZE = 0.25*Layout.window.height;

export default StyleSheet.create({


  container: {
    backgroundColor: 'floralwhite',
    alignItems: 'center',
    paddingTop: 20,
    flex: 1,
  },
  
  gameImage: {
    height: IMAGE_SIZE,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: MARGIN,
  },
  
  gameImagePress: {
  },

  titleText: {
    marginHorizontal: 25,
    marginTop: 50,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "center",
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const MARGIN = 0.0125*Layout.window.height;
const IMAGE_SIZE = 0.25*Layout.window.height;

export default StyleSheet.create({
  mainContainer: {
    alignContent: 'center',
    backgroundColor: 'floralwhite',
    flex: 1,
    paddingTop: 20,
  },

  mainHeading: {
    marginHorizontal: 25,
    marginTop: MARGIN,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "center",
  },

  mainContentContainer: {
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: MARGIN,
  },

  mainListArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'floralwhite',
  },
});
import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const MARGIN = 0.0125*Layout.window.height;
const IMAGE_SIZE = 0.25*Layout.window.height;

export default StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: 'floralwhite',
    flex: 1,
    paddingTop: 20,
  },

  heading: {
    marginHorizontal: 25,
    marginTop: 50,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "center",
  },
  
  mainContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  contentContainer: {
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: MARGIN,
  },

  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'floralwhite',
  },
});
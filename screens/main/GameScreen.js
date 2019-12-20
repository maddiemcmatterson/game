import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Layout from '../../constants/Layout';
import { withNavigationFocus } from 'react-navigation';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../../components/StyledText';


class GameScreen extends React.Component {

  state = {};

  componentDidMount() { this.update(); }

  componentDidUpdate() {
    if (this.props.isFocused) {
      console.log('GAME SCREEN...');
      console.log(JSON.stringify(this.props));
    }
  }

  render() {

    this.update();

    return (

      <View style={styles.container}>
        <Text style={styles.heading}>Games</Text>
        <View style={styles.mainContainer}>
          <ScrollView style={styles.contentContainer}>
            
            <TouchableOpacity onPress={handleHelpPress} style={styles.gameImagePress}>
              <Image source={require('../../assets/images/random-letters.png')} style={styles.gameImage}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleHelpPress} style={styles.gameImagePress}>
              <Image source={require('../../assets/images/random-numbers.jpg')} style={styles.gameImage}/>
            </TouchableOpacity>

          </ScrollView>    
        </View>
      </View>
    );
  }

  update() {}

}

GameScreen.navigationOptions = {};

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://www.google.com'
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: 'floralwhite',
    flex: 1,
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  mainContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  gameImage: {
    height: 0.25*Layout.window.height,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: 0.05*Layout.window.height,
  },
  
  gameImagePress: {
  },

  titleText: {
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 50,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
});

export default withNavigationFocus(GameScreen);


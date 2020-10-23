import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

class MatchLettersBase extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}

    this.select = this.select.bind(this);
  }

  select() {
    WebBrowser.openBrowserAsync('https://www.google.com')
  }

  render() {
    return (
      <TouchableOpacity onPress={this.select} style={styles.gameImagePress}>
        <Image source={this.props.gameImage} style={styles.gameImage}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

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

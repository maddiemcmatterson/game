import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../GameIconStyle';


class WordsIcon extends React.Component {

  constructor(props) {

    super(props);
    this.state = {};

    this.select = this.select.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  select() {
    this.props.navigation.navigate('Words');
  }

  getImages() {
    return this.props.gameInfo.IMAGE;
  }

  render() {

    return (
        <View style={GameIconStyle.gamesContainer}>
          <TouchableOpacity onPress={this.select} style={GameIconStyle.gamesImagePress}>
            <Image
              source={ this.getImages() }
              style={GameIconStyle.gamesImage}/>
          </TouchableOpacity>
        </View>
    );
  }
}

export default withNavigationFocus(WordsIcon);


import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../GameIconStyle';


class NumbersIcon extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};

    this.select = this.select.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  select() {
    console.log('NumbersIcon', this.props);
    this.props.navigation.navigate('Numbers', {'gameInfo': this.props.gameInfo.GAMES});
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

export default withNavigationFocus(NumbersIcon);


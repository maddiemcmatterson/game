import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../constants/Layout';


class Picture extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      picture: this.props.picture
    };

    this.imagePress = this.imagePress.bind(this);
  }

  imagePress() {
    console.log('IMAGE PRESS...');
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={ this.imagePress } style={styles.profileImagePress}>
          <Image source={{ uri: this.picture.node.image.uri }} style={styles.profileImage}/>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  profileImage: {
    height: 0.15*Layout.window.height,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: 0.015*Layout.window.height,
  },

  profileImagePress: {
  },
  
  name: {
    fontSize: 18,
  },

});

export default withNavigationFocus(Pictures);


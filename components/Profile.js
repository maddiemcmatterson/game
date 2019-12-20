import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../constants/Layout';


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.imagePress = this.imagePress.bind(this);
  }

  imagePress() {
    if (this.props.profile.uid === -1) {
      this.props.navigation.navigate('NewProfile');
    } 
    else {
      this.props.navigation.navigate('Games');
    }
  }

  render() {

    if (this.profile()) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={ this.imagePress } style={styles.profileImagePress}>
            <Image source={ this.imagePath() } style={styles.profileImage}/>
          </TouchableOpacity>
          <Text style={styles.name}> { this.props.profile.firstName } { this.props.profile.lastName } </Text>
        </View>
      );
    }
  }

  profile() {
    return this.props.profile !== null;
  }

  imagePath() {
    if (typeof(this.props.profile.imagePath) !== null) {
      console.log(this.props.profile);
      return this.props.profile.imagePath;
    } else {
      return this.props.defaultProfile.imagePath;
    }
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

export default withNavigationFocus(Profile);


import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../constants/Layout';
import Profile from './Profile';


class Profiles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultProfile: {
        uid: 1,
        firstName: 'Guest',
        lastName: 'Profile',
        imagePath: require('../assets/images/profiles/guestProfile.jpg')
      },
      newGuestProfile: {
        uid: -1,
        firstName: 'Add',
        lastName: 'Profile',
        imagePath: require('../assets/images/profiles/newProfile.png')
      },
      profiles : this.props.profiles
    };
  }

  render() {

    if (this.profiles()) {
      return (
        <View style={styles.container}>
          < Profile key={ this.state.defaultProfile.uid } profile = { this.state.defaultProfile } defaultProfile = { this.state.defaultProfile } />
          { this.props.profiles.map( profile =>
            < Profile key={ profile.uid } profile = { profile } defaultProfile = { this.state.defaultProfile } />
          )}
          < Profile key={ this.state.newGuestProfile.uid } profile = { this.state.newGuestProfile } defaultProfile = { this.state.defaultProfile } />
        </View>
      );
    } else {
      return (
        <View>< Profile profile = { this.state.defaultProfile } defaultProfile = { this.state.defaultProfile } /></View>
      );
    }

    
  }

  profiles() {
    return this.props.profiles !== null;
  }

}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
  },
});

export default withNavigationFocus(Profiles);


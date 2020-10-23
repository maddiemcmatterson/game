import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../constants/Layout';
import Profile from './Profile';
import { getProfile } from '../clientDatabase/sqliteDatabase';


class Profiles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      guestProfile: null,
      addProfile: null,
    };
  }

  render() {

    console.log(this.state);

    return (
      <View style={styles.container}>
          { this.props.profiles.map( profile =>
            < Profile
              key={ profile.uid }
              profile = { profile }
              updateProfileHandler = { this.props.updateProfileHandler } />
          )}
        </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
  },
});

export default withNavigationFocus(Profiles);


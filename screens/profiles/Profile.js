import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { Img } from 'react-image';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../../constants/Layout';
import ProfileImage from './ProfileImage';


class Profile extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }


  profile() {
    return this.props.profile !== null;
  }

  render() {

    if (this.profile()) {
      return (
        <View style={styles.container}>
            <ProfileImage
              profile = { this.props.profile }
              updateProfileHandler = { this.props.updateProfileHandler }
            />
          <Text style={styles.name}> { this.props.profile.firstName } { this.props.profile.lastName } </Text>
        </View>
      );
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
    height: 0.1*Layout.window.height,
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


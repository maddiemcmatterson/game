import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../constants/Layout';
import Constants from '../constants/Constants';
import { deleteProfile } from '../clientDatabase/sqliteDatabase';


class ProfileImage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'isActivated': false,
    }

    this.imagePress = this.imagePress.bind(this);
    this.imageLongPress = this.imageLongPress.bind(this);
    this.isDefaultImage = this.isDefaultImage.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.toggleIsActivated = this.toggleIsActivated.bind(this);
  }

  imagePress() {
    if (this.props.profile.imagePath === Constants.DEFAULT_ADD_IMAGE_PATH) {
      this.props.navigation.navigate('NewProfile');
    } 
    else {
      console.log(this.props);
      this.props.navigation.navigate('Games', {'activeProfile': this.props.profile.uid});
    }
  }

  toggleIsActivated() {
    this.setState({ isActivated: !this.state.isActivated });
  }

  imageLongPress() {
    Vibration.vibrate();
    if (!this.isDefaultImage()) {
      this.toggleIsActivated()
    }
  }

  isDefaultImage() {
    return (
      this.props.profile.imagePath === Constants.DEFAULT_GUEST_IMAGE_PATH ||
      this.props.profile.imagePath === Constants.DEFAULT_ADD_IMAGE_PATH);
  }

  getImage() {
    var imagePath = null;
    if (this.props.profile.imagePath === Constants.DEFAULT_GUEST_IMAGE_PATH) {
      imagePath = Constants.DEFAULT_GUEST_IMAGE;
    } else if (this.props.profile.imagePath === Constants.DEFAULT_ADD_IMAGE_PATH) {  
      imagePath = Constants.DEFAULT_ADD_IMAGE;
    } else {
      return (this.props.profile.imagePath);
    }
    return imagePath;
  }

  renderButton() {
    return (
      <IconButton
        style={styles.iconButton}
        icon='delete'
        color='#7b3ca4'
        size={25}
        onPress={() => this.deleteProfile()}
      />
    );
  }

  deleteProfile() {
    deleteProfile(
      this.props.profile.firstName,
      this.props.profile.lastName);
    this.toggleIsActivated()
    this.props.updateProfileHandler();
  }

  render() {

    if (this.isDefaultImage()) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.imagePress}
            onLongPress={this.imageLongPress}
            style={styles.profileImagePress}>
            <Image source={ this.getImage() } style={styles.profileImage}/>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
        {this.state.isActivated ? this.renderButton() : null}
          <TouchableOpacity
            onPress={this.imagePress}
            onLongPress={this.imageLongPress}
            style={styles.profileImagePress }>
            <Image source={ {uri: this.getImage() }} style={styles.profileImage}/>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const MARGIN = 0.0125*Layout.window.height;
const IMAGE_SIZE = 0.25*Layout.window.height;

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: MARGIN,
    marginBottom: MARGIN,
  },

  profileImage: {
    height: IMAGE_SIZE,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: MARGIN,
  },

  iconButton: {
    alignSelf: 'flex-end',
    marginTop: 0,
    marginBottom: 0,
  },

  profileImagePress: {
  },
  
  name: {
    fontSize: 18,
  },

});

export default withNavigationFocus(ProfileImage);


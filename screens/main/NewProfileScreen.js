import React from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import CameraRoll from '@react-native-community/cameraroll';
import Layout from '../../constants/Layout';


class NewProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      pictures: null,
    }
  }

  getPictures() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    }).then(results => {
      this.setState({ picrues: results.edges });
    }).catch((err) => {
      console.log(err);
    })

    console.log("Button Pressed...");
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>New Profile</Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} multiline={true} placeholder='First Name'></TextInput>
            <TextInput style={styles.textInput} multiline={true} placeholder='Last Name'></TextInput>
          </View>
          <View style={styles.profileImageButtonContainer}>
            <TouchableOpacity onPress={this.getPictures} style={styles.buttonPress}>
              <Text style={styles.buttonText}>Select Profile Image</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}


NewProfileScreen.navigationOptions = {};


const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  textInputContainer: {
    marginTop: 0.125*Layout.window.height,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  textInput: {
    marginTop: 20,
    fontSize: 24,
    color: 'blue',
    textAlign: 'center',
    width: 0.5*Layout.window.width,
    justifyContent: 'center',
  },

  profileImageButtonContainer: {
    marginTop: 60,

  },

  handleButtonPress: {

  },

  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'blue',
  },

});

export default withNavigationFocus(NewProfileScreen);


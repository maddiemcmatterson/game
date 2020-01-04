import React from 'react';
import { Modal, TouchableHighlight, Text, View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../../constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import { addProfile } from '../../clientDatabase/sqliteDatabase';
import ProfileHandler from '../profiles/ProfileHandler';
import { buildProfile } from '../../clientDatabase/loadProfiles';
import Constants from '../../constants/Constants';


class NewProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      passCode: null,
      imagePath: Constants.profiles.DEFAULT_PROFILE_IMAGE_PATH,
      modalFailureVisible: false,
      modalSuccessVisible: false,
    };

    this.handleSaveProfile = this.handleSaveProfile.bind(this);
    this.toggleFailure = this.toggleFailure.bind(this);
    this.isFullName = this.isFullName.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.clearProfile = this.clearProfile.bind(this);
  }


  handleSaveProfile() {
    if (this.isFullName()) {

      addProfile(
        buildProfile(
          this.state.firstName,
          this.state.lastName,
          this.state.passCode,
          null,
          this.state.imagePath));
      this.clearProfile();
      console.log('SAVE PROFILE', this.props);
      this.props.navigation.goBack();
    }
    else {
      this.toggleFailure();
    }
  }

  toggleFailure() {
    this.setState({ modalFailureVisible: !this.state.modalFailureVisible });
  }

  toggleSuccess() {
    this.setState({ modalSuccessVisible: !this.state.modalSuccessVisible });
  }

  showSuccess() {}

  clearProfile() {
    this.setState({ firstName: null });
    this.setState({ lastName: null });
    this.setState({ imagePath: Constants.profiles.DEFAULT_PROFILE_IMAGE_PATH });
    this.setState({ passCode: null })
  }

  isFullName() {
    return (
      this.state.firstName !== null &&
      this.state.lastName !== null
    );
  }

  handleFirstName(text) {
    this.setState({ firstName: text })
  }

  handleLastName(text) {
    this.setState({ lastName: text })
  }

  async handleSelectImage() {
    const options = {
      'allowsEditing': true,
      'aspect': [4,3],
      'quality': 1,  
    };
    ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result);
    if (!result.cancelled) {
      this.setState({ imagePath: result.uri });
    }
    console.log(this.state);
  }
  
  render() {

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalFailureVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>
            <View style={styles.modalView} >
              <Text style={styles.modalText} >Please Enter Full Name</Text>

              <TouchableOpacity onPress={this.toggleFailure} style={styles.buttonPress}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text style={styles.heading}>New Profile</Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput}
              onChangeText={ (text) => this.handleFirstName(text) }
              multiline={false}
              enablesReturnKeyAutomatically={true}
              placeholder='First Name'
              value={ this.state.firstName }>
            </TextInput>
            <TextInput style={ styles.textInput }
              onChangeText={ (text) => this.handleLastName(text) }
              multiline={false}
              enablesReturnKeyAutomatically={true}
              placeholder='Last Name'
              value={ this.state.lastName }>
            </TextInput>
          </View>
          <View style={ styles.profileImageButtonContainer }>
            <TouchableOpacity onPress={ this.handleSelectImage } style={ styles.buttonPress }>
              <Text style={styles.buttonText}>Select Profile Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.handleSaveProfile } style={ styles.buttonPress }>
              <Text style={styles.buttonText}>Save Profile</Text>
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

  buttonPress: {
    marginTop: 20,
  },

  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'blue',
  },

  modalView: {
    alignItems: 'center',
    marginTop: 0.33*Layout.window.height
  },

  modalTextContinue: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontSize: 18,
  },

  modalText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },

});

export default withNavigationFocus(NewProfileScreen);


import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Constants from '../../constants/Constants';
import Layout from '../../constants/Layout';
import { updateProfile } from '../../clientDatabase/sqliteDatabase';
import { checkPassCode } from './utils/profileUtils';

var md5 = require('md5');


class PassCodeScreen extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      activeProfile: this.props.navigation.state.params.activeProfile,
      updateProfileHandler: this.props.navigation.state.params.updateProfileHandler,
      code: '',
      codeLength: Constants.passcode.DEFAULT_PASSCODE_LENGTH,
      mask: '*',
      maskDelay: 500,
      showSuccessModel: false,
      showFailureModel: false,
    };

    this.checkCode = this.checkCode.bind(this);

  }

  toggleSuccessModel() {
    console.log('TOGGLE SUCCESS...');
    // this.setState({ showSuccessModel: !this.state.showSuccessModel});
  }

  toggleFailureModel() {
    console.log('TOGGLE FAILURE...');
    // this.setState({ showFailureModel: !this.state.showFailureModel});
  }

  checkCode() {
    setTimeout(() => {
      if ( this.state.activeProfile.passCode !== null) {
        checkPassCode(
          this.state.activeProfile,
          this.state.code,
          this.toggleSuccessModel,
          this.toggleFailureModel
        );
      }
      else {
        var activeProfile = this.state.activeProfile;
        activeProfile.passCode = this.state.code;
        this.setState({ activeProfile });
        updateProfile(
          () => this.state.updateProfileHandler(),
          this.state.activeProfile.firstName,
          this.state.activeProfile.lastName,
          'passCode', this.state.code
        );
      }
    }, 500);
  }

  render() {

    return (
      <View style = {styles.textInputContainer}>
        <Text style={styles.heading} >Enter PassCode</Text>
        <SmoothPinCodeInput
          containerStyle = {styles.pinCodeContainer}
          cellSize = {60}
          cellSpacing = {10}
          autoFocus = {true}
          cellStyle = {{
            borderBottomWidth: 2,
            borderColor: 'gray',
          }}
          cellStyleFocused = {{
            borderColor: 'black',
          }}
          codeLength = { this.state.codeLength }
          value = { this.state.code }
          animated = { true }
          animationFocused = { 'pulse' }
          onTextChange = { code => {this.setState({ code }); console.log( code );}}
          keyboardType = { 'phone-pad' }
          password = { true }
          onFulfill = { this.checkCode }
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  textInputContainer: {
    alignContent: 'center',
    backgroundColor: 'floralwhite',
    flex: 1,
    paddingTop: 20,

  },
  pinCodeContainer: {
    width: '100%',
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0.125*Layout.window.height,
  },
});

export default withNavigationFocus(PassCodeScreen);


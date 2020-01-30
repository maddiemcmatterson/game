import React from 'react';
import { StyleSheet, View, Text, Items, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import ProfileHandler from '../profiles/ProfileHandler';
import MainStyles from './MainStyles';


let Title = "Who\'s Playing\?";

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.isFocused) {
      console.log('PROFILE SCREEN...');
    }
  }

  render() {

    return (
      <View style={MainStyles.mainContainer}>
        <Text style={MainStyles.mainHeading}>{ Title }</Text>
        <View style={MainStyles.mainListArea}>
          <ProfileHandler func = { this.update } />
        </View>
      </View>
    );
  }

  update() {}
}

ProfileScreen.navigationOptions = {};

export default withNavigationFocus(ProfileScreen);

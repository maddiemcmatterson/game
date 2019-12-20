import React from 'react';
import { ScrollView, StyleSheet, View, Text, Items, TextInput } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { getProfiles } from '../../clientDatabase/sqliteDatabase';
import ProfileHandler from '../../components/ProfileHandler';

class ProfileScreen extends React.Component {

  state = {
    profiles: null
  };

  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.isFocused) {
      console.log('PROFILE SCREEN...');
      console.log(JSON.stringify(this.props));
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{ Title }</Text>
        <View style={styles.listArea}>
          <ProfileHandler func = { this.update } />
        </View>
      </View>
    );
  }

  update() {}
}

ProfileScreen.navigationOptions = {};

let Title = "Who\'s Playing\?";

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: 'floralwhite',
    flex: 1,
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'floralwhite',
  },
});

export default withNavigationFocus(ProfileScreen);

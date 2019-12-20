import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getProfiles } from '../clientDatabase/sqliteDatabase';
import Profiles from './Profiles';

export default class ProfileHandler extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      profiles: null
    };
  }

  componentDidMount() {
      this.updateProfiles();
  }

  render() {

    return (
        <View style={styles.sectionContainer}>
          <ScrollView style={styles.profileArea}>
          <Profiles profiles = { this.getProfiles() }/>
          </ScrollView>
        </View>
    );
  }

  getProfiles(){
    return this.state.profiles;
  }

  updateProfiles() {
    getProfiles((profiles) => {
      this.setState({ profiles: profiles});
      console.log(this.state.profiles)
    });
  }
}


const styles = StyleSheet.create({
  sectionContainer: {
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
  ProfileArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'floralwhite',
  },
});
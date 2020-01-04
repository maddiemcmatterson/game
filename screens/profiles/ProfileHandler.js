import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { getProfiles } from '../../clientDatabase/sqliteDatabase';
import Profiles from './Profiles';

 class ProfileHandler extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      profiles: null,
    };

    this.updateProfiles = this.updateProfiles.bind(this);

  }

   componentDidMount() {
    const { navigation } = this.props;
      this.focusListner =
      navigation.addListener('didFocus', () => {
        this.updateProfiles();
        console.log('DID FOCUS...')
      });
  }

  render() {

    if (this.profilesLoaded()) {

      return (
          <View style={styles.sectionContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={ this.state.refreshing }
                  onRefreshing={ this._onRefreshing }
                />
              }>
              <Profiles
                profiles = { this.state.profiles }
                updateProfileHandler = { this.updateProfiles }
              />
            </ScrollView>
          </View>
      );
    } else {
      return (
        <View style={styles.sectionContainer}>
          <ScrollView
            style={styles.profileArea}
            refreshControl={
              <RefreshControl
                refreshing={ this.state.refreshing }
                onRefreshing={ this._onRefreshing }
              />
            }>
            <Text style={styles.message}>
              Refreshing...
            </Text>
          </ScrollView>
        </View>
      );
    }
  }

  _onRefreshing() {
    this.setState({ refreshing: true });
    console.log('REFRESHING...');
    this.setRefreshing(false);
  }


  updateProfiles() {
    console.log('UPDATING PROFILES...');
    getProfiles((profiles) => {
      this.setState({ profiles: profiles});
    });
  }

  profilesLoaded() {
    return (this.state.profiles !== null);
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
  message: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default withNavigationFocus(ProfileHandler);

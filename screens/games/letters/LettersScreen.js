import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../GameIconStyle';
import MatchLettersIcon from './matchLetters/MatchLettersIcon';

class LettersScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameInfo: this.props.navigation.state.params.gameInfo,
    };
  }

  componentDidMont() {}

  componentDidUpdate() {}

  render() {

    return (
      <View style={GameIconStyle.container}>
        <Text style={GameIconStyle.heading}>Letter Games</Text>
        <ScrollView
            style={GameIconStyle.contentContainer}
            showsVerticalScrollIndicator={false}>
            <MatchLettersIcon gameInfo={ this.state.gameInfo.MATCH_LETTERS } callback={ this.toggleShowHeader }/>
          </ScrollView>
      </View>
    )
  }
 }

LettersScreen.navigationOptions = {};

export default withNavigationFocus(LettersScreen);

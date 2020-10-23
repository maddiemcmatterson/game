import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../GameIconStyle';
import MatchLettersIcon from './matchLetters/MatchLettersIcon';
import MemoryLettersIcon from './memoryLetters/MemoryLettersIcon';
import IdentifyLettersIcon from './identifyLetters/IdentifyLettersIcon';


class LettersScreen extends React.Component {

  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      gameInfo: this.props.navigation.state.params.gameInfo,
    };
  }

  componentDidMont() {}

  componentDidUpdate() {}

  render() {

    return (
      <View style={GameIconStyle.gamesContainer}>
        <Text style={GameIconStyle.gamesHeading}>Letter Games</Text>
        <View style={GameIconStyle.gamesListArea}>
          <ScrollView
            style={GameIconStyle.gamesContentContainer}
            showsVerticalScrollIndicator={false}>
            <MatchLettersIcon gameInfo={ this.state.gameInfo.MATCH_LETTERS } callback={ this.toggleShowHeader }/>
            <MemoryLettersIcon gameInfo={ this.state.gameInfo.MEMORY_LETTERS } callback={ this.toggleShowHeader }/>
            <IdentifyLettersIcon gameInfo={ this.state.gameInfo.IDENTIFY_LETTERS } callback={ this.toggleShowHeader }/>
          </ScrollView>
        </View>
      </View>
    )
  }
 }

LettersScreen.navigationOptions = {};

export default withNavigationFocus(LettersScreen);

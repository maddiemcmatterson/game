import React from 'react';
import Layout from '../../constants/Layout';
import LettersIcon from '../games/letters/LettersIcon';
import NumbersIcon from '../games/numbers/NumbersIcon';
import WordsIcon from '../games/words/WordsIcon';
import { withNavigationFocus } from 'react-navigation';
import Constants from '../../constants/Constants';
import GameIconStyle from '../games/GameIconStyle';

import { Image, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { MonoText } from '../../components/StyledText';


class GameScreen extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      games: Constants.games,
      activeProfile: null,
    };
  }

  componentDidMount() {
    if (this.props.activeProfile === undefined) {
      this.setState({ activeProfile: Constants.profiles.DEFAULT_GUEST_UID });
    }
    else {
      this.setState({ activeProfile: this.props.activeProfile });
    }    
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
      console.log('GAME SCREEN...');
    }
  }

  render() {

    this.update();

    return (

      <View style={GameIconStyle.gamesContainer}>
        <Text style={GameIconStyle.gamesHeading}>Games</Text>
        <View style={GameIconStyle.gamesListArea}>
          <ScrollView
            style={GameIconStyle.contentContainer}
            showsVerticalScrollIndicator={false}>
            <LettersIcon gameInfo={ this.state.games.LETTERS }/>
            <NumbersIcon gameInfo={ this.state.games.NUMBERS }/>
            <WordsIcon gameInfo={ this.state.games.WORDS }/>
          </ScrollView>
        </View>
      </View>
    );
  }

  update() {
    console.log(this.state);
  }
}

GameScreen.navigationOptions = {};

export default withNavigationFocus(GameScreen);


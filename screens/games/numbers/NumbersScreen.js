import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../GameIconStyle';
import AdditionNumbersIcon from './arithmeticNumbers/AdditionNumbersIcon';
import SubtractionNumbersIcon from './arithmeticNumbers/SubtractionNumbersIcon';
import MultiplicationNumbersIcon from './arithmeticNumbers/MultiplicationNumbersIcon';

class NumbersScreen extends React.Component {

  constructor(props) {
    super(props);

    console.log('NumbersScreen', this.props);

    this.state = {
      gameInfo: this.props.navigation.state.params.gameInfo,
    };

    console.log(this.state.gameInfo);
  }

  componentDidMont() {}

  componentDidUpdate() {}

  render() {

    return (
      <View style={GameIconStyle.gamesContainer}>
        <Text style={GameIconStyle.gamesHeading}>Number Games</Text>
        <View style={GameIconStyle.gamesListArea}>
          <ScrollView
            style={GameIconStyle.gamesContentContainer}
            showsVerticalScrollIndicator={false}>
            <AdditionNumbersIcon gameInfo={ this.state.gameInfo.ADDITION } />
            <SubtractionNumbersIcon gameInfo={ this.state.gameInfo.SUBTRACTION } />
            <MultiplicationNumbersIcon gameInfo={ this.state.gameInfo.MULTIPLICATION } />
          </ScrollView>
        </View>
      </View>
    )
  }
 }

NumbersScreen.navigationOptions = {};

export default withNavigationFocus(NumbersScreen);

import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';


const KEY_SEP = ':';
const DISABLED_COLOR = 'black';

class MatchLettersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      letterCountOptions: [{id:4}, {id:6}],
      activeLetterCount: 4,
      currentLetters: null,
      lowerCaseFirst: false,
      prevSelection: null,
      inactiveLetters: [],
    };
  }

  componentDidMount() {
    if (this.state.currentLetters === null) {
      this.getRandomLetters(this.state.activeLetterCount);
    }
  }

  componentDidUpdate() {}

  setActiveCount(val) {
    this.setState({ activeLetterCount: val});
    this.getRandomLetters(val);
  }

  renderChoice(option) {
    return (
      <TouchableOpacity
        style={ styles.choiceButton }
        onPress={() =>  this.setActiveCount(option.id)}>
        <Text key={ option.id }>{ option.id }</Text>
      </TouchableOpacity>
      );
  }

  completed() {
    if (this.state.inactiveLetters.length === 2*this.state.currentLetters.set_one.length){
      return true;
    }
    return false;
  }

  resetGame() {
    this.setState({ prevSelection: null });
    this.setState({ inactiveLetters: []});
    this.getRandomLetters(this.state.activeLetterCount);
  }

  randomize(array) {
      return GameUtils.randomizeArray(array);
  }

  getRandomLetters(val) {
    var letters =
      Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substring(0, val);

    var cnt = 0;
    var array = [];
    for (var letter of letters) {
      array.push({id:cnt, letter:letter});
      cnt += 1;
    }
    this.setState({ currentLetters: {'set_one': array, 'set_two': GameUtils.randomizeArray(array)} });
    this.setState({ lowerCaseFirst: Boolean(Math.round(Math.random())) });
  }

  assignColor(id, letter, upperCase)  {
    var key = this.buildKey(id, letter, upperCase);
    if (this.state.inactiveLetters.includes(key)) {
      return DISABLED_COLOR;
    } else if (key === this.state.prevSelection) {
      return 'darkgray';
    }
    return '#faf0e6';
  }

  buildKey(id, letter, upperCase) {
    return [id.toString(), upperCase.toString(), letter].join(KEY_SEP);
  }

  extractKeyValues(key) {
    return key.split(KEY_SEP);
  }

  checkSelect(key) {
    var prevSelection = this.state.prevSelection
    if ( prevSelection !== null) {
      var [id, upperCase, letter] = this.extractKeyValues(key);
      var [p_id, p_upperCase, p_letter] = this.extractKeyValues(prevSelection);
      if (upperCase !== p_upperCase && letter === p_letter) {
        var inactiveLetters = this.state.inactiveLetters;
        inactiveLetters.push(key)
        inactiveLetters.push(this.state.prevSelection);
        this.setState({ inactiveLetters });
      }
    }
    if (this.completed()) {
      this.resetGame();
    }
    this.setState({prevSelection: key});
  }

  renderLetter(id, letter, upperCase) {
    var key = this.buildKey(id, letter, upperCase);
    var color = this.assignColor(id, letter, upperCase);
    return (
      <TouchableOpacity
        key={ key }
        style={{
          backgroundColor: color,
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginVertical: 20,
          marginHorizontal: 5,
          borderRadius: 5,
          minWidth: 50,
        }}
        onPress={(event) => {
          if (color !== DISABLED_COLOR) {
            console.log(key);
            this.checkSelect(key);
          }
        }}
      >
        <View>
          <Text style={ styles.letter }>{ this.randomizeCase(upperCase) ? letter.toUpperCase() : letter }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  randomizeCase(upperCase) {
    return (upperCase^this.state.lowerCaseFirst)
  }

  render() {

    if (this.state.currentLetters === null){
      return (<View></View>);
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subtitle}>
          <Text style={ styles.subtitle }>Select Option</Text>
          <View style={ styles.flatList }>
            { this.state.letterCountOptions.map( option => this.renderChoice(option) ) }
          </View>
        </View>
        <View style={styles.letterRow}>
          <View style={ styles.flatListLetters }>
            { this.state.currentLetters.set_one.map( letterInfo => this.renderLetter(letterInfo.id, letterInfo.letter, false)) }
          </View>
        </View>
        <View style={styles.letterRow}>
          <View style={ styles.flatListLetters }>
            { this.state.currentLetters.set_two.map( letterInfo => this.renderLetter(letterInfo.id, letterInfo.letter, true)) }
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


MatchLettersScreen.navigationOptions = {};

export default withNavigationFocus(MatchLettersScreen);


const styles = StyleSheet.create({

  container: {
    backgroundColor: 'floralwhite',
    flex: 1,
  },
  flatList:{
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
    borderBottomColor: '#faf0e6',
    borderBottomWidth: 2,
  },
  choiceButton: {
    backgroundColor: '#faf0e6',
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    paddingTop: 10,
    fontSize: 24,
    alignItems: 'center'
  },
  letterButton: {
    backgroundColor: '#faf0e6',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    minWidth: 50,
  },
  letter: {
    fontSize: 36,
  },
  flatListLetters: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
  },
  letterRow: {
    paddingTop: 0.1*Layout.window.height,
    fontSize: 24,
    alignItems: 'center'
  },
});
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';
import InstructionsModalContent from '../../modals/InstructionsModalContent';
import SuccessModalContent from '../../modals/SuccessModalContent';
import * as Font from 'expo-font';


const KEY_SEP = ':';
const DISABLED_COLOR = 'black';

class MatchLettersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      letterCountOptions: [
        {id:4, difficulty: 'Easy'},
        {id:5, difficulty: 'Medium'},
        {id:6, difficulty: 'Hard'}],
      activeLetterCount: 4,
      currentLetters: null,
      lowerCaseFirst: false,
      prevSelection: null,
      inactiveLetters: [],
      successVisible: false,
      instructionsVisible: true,
      instructions: 'Match Uppercase and Lowercase Letters...',
    };

    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.toggleInstructionsModal = this.toggleInstructionsModal.bind(this);
    this.setActiveCount = this.setActiveCount.bind(this);
  }

  componentDidMount() {
    this.getRandomLetters();
  }

  componentDidUpdate() {
    if (this.state.currentLetters === null) {
      this.getRandomLetters();
    }
  }

  setActiveCount(val) {
    this.setState({
      activeLetterCount: val,
      currentLetters: null
    });
  }

  renderChoice(option) {
    return (
      <TouchableOpacity
        key={ option.id }
        style={ styles.choiceButton }
        onPress={() =>  this.setActiveCount(option.id)}>
        <Text key={ option.id }>{ option.difficulty }</Text>
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
    this.setState({ successVisible: true });
    this.setState({ prevSelection: null });
    this.setState({ inactiveLetters: []});
    this.getRandomLetters();
  }

  randomize(array) {
      return GameUtils.randomizeArray(array);
  }

  getRandomLetters() {
    var array = GameUtils.getRandomLetters(this.state.activeLetterCount);
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
    console.log(key);
    console.log(this.state.prevSelection);
    var prevSelection = this.state.prevSelection
    if ( prevSelection !== null) {
      var [id, upperCase, letter] = this.extractKeyValues(key);
      var [p_id, p_upperCase, p_letter] = this.extractKeyValues(prevSelection);
      if (upperCase !== p_upperCase && letter === p_letter) {
        var inactiveLetters = this.state.inactiveLetters;
        inactiveLetters.push(key)
        inactiveLetters.push(this.state.prevSelection);
        console.log('MATCH...');
        this.setState({
          inactiveLetters: inactiveLetters,
          prevSelection: null
        });
      } else {
        this.setState({prevSelection: key});
      }
    } else {
      this.setState({prevSelection: key});
    }
    if (this.completed()) {
      this.resetGame();
    }
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
          alignItems: 'center',
        }}
        onPress={(event) => {
          if (color !== DISABLED_COLOR) {
            this.checkSelect(key);
          }
        }}
      >
        <View key={ key }>
          <Text key={ key } style={{ fontSize: 18}}>
            { this.randomizeCase(upperCase) ? letter.toUpperCase() : letter }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  randomizeCase(upperCase) {
    return (upperCase^this.state.lowerCaseFirst)
  }

  toggleSuccessModal() {
    this.setState({ successVisible: !this.state.successVisible });
  }

  toggleInstructionsModal() {
    this.setState({ instructionsVisible: !this.state.instructionsVisible });
  }

  render() {

    if (this.state.currentLetters === null){
      return (<View></View>);
    }

    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.successVisible}
          onRequestClose={() => {}}>
          <SuccessModalContent
            toggleSuccessModal = { this.toggleSuccessModal }/>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.instructionsVisible}
          onRequestClose={() => {}}>
          <InstructionsModalContent
            instructions = { this.state.instructions }
            toggleInstructionsModal = { this.toggleInstructionsModal }/>
        </Modal>
        <View style={styles.subtitle}>
          <Text style={ styles.subtitle }>Select Difficulty</Text>
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
      </ScrollView>
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
  flatListLetters: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
  },
  letterRow: {
    paddingTop: 0.05*Layout.window.height,
    paddingBottom: 0.0125*Layout.window.height,
    fontSize: 24,
    alignItems: 'center'
  },
  modalTextContinue: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 18,
  },
});
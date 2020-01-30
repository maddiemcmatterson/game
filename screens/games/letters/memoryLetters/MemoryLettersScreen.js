import React from 'react';
import { StyleSheet, Text, View, Button, Modal, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';
import InstructionsModalContent from '../../modals/InstructionsModalContent';
import SuccessModalContent from '../../modals/SuccessModalContent';

const KEY_SEP = ':';

const BLACK = 'black';
const GRAY = 'lightgray';
const NORMAL = '#faf0e6';

class MemoryLettersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      difficultyOptions: [
        {id: 1, difficulty: 'Easy', rows: 2, columns: 4},
        {id: 2, difficulty: 'Medium', rows: 4, columns: 4},
        {id: 3, difficulty: 'Hard', rows: 5, columns: 6}],
      activeDifficultyOptionId: 2,
      currentLetters: null,
      prevSelection: null,
      currentSelection: null,
      inactiveLetters: [],
      successVisible: false,
      instructionsVisible: true,
      instructions: 'Touch Cards to Display Letters.\nAnd Find Letter Matches...',
    };

    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.toggleInstructionsModal = this.toggleInstructionsModal.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
    this.renderLetterGrid = this.renderLetterGrid.bind(this);
  }

  componentDidMount() {
      this.getRandomLetters();
  }

  componentDidUpdate() {
    if (this.state.currentLetters === null) {
      this.getRandomLetters();
    }
  }

  setDifficulty(val) {
    this.setState({
      activeDifficultyOptionId: val,
      currentLetters: null
    });
    setTimeout(() => {
      this.resetGame();
    }, 250);
  }

  renderChoice(option) {
    return (
      <TouchableOpacity
        key={ 'touch' + option.id }
        style={ styles.choiceButton }
        onPress={() =>  this.setDifficulty(option.id)}>
        <Text key={ 'text' + option.id }>{ option.difficulty }</Text>
      </TouchableOpacity>
      );
  }

  completed() {
    if (this.state.inactiveLetters.length === this.state.currentLetters.length){
      return true;
    }
    return false;
  }

  resetGame() {
    this.setState({ prevSelection: null });
    this.setState({ currentSelection: null });
    this.setState({ inactiveLetters: []});
    this.getRandomLetters();
  }

  getDifficultyOption(id) {
    for(var option of this.state.difficultyOptions) {
      if (option.id === id) {
        return option;
      }
    }
  }

  getRandomLetters() {
    var difficultyOptionId = this.state.activeDifficultyOptionId;
    var difficultyOption = this.getDifficultyOption(difficultyOptionId);
    var uniqueletterCount = difficultyOption.rows * difficultyOption.columns / 2.0;
    var uniqueLetters = GameUtils.getRandomString(uniqueletterCount);

    console.log(uniqueletterCount);
    console.log(uniqueLetters.length);
    var cnt = 0;
    var array = []
    for( var letter of GameUtils.randomizeArray(uniqueLetters.concat(uniqueLetters).split(''))) {
      array.push( {id: cnt, letter: letter} );
      cnt += 1;
    }
    console.log(array.length);
    this.setState({ currentLetters: array });
  }

  checkSelect(key) {
    console.log(this.state.currentLetters);
    var prevSelection = this.state.prevSelection
    var currentSelection = this.state.currentSelection

    if ( prevSelection === null) {
      console.log('SETTING PREVIOUS SELECTION...');
      this.setState({ prevSelection: key });
    } else {
      console.log('SETTING CURRENT SELECTION');
      this.setState({ currentSelection: key });

      var [id, letter] = this.extractKeyValues(key);
      var [p_id, p_letter] = this.extractKeyValues(prevSelection);

      console.log(p_letter, letter);

      if (p_letter === letter) {
        console.log('MATCH...');
        var inactiveLetters = this.state.inactiveLetters;
        console.log('ADDING...', key);
        inactiveLetters.push(key)
        console.log('ADDING...', this.state.prevSelection);
        inactiveLetters.push(this.state.prevSelection);
        this.setState({
          inactiveLetters: inactiveLetters
        });
      }
      
      setTimeout(() => {
        this.setState({
          prevSelection: null,
          currentSelection: null,
        })}, 500);
    }

    if (this.completed()) {
      setTimeout(() => {
        this.setState({ successVisible: true });
        this.resetGame();
      }, 750);
    }
  }

  assignTextColor(key)  {
    if (this.state.inactiveLetters.includes(key)) {
      return BLACK;
    } else if (key === this.state.prevSelection) {
      return BLACK;
    } else if (key === this.state.currentSelection) {
      return BLACK;
    }
    return GRAY;
  }

  assignBackgroundColor(key) {
  if (this.state.inactiveLetters.includes(key)) {
      return NORMAL;
    } else if (key === this.state.prevSelection) {
      return NORMAL;
    }
    else if (key === this.state.currentSelection) {
      return NORMAL;
    }
    return GRAY;
  }

  isLetterHidden(key) {
    return this.state.inactiveLetters.includes(key)
  }

   buildKey(id, letter) {
    return [id.toString(), letter].join(KEY_SEP);
  }

  extractKeyValues(key) {
    return key.split(KEY_SEP);
  }

  renderLetter(id, letter) {

    var key = this.buildKey(id, letter);
    var textColor = this.assignTextColor(key);
    var bkgColor = this.assignBackgroundColor(key);

    return (
      <TouchableOpacity
        key={ key }
        style={{
          backgroundColor: bkgColor,
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginVertical: 20,
          marginHorizontal: 5,
          minWidth: 50,
          alignItems: 'center',
        }}
        onPress={(event) => {
          if (textColor !== BLACK) {
            this.checkSelect(key);
          }
        }}
      >
        <View key={ key }>
          <Text
            key={ key } 
            style={{
              fontSize: 18,
              color: textColor
            }}
          >
            { letter }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderLetterRow(letterRow) {
    return (
      <View style={ styles.rowFlatListLetters }>
        { letterRow.map( option => this.renderLetter(option.id, option.letter) ) }
      </View>
    );
  }

  renderLetterGrid() {
    var structuredLetters = [];
    var difficultyOption = this.getDifficultyOption(this.state.activeDifficultyOptionId);
    var rowCnt = difficultyOption.rows;
    var columnCnt = difficultyOption.columns;
    for (var i=0; i<rowCnt; i++) {
      var j = i * columnCnt;
      var k = (i + 1) * columnCnt;
      structuredLetters.push(this.state.currentLetters.slice(j, k));
    }
    return (
      <View key={'grid'} style={styles.columnFlatListLetters}>
        { structuredLetters.map((letterRow => this.renderLetterRow(letterRow))) }
      </View>
      );
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
            { this.state.difficultyOptions.map( option => this.renderChoice(option) ) }
          </View>
        </View>
        <View style={styles.letterRow}>
          <View style={ styles.flatListLetters }>
            { this.renderLetterGrid() }
          </View>
        </View>
      </ScrollView>
    );
  }
}


MemoryLettersScreen.navigationOptions = {};

export default withNavigationFocus(MemoryLettersScreen);


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
  rowFlatListLetters: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
  },
  columnFlatListLetters: {
    alignItems: 'center',
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

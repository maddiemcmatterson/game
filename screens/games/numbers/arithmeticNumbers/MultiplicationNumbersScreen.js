import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, ScrollView, Vibration, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from '@expo/vector-icons';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';
import InstructionsModalContent from '../../modals/InstructionsModalContent';
import SuccessModalContent from '../../modals/SuccessModalContent';
import { BaseNumbersScreen } from './BaseNumbersScreen';


const MULTIPLICATION = 'x';

class MultiplicationNumbersScreen extends BaseNumbersScreen {

  constructor(props) {
    super(props, MULTIPLICATION);
    this.state = {
      difficultyOptions: [
        {id: 1, difficulty: 'Easy', size: 2, min: 1, max: 5},
        {id: 2, difficulty: 'Medium', size: 2, min: 3, max: 7},
        {id: 3, difficulty: 'Hard', size: 2, min:0, max:10}],
      activeDifficultyOptionId: 1,
      operation: MULTIPLICATION,
      gameInitialize: false,
      successVisible: false,
      instructionsVisible: false,
      instructions: 'Select the Correct Number to Complete the Equation...',
      showNumberLine: false,
      showDots: true,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  componentDidUpdate() {
  }

  getDifficultyOption(id=this.state.activeDifficultyOptionId) {
    for(var option of this.state.difficultyOptions) {
      if (option.id === id) {
        return option;
      }
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
        key={ option.id }
        style={ styles.choiceButton }
        onPress={() =>  this.setDifficulty(option.id)}>
        <Text key={ option.id }>{ option.difficulty }</Text>
      </TouchableOpacity>
      );
  }

  toggleInstructionsModal() {
    this.setState(
      { instructionsVisible: !this.state.instructionsVisible }
    );
  }

  toggleSuccessModal() {
    this.setState(
      { successVisible: !this.state.successVisible }
    );
  }

  resetGame() {
    this.initializeGame();
  }

  getRandomNumber(min, max) {
    return GameUtils.getRandomInt(min, max);
  }

  getRandomNumbers(size, min, max) {
    var numbers = [];
    for(var i=0; i<size; i++) {
      numbers.push(GameUtils.getRandomInt(min, max));
    }
    return numbers
  }

  calculateSolution(numbers){
    return numbers[0] * numbers[1];
  }

  initializeGame() {
    var currentOption =
      this.getDifficultyOption(
        this.state.activeDifficultyOptionId
      );
    var numbers =
      this.getRandomNumbers(
        currentOption.size,
        currentOption.min,
        currentOption.max
      );
    
    var solution = this.calculateSolution(numbers);

    this.setState({
      numbers: numbers,
      solution: solution,
      gameInitialize: true,
    });
  }

  isActiveNumber(val) {
    var numbers = this.state.numbers;
    return numbers.includes(val);
  }

  checkSolution(val) {
    if (val === this.state.solution) {
      this.toggleSuccessModal();
      this.resetGame();
    } else {
      Vibration.vibrate();
    }
  }

  getRandomOptionsMultiplication(solution, minOption, maxOption) {
    return [
      Math.abs(solution - GameUtils.getRandomInt(minOption, maxOption)),
      solution + GameUtils.getRandomInt(minOption, maxOption)
    ];
  }

  generateSolutionOptions() {
    var numbers = this.state.numbers;
    var solution = this.state.solution;
    var currentOption = this.getDifficultyOption();

    var minOption = currentOption.min;
    var maxOption = currentOption.max;

    var generatingFunction = this.getRandomOptionsMultiplication;

    var options = generatingFunction(solution, minOption, maxOption);
    while (options.includes(solution) || !GameUtils.uniqueArrayValues(options) ) {
      options = generatingFunction(solution, minOption, maxOption);
    }

    options.push(solution)
    return GameUtils.randomizeArray(options);
  }

  renderSolutionOption() {
    var solutions = this.generateSolutionOptions();
    return (
      <View style={styles.numberLineContainer}>

        <View style={styles.rowFlatListNumbers}>
          {solutions.map( val =>
            <TouchableOpacity
              key={ val }
              style={ styles.solutionButton }
              onPress={() =>  this.checkSolution(val)}
            >
              <Text key={ val }>
              { val }
              </Text>
            </TouchableOpacity>
            )}
        </View>
      </View>
    );
  }

  renderSolutionOptions() {
    return (
      <View style={styles.solutionOptionsContainer}>
        <View style={styles.rowFlatListSolutionOptions}>
          { this.renderSolutionOption() }
        </View>
      </View>
    );
  }

  renderDotRow(rowLength) {
    return (
      <Text>
        { [...Array(rowLength).keys()].map(val => {
          return (<Text><Ionicons name='ios-globe' size={'16'}/></Text>);
        })}
      </Text>
    );
  }

  renderDotGroup() {
    var numbers = this.state.numbers;
    return (
      <View style={styles.subtitle}>
          { [...Array(numbers[0]).keys()].map(val =>
            { return (
                <View style={styles.dotRow}>
                  { this.renderDotRow(numbers[1]) }
                </View>
              );
            }
          )}
      </View>
    );
  }

  renderDots() {
    return (
      <View style={styles.dotGroups}>
        { this.renderDotGroup() }
      </View>
    );
  }

  renderVisualAid() {
   return this.renderDots();
 }

  renderEquation() {
    var operation = this.state.operation;
    var numbers = this.state.numbers;    
    return (
      <View>
        <Text style={styles.equation}>
          { [numbers[0], operation, numbers[1], '=', '?'].join(' ') }
        </Text>
      </View>
    );
  }

  render() {

    if (!this.state.gameInitialize) {
      return (<View></View>);
    }

    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.successVisible}
          onRequestClose={() => { }}>
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
        <View style={styles.equationBody}>
          <View style={ styles.numberLine }>
            { this.renderVisualAid() }
          </View>
          <View style={ styles.equationView }>
            { this.renderEquation() }
          </View>
          <View style={ styles.flatListLetters }>
            { this.renderSolutionOptions() }
          </View>
        </View>
      </ScrollView>
    );
  }
}


MultiplicationNumbersScreen.navigationOptions = {};

export default withNavigationFocus(MultiplicationNumbersScreen);


const styles = StyleSheet.create({

  container: {
    backgroundColor: 'floralwhite',
    flex: 1,
  },
  flatList:{
    textAlignVertical: 'top',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
    borderBottomColor: '#faf0e6',
    borderBottomWidth: 2,
    minHeight: 100,
  },
  dotGroups: {
    textAlignVertical: 'top',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
    minHeight: '20%',
  },
  dotRow: {
    flexDirection: 'column',
    backgroundColor: 'floralwhite',
    marginHorizontal: 25,
    minWidth: 50,
  },
  rowFlatListNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlatListSolutionOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choiceButton: {
    backgroundColor: '#faf0e6',
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    minHeight: '10%',
  },
  solutionButton: {
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
  numberLineContainer: {
    alignItems: 'center',
  },
  numberLineTitle: {
    fontSize: 14,
    marginBottom: 10,
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
  numberLine: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'floralwhite',
  },
  equationView: {
    margin: 60,
  },
  equation: {
    fontSize: 60,
  },
  equationBody: {
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

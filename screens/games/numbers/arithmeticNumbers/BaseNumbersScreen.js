import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, ScrollView, Vibration, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from '@expo/vector-icons';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';
import InstructionsModalContent from '../../modals/InstructionsModalContent';
import SuccessModalContent from '../../modals/SuccessModalContent';

const ADDITION = '+';
const SUBTRACTION = '-';
const MULTIPLICATION = 'x';
const DIVISION = '/';

const MAX_HOR_DOT_COUNT = 5;

export class BaseNumbersScreen extends React.Component {

  constructor(props, operation) {
    super(props);
    this.state = {
      difficultyOptions: this.props.difficultyOptions,
      activeDifficultyOptionId: 1,
      numbers: null,
      solution: null,
      operation: operation,
      gameInitialize: false,
      instructions: 'Select the Correct Number to Complete the Equation...',
      showNumberLine: false,
      showDots: false,
    };

    this.toggleInstructionsModal = this.toggleInstructionsModal.bind(this);
    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.renderSolutionOptions = this.renderSolutionOptions.bind(this);
    this.renderEquation = this.renderEquation.bind(this);
    this.renderVisualAid = this.renderVisualAid.bind(this);
    this.renderSolutionOption = this.renderSolutionOption.bind(this);
    this.resetGame = this.resetGame.bind(this);
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
    if (this.state.operation === ADDITION) {
      return numbers[0] + numbers[1];
    }
    else if (this.state.operation === SUBTRACTION) {
      return numbers[0] - numbers[1];
    }
    else if (this.state.operation === MULTIPLICATION) {
      return numbers[0] * numbers[1];
    }
    else if (this.state.operation === DIVISION) {
      return GameUtils.getRandomInt();
    }
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
    
    var orderedNumbers = numbers[0] > numbers[1] ? numbers : numbers.reverse();
    var solution = this.calculateSolution(orderedNumbers);
    
    if (this.state.operation === SUBTRACTION) {
      orderedNumbers[0] = solution + orderedNumbers[1]
    }

    else if (this.state.operation === DIVISION) {
      orderedNumbers[0] = solution * orderedNumbers[1];
    }

    this.setState({
      numbers: orderedNumbers,
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

  getRandomOptionsAddition(solution, minOption, maxOption) {
    return [
      solution + GameUtils.getRandomInt(minOption, maxOption),
      solution + GameUtils.getRandomInt(minOption, maxOption)
    ];
  }

  getRandomOptionsSubtraction(solution, minOption, maxOption) {
    return [
      Math.abs(solution - GameUtils.getRandomInt(minOption, maxOption)),
      solution + GameUtils.getRandomInt(minOption, maxOption)
    ];
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

    var generatingFunction = null;
    if (this.state.operation === ADDITION) {
      generatingFunction = this.getRandomOptionsAddition;
    } else if (this.state.operation === SUBTRACTION) {
      generatingFunction = this.getRandomOptionsSubtraction;
    } else if (this.state.operation === MULTIPLICATION) {
      generatingFunction = this.getRandomOptionsMultiplication;
    }

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

renderNumberLine() {
  var numbers = [];
    for (var i = 0; i <= 20; i++) {
      numbers.push(i);
    }

  return (
      <View style={styles.numberLineContainer}>
        <View>
          <Text style={styles.numberLineTitle}> Number Line </Text>
        </View>
        <View style={styles.rowFlatListNumbers}>
          {numbers.map( val =>
            <Text
              style={{
                fontSize: this.isActiveNumber(val) ? 16: 12,
                margin: 2,
                color: this.isActiveNumber(val) ? 'red': 'black'
              }}
              key={ val }
            >
              { val }
            </Text> )}
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

renderDotGroup(number) {
  return (
    <View style={styles.subtitle}>
      <Text>{ number }</Text>
        { [...Array(number <= MAX_HOR_DOT_COUNT ? 1 : Math.floor( (number / MAX_HOR_DOT_COUNT) + 0.5)).keys()].map(val =>
          {
            var dotsLeft = number - val * MAX_HOR_DOT_COUNT;
            var rowLength = dotsLeft > MAX_HOR_DOT_COUNT ? MAX_HOR_DOT_COUNT : dotsLeft;
            return (
              <View style={styles.dotRow}>
                { this.renderDotRow(rowLength) }
              </View>
            );
          }
        )}
    </View>
  );
}

renderDots() {
  var numbers = this.state.numbers;
  return (
      <View style={styles.dotGroups}>{ numbers.map(val => this.renderDotGroup(val)) }</View>
    );
}

renderVisualAid() {
    if (this.state.showNumberLine & !this.state.showDots) {
      return this.renderNumberLine();
    } else if (!this.state.showNumberLine & this.state.showDots) {
      return this.renderDots();
    } else {
      return (<View></View>);
    }
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
    minHeight: '25%',
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
    minWidth: '10%',
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

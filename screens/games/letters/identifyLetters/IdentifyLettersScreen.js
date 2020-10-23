import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigationFocus } from 'react-navigation';
import * as Speech from 'expo-speech';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';
import InstructionsModalContent from '../../modals/InstructionsModalContent';
import SuccessModalContent from '../../modals/SuccessModalContent';
import * as Font from 'expo-font';


const KEY_SEP = ':';

class IdentifyLettersScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      letterCountOptions: [
        {id:4, difficulty: 'Easy'},
        {id:5, difficulty: 'Medium'},
        {id:6, difficulty: 'Hard'}],
      activeLetterCount: 4,
      correctLetterId: null,
      currentLetters: null,
      lowerCase: false,
      successVisible: false,
      instructionsVisible: true,
      instructions: 'Select the Letter that Matches the Sound...',
    };

    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.toggleInstructionsModal = this.toggleInstructionsModal.bind(this);
  }

  componentDidMount() {
    this.getRandomLetters();
    this.pickCorrectLetterId();
  }

  componentDidUpdate() {
    if (this.state.currentLetters === null) {
      this.getRandomLetters();
      this.pickCorrectLetterId();
    }
  }

  speak() {
    console.log(this.state.currentLetters);
    Speech.speak("d");
  }

  getRandomLetters() {
    var array = GameUtils.getUniqueRandomLetters(this.state.activeLetterCount);
    this.setState({ currentLetters: array });
  }

  pickCorrectLetterId() {
    this.setState({ correctLetterId: String(GameUtils.getRandomInt(0, this.state.activeLetterCount))});
  }

  setActiveCount(val) {
    this.setState({
      activeLetterCount: val,
      currentLetters: null
    });
  }

  buildKey(id, letter, upperCase) {
    return [id.toString(), upperCase.toString(), letter].join(KEY_SEP);
  }

  checkChoice(key) {
    var id = key.split(KEY_SEP)[0];
    if (id === this.state.correctLetterId) {
      this.setState({ successVisible: true });
    }
  }

  renderLetter(id, letter, upperCase) {

    var key = this.buildKey(id, letter, upperCase);

    return (
      <TouchableOpacity
        key={ key }
        style={{
          backgroundColor: '#faf0e6',
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginVertical: 20,
          marginHorizontal: 5,
          borderRadius: 5,
          minWidth: 50,
          alignItems: 'center',
        }}
        onPress={(event) => {
          this.checkChoice(key);
        }}
      >
        <View key={ key }>
          <Text key={ key } style={{ fontSize: 18}}>
            { upperCase ? letter.toUpperCase() : letter }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  toggleSuccessModal() {
    this.setState({ successVisible: !this.state.successVisible });
  }

  toggleInstructionsModal() {
    this.setState({ instructionsVisible: !this.state.instructionsVisible });
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
        <View>
          <Button title="Press to hear some words" onPress={this.speak} />
        </View>
        <View style={styles.letterRow}>
          <View style={ styles.flatListLetters }>
            { this.state.currentLetters.map( letterInfo => this.renderLetter(letterInfo.id, letterInfo.letter, Math.random() < 0.5)) }
          </View>
        </View>
      </ScrollView>
    );
  }
}


IdentifyLettersScreen.navigationOptions = {};

export default withNavigationFocus(IdentifyLettersScreen);


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

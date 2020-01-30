import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, ScrollView, Vibration, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../../GameIconStyle';
import Constants from '../../../../constants/Constants';
import Layout from '../../../../constants/Layout';
import * as GameUtils from '../../utils/GameUtils';
import InstructionsModalContent from '../../modals/InstructionsModalContent';
import SuccessModalContent from '../../modals/SuccessModalContent';
import { BaseNumbersScreen } from './BaseNumbersScreen';


const SUBTRACTION = '-';

class SubtractionNumbersScreen extends BaseNumbersScreen {

  constructor(props) {
    super(props, SUBTRACTION);
    this.state = {
      difficultyOptions: [
        {id: 1, difficulty: 'Easy', size: 2, min: 0, max: 5},
        {id: 2, difficulty: 'Medium', size: 2, min: 0, max: 10},
        {id: 3, difficulty: 'Hard', size: 2, min:0, max: 20}],
      activeDifficultyOptionId: 2,
      operation: SUBTRACTION,
      gameInitialize: false,
      successVisible: false,
      instructionsVisible: false,
      instructions: 'Select the Correct Number to Complete the Equation...',
      showNumberLine: false,
      showDots: true,
    };
  }
}


SubtractionNumbersScreen.navigationOptions = {};

export default withNavigationFocus(SubtractionNumbersScreen);

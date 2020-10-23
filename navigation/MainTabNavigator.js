import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import GameScreen from '../screens/main/GameScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import PassCodeScreen from '../screens/profiles/PassCodeScreen';
import NewProfileScreen from '../screens/profiles/NewProfileScreen';
import LettersScreen from '../screens/games/letters/LettersScreen';
import MatchLettersScreen from '../screens/games/letters/matchLetters/MatchLettersScreen';
import MemoryLettersScreen from '../screens/games/letters/memoryLetters/MemoryLettersScreen';
import IdentifyLettersScreen from '../screens/games/letters/identifyLetters/IdentifyLettersScreen';
import NumbersScreen from '../screens/games/numbers/NumbersScreen';
import AdditionNumbersScreen from '../screens/games/numbers/arithmeticNumbers/AdditionNumbersScreen';
import SubtractionNumbersScreen from '../screens/games/numbers/arithmeticNumbers/SubtractionNumbersScreen';
import MultiplicationNumbersScreen from '../screens/games/numbers/arithmeticNumbers/MultiplicationNumbersScreen';
import WordsScreen from '../screens/games/words/WordsScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Home: { screen: ProfileScreen },
    NewProfile: { screen: NewProfileScreen },
    PassCode: { screen: PassCodeScreen },
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

ProfileStack.path = '';

const GameStack = createStackNavigator(
  {
    Games: { screen: GameScreen },
    Letters: { screen: LettersScreen },
    Numbers: { screen: NumbersScreen },
    Words: { screen: WordsScreen  },
    MatchLetters: { screen: MatchLettersScreen },
    MemoryLetters: { screen: MemoryLettersScreen },
    IdentifyLetters: { screen: IdentifyLettersScreen },
    Addition: { screen: AdditionNumbersScreen },
    Subtraction: { screen: SubtractionNumbersScreen },
    Multiplication: { screen: MultiplicationNumbersScreen }
  },
  config
);

GameStack.navigationOptions = {
  tabBarLabel: 'Games',
tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'} />
  ),
};

GameStack.path = '';


const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';


const tabNavigator = createBottomTabNavigator({
  ProfileStack,
  GameStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;

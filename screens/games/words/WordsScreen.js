import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import GameIconStyle from '../GameIconStyle';

class WordsScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	componentDidMont() {}

	componentDidUpdate() {}

    render() {

    return (
      <View style={GameIconStyle.container}>
        <Text style={GameIconStyle.heading}>Word Games</Text>
      </View>
    )
  }
 }

WordsScreen.navigationOptions = {};

export default withNavigationFocus(WordsScreen);
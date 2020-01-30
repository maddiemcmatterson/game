import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Layout from '../../../constants/Layout';


export default class InstructionsModalContent extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {

		return (
	    <View style={styles.instructionsModalView}>
	      <Text style={ styles.instructionTitle } >INSTRUCTIONS:</Text>
	      <Text style={ styles.instructions }>{ this.props.instructions }</Text>
	      <View>
	        <TouchableOpacity onPress={ this.props.toggleInstructionsModal } style={styles.buttonPress}>
	          <Icon
	            name='ios-thumbs-up'
	            color='red'
	            size={50}/>
	        </TouchableOpacity>              
	      </View>
	    </View>
	  );
	}
}


const styles = StyleSheet.create({

  instructionTitle:{
    fontSize: 18,
    marginTop: 0.05*Layout.window.height,
  },
  instructions:{
    margin: 0.025*Layout.window.height,
  },
  instructionsModalView: {
    alignItems: 'center',
    marginTop: 0.33*Layout.window.height,
  },
});
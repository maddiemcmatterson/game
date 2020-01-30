import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Layout from '../../../constants/Layout';


export default class SuccessModalContent extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {

    return (
      <View style={styles.successModalView}>
        <Text style={styles.successTitle} >Great Job!</Text>
        <View>
          <TouchableOpacity onPress={this.props.toggleSuccessModal} style={styles.buttonPress}>
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

  successTitle:{
    fontSize: 18,
    margin: 0.025*Layout.window.height,
  },
  successModalView: {
    alignItems: 'center',
    marginTop: 0.33*Layout.window.height,
  },
});
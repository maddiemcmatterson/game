import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../constants/Layout';
import Picture from 'Picture';


class Pictures extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: null
    };

    this.imagePress = this.imagePress.bind(this);
  }

  imagePress() {
    console.log('IMAGE PRESS...');
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          { this.state.pictures.map( picture =>
            <Picture key={ picture.node.image.uri } picture = { picture }>
          )}
        </ScrollView>
        <Text style={styles.name}> { this.props.profile.firstName } { this.props.profile.lastName } </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  profileImage: {
    height: 0.15*Layout.window.height,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginTop: 0.015*Layout.window.height,
  },

  profileImagePress: {
  },
  
  name: {
    fontSize: 18,
  },

});

export default withNavigationFocus(Pictures);


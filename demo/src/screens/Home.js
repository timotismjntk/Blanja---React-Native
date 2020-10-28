/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.text}> Home </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

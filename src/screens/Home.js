/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, StatusBar, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import components
import NewProduct from '../components/NewProduct';
import PopularProduct from '../components/PopularProduct';

import ImageBackground from '../assets/blanjaHomepage.png';

export default class Home extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          {/* <StatusBar translucent backgroundColor="transparent" /> */}
          <View style={styles.parent}>
            <Image source={ImageBackground} />
          </View>
          <View style={styles.titleParent}>
            <Text style={styles.title}>Fashion sale</Text>
          </View>
          <View style={styles.slider}>
            <NewProduct />
            <PopularProduct />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    parent: {
        bottom: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleParent: {
      position: 'absolute',
      top: 50,
      left: 10,
      width: 200,
      transform: [
        { translateY: 300 },
      ],
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'white',
    },
    slider: {
      marginBottom: 30,
    },
});

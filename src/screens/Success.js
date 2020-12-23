/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, ScrollView, Text, Dimensions, StyleSheet, Image} from 'react-native';

import Logo from '../assets/SuccessImage.png';

export default function Success(props) {
  const navigateToHome = () => {
    props.navigation.navigate('Home');
  };

  return (
      <ScrollView contentContainerStyle={styles.parent}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Success!</Text>
          <Text style={styles.textTitle}>
            Your order will be delivered soon.
          </Text>
          <Text style={styles.textTitle}>
            Thank you for choosing our app!
          </Text>
          <TouchableOpacity style={styles.btn} onPress={navigateToHome}>
            <Text style={styles.btnText}>Continue shopping</Text>
          </TouchableOpacity>
        </View>
        <Image source={Logo} style={styles.logo} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
      position: 'absolute',
      top: 50,
      zIndex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red',
    },
    textHeader: {
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    textTitle: {
      // flexWrap: 'wrap',
      // width: 250,
      fontSize: 16,
      fontWeight: 'bold',
    },
    logo: {
        flex: 1,
        resizeMode: 'stretch',
        // width: windowWidth + 500,
        // height: 100,
    },
    btn: {
      backgroundColor: '#DB3022',
      width: 160,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      marginTop: 20,
    },
    btnText: {
      color: 'white',
    },
});

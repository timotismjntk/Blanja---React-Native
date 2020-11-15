/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StatusBar, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/blanja.png';

export default function SplashScreen() {
  const navigation = useNavigation();
  // setTimeout(() =>{
  //     navigation.navigate('Login');
  // }, 2000);

  return (
    <View style={styles.parent}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={Logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    logo: {
        width: 71.69,
        height: 100,
    },
});

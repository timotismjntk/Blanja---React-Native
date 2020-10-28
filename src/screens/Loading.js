/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Logo from '../assets/blanja.png';

export default function Loading() {
  return (
    <View style={styles.parent}>
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

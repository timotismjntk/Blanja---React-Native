/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet} from 'react-native';

import Logo from '../assets/leftArrow.png';

export default function Header() {
  return <Image style={styles.leftBack} source={Logo} />;
}

const styles = StyleSheet.create({
    leftBack: {
        width: 15,
        height: 20,
        resizeMode: 'contain',
    },
});

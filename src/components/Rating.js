/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';

import yellow from '../assets/StarYellow.png';
import grey from '../assets/StarG.png';

export default function Rating(props) {
  return (
    <View style={styles.ratingStars}>
      {[...Array(5)].map((el, i) => {
        if (i + 1 <= Math.round(props.number)) {
          return <Image source={yellow} alt="yellow" />
        } else {
          return <Image source={grey} alt="grey" />
        }
      })}
        <Text style={styles.count}>({props.number})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    ratingStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        color: 'grey',
        marginLeft: 3,
    },
});

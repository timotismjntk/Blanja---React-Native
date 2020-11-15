/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Example() {
  const refRBSheet = useRef();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View>
          <TouchableOpacity>XS</TouchableOpacity>
          <TouchableOpacity>S</TouchableOpacity>
          <TouchableOpacity>M</TouchableOpacity>
          <TouchableOpacity>L</TouchableOpacity>
          <TouchableOpacity>XL</TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

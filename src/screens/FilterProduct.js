/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';

const data = [
  {
    id: 1,
    hex: '#000000',
  },
  {
    id: 2,
    hex: '#F6F6F6',
  },
  {
    id: 3,
    hex: '#B82222',
  },
  {
    id: 4,
    hex: '#BEA9A9',
  },
  {
    id: 5,
    hex: '#E2BB8D',
  },
  {
    id: 6,
    hex: '#151867',
  },
];

const FilterProduct = () => {
  const [selectedId, setSelectedId] = useState([]);
  const a = [];
  let b = {}
  const checkBox = ({item, onPress, style}) => (
    <TouchableOpacity
      style={
        item.id === selectedId
          ? [styles.wrapper]
          : {marginTop: 4, marginLeft: 5}
      }
      onPress={() => {
        setSelectedId(item.id);
        a.push({...a, ...[item.id]});
        b = {
          a,
        };
        console.log(a);
      }}>
      <View style={[styles.myCheckBox, {backgroundColor: item.hex}]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Colors</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={checkBox}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          marginVertical: 15,
          backgroundColor: 'white',
          paddingVertical: 25,
          paddingHorizontal: 10,
        }}
      />
      <Text style={styles.title}>Sizes</Text>
    </View>
  );
};

export default FilterProduct;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  wrapper: {
    // marginTop: 20,
    marginLeft: 1,
    marginRight: -4,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: '#DB3022',
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  myCheckBox: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
  },
});

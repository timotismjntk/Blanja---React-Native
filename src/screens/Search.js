/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';


const listItem = [
    {
      id: 1,
      name: 'Tops',
    },
    {
      id: 2,
      name: 'Blouses',
    },
    {
      id: 3,
      name: 'Sweaters',
    },
    {
      id: 4,
      name: 'Knitwear',
    },
    {
      id: 5,
      name: 'Jeans',
    },
    {
      id: 6,
      name: 'Shorts',
    },
    {
      id: 7,
      name: 'Shorts',
    },
    {
      id: 8,
      name: 'Shorts',
    },
    {
      id: 9,
      name: 'Shorts',
    },
    {
      id: 10,
      name: 'Shorts',
    },
  ];

  const Item = ({ item, onPress, style }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Recent search</Text>
      {/* <View style={{paddingRight: 10, width: '100%'}}> */}
        <FlatList
            data={listItem}
            renderItem={Item}
            keyExtractor={(item) => item.id}
            // extraData={selectedId}
            // horizontal
            numColumns={4}
            horizontal={false}
            contentContainerStyle={{ marginRight: 10, paddingTop: 20 }}
        />
      {/* </View> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    Header: {
       fontSize: 16,
       fontWeight: 'bold',
    },
    item: {
        height: 30,
        width: 70,
        borderWidth: 1,
        borderColor: '#DB3022',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
    },
    title: {
        color: '#DB3022',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

import React, {Keyboard} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const listItem = [
  {
    id: 1,
    name: 'Shorts',
  },
  {
    id: 2,
    name: 'shoes',
  },
  {
    id: 3,
    name: 'jacket',
  },
  {
    id: 4,
    name: 'laptop',
  },
  {
    id: 5,
    name: 'handphone',
  },
  {
    id: 6,
    name: 'Shorts',
  },
];

const Search = (props) => {
  const searchHandler = (value) => {
    props.navigation.navigate('Shop', {
      screen: 'Catalog',
      params: {
        id: 1,
        search: value,
        categoryName: value,
      },
    });
  };

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={() => searchHandler(item.name)}
      style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Text style={styles.Header}>Top search</Text>
      <FlatList
        data={listItem}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        numColumns={4}
        horizontal={false}
        contentContainerStyle={{marginRight: 10, paddingTop: 20}}
      />
      {/* </View> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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

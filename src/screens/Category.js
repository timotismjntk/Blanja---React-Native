import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

// import Action
import ProductCategoryAction from '../redux/actions/categoryProduct';

const Category = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductCategoryAction.getCatProduct()).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gotoCategoryByName = (value) => {
    props.navigation.navigate('Catalog', {
      categoryName: value,
    });
  };

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={() => gotoCategoryByName(item.category_name)}
      style={[styles.item, style]}>
      <Text style={styles.title}>{item.category_name}</Text>
    </TouchableOpacity>
  );

  const navigateToCatalog = () =>
    props.navigation.navigate('Catalog', {search: '', categoryName: ''});

  const productState = useSelector((state) => state.categoryProduct);

  const {data, isLoading, isError} = productState;
  return (
    <View style={styles.container}>
      <View style={styles.btnParent}>
        <TouchableOpacity style={styles.btn} onPress={navigateToCatalog}>
          <Text style={styles.btnText}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryTextParent}>
        <Text style={styles.categoryText}>Choose category</Text>
      </View>
      <FlatList
        data={data}
        renderItem={Item}
        keyExtractor={(item) => item.id.toString()}
        // extraData={selectedId}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: StatusBar.currentHeight + 20 || 0,
    marginBottom: 35,
  },
  item: {
    padding: 18,
    paddingLeft: 35,
    borderBottomWidth: 0.4,
    borderBottomColor: '#9B9B9B',
    //   marginVertical: 8,
    //   marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  btnParent: {
    padding: 20,
  },
  btn: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#DB3022',
  },
  btnText: {
    color: 'white',
  },
  categoryTextParent: {
    marginLeft: 18,
  },
  categoryText: {
    color: 'grey',
    marginTop: 10,
  },
});

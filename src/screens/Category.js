/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {View, ScrollView, Dimensions , StatusBar, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const windowHeight = Dimensions.get('window').height;

// import Action
import ProductCategoryAction from '../redux/actions/categoryProduct';

const listItem = [
  {
    id: 1,
    name: 'Tops',
  },
  {
    id: 2,
    name: 'Shirts & Blouses',
  },
  {
    id: 3,
    name: 'Cardigans & Sweaters',
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
      <Text style={styles.title}>{item.category_name}</Text>
    </TouchableOpacity>
  );

const Category = (props) => {
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(ProductCategoryAction.getCatProduct());
    }, [dispatch]);

    const productState = useSelector(state=>state.categoryProduct);

    const {data, isLoading, isError} = productState;
  return (
    <View style={styles.container}>
        <View style={styles.btnParent}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>VIEW ALL ITEMS</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.categoryTextParent}>
            <Text style={styles.categoryText}>Choose category</Text>
        </View>
        <FlatList
            data={data}
            renderItem={Item}
            keyExtractor={(item) => item.id}
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
        width:'100%',
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

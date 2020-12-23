/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import Products from '../assets/photo.png';

import Rating from './Rating';

import popularProductAction from '../redux/actions/popularProduct';
import {API_URL} from '@env';

// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

// const items = [
//     {
//         title:'Item 1',
//         text: 'Text 1',
//         image: Products,
//         storeName: 'Zalora',
//         productName: 'Blouse',
//         price: '3000',
//     },
//     {
//         title:'Item 2',
//         text: 'Text 2',
//         image: Products,
//         storeName: 'Zalora',
//         productName: 'Blouse',
//         price: '3000',
//     },
//     {
//         title:'Item 3',
//         text: 'Text 3',
//         image: Products,
//         storeName: 'Zalora',
//         productName: 'Blouse',
//         price: '3000',
//     },
//     {
//         title:'Item 4',
//         text: 'Text 4',
//         image: Products,
//         storeName: 'Zalora',
//         productName: 'Blouse',
//         price: '3000',
//     },
//     {
//         title:'Item 5',
//         text: 'Text 5',
//         image: Products,
//         storeName: 'Zalora',
//         productName: 'Blouse',
//         price: '3000',
//     },
//   ];

export default function PopularProduct() {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(popularProductAction.getPopularProduct()).catch((err) =>
        console.log(err.message),
      );
    }, [dispatch]);

    const detailProduct = (itemId, itemName) =>{
        navigation.navigate('ProductDetail', {
            id: itemId,
            title: itemName,
        });
    };
    const productState = useSelector(state=>state.popularProduct);

    const {data} = productState;

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={item.id.toString().concat(item.name)} onPress={()=>{detailProduct(item.id, item.category_name)}}>
                <View style={styles.card}>
                    <Image source={{uri: API_URL + item.url}} style={styles.image} />
                    <View style={styles.cardContainer}>
                        <Rating number={item.total_rating} />
                        <Text style={styles.store}>{item.store_name ? item.store_name : 'Zalora'}</Text>
                        <Text style={styles.product}>{item.name.length > 30 ? item.name.slice(0, 25) + '...' : item.name}</Text>
                        <Text style={styles.price}>{convertToRupiah(item.price)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const viewAll = () =>{
        navigation.navigate('Shop', {
            screen: 'Catalog',
            params: {
              id: 1,
              search: '',
              categoryName: 'Popular',
            },
        });
    };

  return (
    <View>
        <View style={styles.parent}>
            <View style={styles.text}>
                <Text style={styles.textNew}>Popular</Text>
                <TouchableOpacity onPress={viewAll}>
                    <Text>View all</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.textInfo}>You’ve never seen it before!</Text>
        </View>
        <Carousel
        data={data.length ? data : []}
        renderItem={renderItem}
        sliderWidth={350}
        itemWidth={150}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    parent: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 25,
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textNew: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    textInfo: {
        color: 'grey',
    },
    card: {
        height: 300,
        width: 150,
        borderRadius: 10,
        left: -90,
        marginRight: 10,
    },
    cardContainer: {
        marginTop: 3,
        padding: 5,
        flex: 1,
    },
    store: {
        color: 'grey',
        fontSize: 11,
    },
    product: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
    },
    image: {
        width: 148,
        height: 184,
        borderRadius: 2,
        resizeMode: 'contain',
    },
});

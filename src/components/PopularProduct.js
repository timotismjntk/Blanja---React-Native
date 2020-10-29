/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Products from '../assets/photo.png';

import Rating from './Rating';

const renderItem = ({item, index}) => {
    return (
        <View style={styles.card}>
            <Image source={item.image} alt="popular" />
            <View style={styles.cardContainer}>
                <Rating number={0} />
                <Text style={styles.store}>{item.storeName}</Text>
                <Text style={styles.product}>{item.productName}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    );
};
const items = [
    {
        title:'Item 1',
        text: 'Text 1',
        image: Products,
        storeName: 'Zalora',
        productName: 'Blouse',
        price: '3000',
    },
    {
        title:'Item 2',
        text: 'Text 2',
        image: Products,
        storeName: 'Zalora',
        productName: 'Blouse',
        price: '3000',
    },
    {
        title:'Item 3',
        text: 'Text 3',
        image: Products,
        storeName: 'Zalora',
        productName: 'Blouse',
        price: '3000',
    },
    {
        title:'Item 4',
        text: 'Text 4',
        image: Products,
        storeName: 'Zalora',
        productName: 'Blouse',
        price: '3000',
    },
    {
        title:'Item 5',
        text: 'Text 5',
        image: Products,
        storeName: 'Zalora',
        productName: 'Blouse',
        price: '3000',
    },
  ];

export default function PopularProduct(props) {
  return (
    <View>
        <View style={styles.parent}>
            <View style={styles.text}>
                <Text style={styles.textNew}>Popular</Text>
                <Text>View all</Text>
            </View>
            <Text style={styles.textInfo}>You’ve never seen it before!</Text>
        </View>
        <Carousel
        data={items}
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
});

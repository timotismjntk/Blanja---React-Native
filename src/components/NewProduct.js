/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, StyleSheet, Alert, TouchableOpacity} from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import Products from '../assets/photo.png';

import Rating from './Rating';

import newProductAction from '../redux/actions/newProduct';
import {API_URL} from '@env';
// import getDetailProductIdAction from '../redux/actions/detailProduct';


// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

export default function NewProduct(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const [id, setId] = useState(1);

    useEffect(()=>{
        dispatch(newProductAction.getNewProduct()).catch((err) =>
        console.log(err.message),
      );
    }, [dispatch]);

    const detailProduct = (itemId, itemName) =>{
        navigation.navigate('ProductDetail', {
            id: itemId,
            title: itemName,
        });
        // console.log(props);
        // Alert.alert(itemId)
    };
    const productState = useSelector(state=>state.NewProduct);

    const {data} = productState;
    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={item.id.toString().concat(item.name)} onPress={()=>{detailProduct(item.id, item.name)}}>
                <View style={styles.card}>
                    <View style={styles.pill}>
                        <Text style={styles.productConditions}>{item.condition_name !== 'New' ? 'New' : 'New'}</Text>
                    </View>
                    <Image source={{uri: API_URL + item.url}} style={styles.image} />
                    <View style={styles.cardContainer}>
                        <Rating number={item.total_rating} />
                        <Text style={styles.store}>Zalora</Text>
                        <Text style={styles.product}>{item.name}</Text>
                        <Text style={styles.price}>{convertToRupiah(item.price)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            );
        };
  return (
    <View>
        <View style={styles.parent}>
            <View style={styles.text}>
                <Text style={styles.textNew}>New</Text>
                <Text>View all</Text>
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
    pill: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 40,
        height: 24,
        margin: 8,
        marginTop: 30,
        backgroundColor: 'black',
        zIndex: 3,
    },
    productConditions: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 11,
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

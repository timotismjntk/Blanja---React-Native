/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Platform, ScrollView, Alert, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import image
import profile from '../assets/profile.png';

export default function Myprofile(props) {
    const orderDetailHandler = () =>{
        props.navigation.navigate('OrderDetail');
    };
    const toProfile = () =>{
        props.navigation.navigate('Profile');
    };
  return (
    <ScrollView style={styles.container}>
        {/* <View style={{flexDirection: 'row', padding: 0, justifyContent: 'space-between', marginTop: 35, marginBottom: 30}}>
            <TouchableOpacity onPress={toProfile}>
                <Icon name="chevron-left" size={35} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="magnify" size={30} />
            </TouchableOpacity>
        </View> */}
        <View style={{paddingLeft: 10, paddingRight: 10}}>
            <Text style={styles.header}>My Orders</Text>
        </View>
        <View style={styles.card}>
            <TouchableOpacity onPress={orderDetailHandler}>
                <View style={styles.orderTitle}>
                    <Text style={styles.subOrder}>Order №1947034</Text>
                    <Text style={styles.orderDate}>05-12-2019</Text>
                </View>
                <View style={styles.trackingTitle}>
                    <Text style={styles.info}>Tracking number:</Text>
                    <Text style={styles.value}>IW3475453455</Text>
                </View>
                <View style={styles.quantityTitle}>
                    <Text style={styles.info}>Quantity:</Text>
                    <Text style={styles.value}>3</Text>
                </View>
                <View style={styles.amoutTitle}>
                    <Text style={styles.info}>Total Amount:</Text>
                    <Text style={styles.value}>1120</Text>
                </View>
                <View style={styles.deliverTitle}>
                    <Text style={styles.deliverSub}>Delivered</Text>
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        padding: 10,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    card: {
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    orderTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subOrder: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderDate: {
        fontSize: 14,
        color: 'grey',
    },
    info: {
        fontSize: 14,
        color: 'grey',
    },
    value: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    trackingTitle: {
        flexDirection: 'row',
    },
    quantityTitle: {
        flexDirection: 'row',
    },
    amoutTitle: {
        flexDirection: 'row',
    },
    deliverTitle: {
        alignItems: 'flex-end',
    },
    deliverSub: {
        color: '#2AA952',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

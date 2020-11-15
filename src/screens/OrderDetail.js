/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Platform, ScrollView, Alert, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import image
import orderPicture from '../assets/orderPicture.png';
import BlanjaPay from '../assets/blanja.png';

export default function Myprofile() {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.orderTitle}>
            <Text style={styles.subOrder}>Order №1947034</Text>
            <Text style={styles.orderDate}>05-12-2019</Text>
        </View>
        <View style={styles.trackingTitle}>
            <View style={styles.trackingSub}>
                <Text style={styles.info}>Tracking number:</Text>
                <Text style={styles.value}>IW3475453455</Text>
            </View>
            <Text style={styles.deliverSub}>Delivered</Text>
        </View>
        <View style={styles.totalProduct}>
            <Text>3 items</Text>
        </View>
        <View style={styles.card}>
            <Image source={orderPicture} style={styles.image} />
            <View style={styles.cardSub}>
                <Text style={styles.productName}>Pullover</Text>
                <Text style={styles.storeName}>Mango</Text>
                <View style={styles.cardSubChildOne}>
                    <View style={styles.color}>
                        <Text style={styles.colorText}>Color:</Text>
                        <Text style={styles.colorValue}>Gray</Text>
                    </View>
                    <View style={styles.size}>
                        <Text style={styles.sizeText}>Size:</Text>
                        <Text style={styles.sizeValue}>L</Text>
                    </View>
                </View>
                <View style={styles.cardSubChildTwo}>
                    <View style={styles.unit}>
                        <Text style={styles.unitText}>Units:</Text>
                        <Text style={styles.unitValue}>1</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.priceText}>100</Text>
                    </View>
                </View>
            </View>
        </View>
        <Text style={styles.orderInfo}>Order information</Text>
        <View>
            <View style={styles.address}>
                <Text style={styles.text}>Shipping Address:</Text>
                <View style={styles.parentSubText}>
                    <Text style={styles.subText}>3 Newbridge Court ,Chino Hills, CA 91709, United States</Text>
                </View>
            </View>
            <View style={styles.payMethod}>
                <Text style={styles.text}>Payment method:</Text>
                <View style={styles.payContainer}>
                    <Image style={styles.icon} source={BlanjaPay} />
                    <Text style={styles.BlanjaPay}>BlanjaPay</Text>
                </View>
                <Text>**** **** **** 3947</Text>
            </View>
            <View style={styles.Delivery}>
                <Text style={styles.text}>Delivery method:</Text>
                <View style={[styles.parentSubText, styles.DeliveryText]}>
                    <Text style={styles.subText}>FedEx, 3 days, 15$</Text>
                </View>
            </View>
            <View style={styles.Discount}>
                <Text style={styles.text}>Discount:</Text>
                <View style={[styles.parentSubText, styles.DiscountText]}>
                    <Text style={styles.subText}>10%, Personal promo code</Text>
                </View>
            </View>
            <View style={styles.Amount}>
                <Text style={styles.text}>Total Amount:</Text>
                <View style={[styles.parentSubText, styles.AmountText]}>
                    <Text style={styles.subText}>500</Text>
                </View>
            </View>
        </View>
        <View style={styles.btnReOrder}>
            <TouchableOpacity style={styles.reorder}>
                <Text>Reorder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feedback}>
                <Text style={styles.feedbackText}>Leave feedback</Text>
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
        borderRadius: 15,
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        height: 104,
        width: '100%',
        flexDirection: 'row',
    },
    cardSub: {
        flex: 1,
        paddingLeft: 15,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cardSubChildOne: {
        flexDirection: 'row',
    },
    cardSubChildTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    color: {
        flexDirection: 'row',
        marginRight: 25,
        marginBottom: 5,
    },
    size: {
        flexDirection: 'row',
    },
    unit: {
        flexDirection: 'row',
    },
    subOrder: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalProduct: {
        marginTop: 10,
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
        justifyContent: 'space-between',
        marginTop: 10,
    },
    trackingSub: {
        flexDirection: 'row',
    },
    deliverSub: {
        color: '#2AA952',
        fontSize: 14,
        fontWeight: 'bold',
    },
    image: {
        width: 104,
        height: 104,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    storeName: {
        fontSize: 11,
        color: 'grey',
        marginBottom: 5,
    },
    colorText: {
        fontSize: 11,
        color: 'grey',
    },
    colorValue: {
        fontSize: 11,
    },
    sizeText: {
        fontSize: 11,
        color: 'grey',
    },
    sizeValue: {
        fontSize: 11,
    },
    unitText: {
        fontSize: 11,
        color: 'grey',
    },
    unitValue: {
        fontSize: 11,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    address: {
        flexDirection: 'row',
        marginTop: 5,
    },
    payMethod: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'grey',
    },
    subText: {
        flexWrap: 'wrap',
        paddingLeft: 10,
    },
    parentSubText: {
        flex: 1,
    },
    icon: {
        width: '100%',
        height: 30,
        resizeMode: 'contain',
    },
    BlanjaPay: {
        fontSize: 10,
        color: 'red',
    },
    payContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
    },
    Delivery: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    DeliveryText: {
        paddingLeft: 10,
    },
    Discount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    DiscountText: {
        paddingLeft: 52,
    },
    Amount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    AmountText: {
        paddingLeft: 25,
    },
    btnReOrder: {
        marginBottom: 80,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    reorder: {
        width: 160,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
    },
    feedback: {
        width: 160,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB3022',
        height: 36,
    },
    feedbackText: {
        color: 'white',
    },
});

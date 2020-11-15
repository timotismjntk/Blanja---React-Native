/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-btr';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import image
import profile from '../assets/profile.png';
import BlanjaPay from '../assets/blanja.png';

export default function Myprofile(props) {
    const [isSelected, setSelection] = useState(false);

    const makeProcess = () =>{
        props.navigation.navigate('Success');
    };
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.header}>Shipping address</Text>
        </View>
        <View style={styles.card}>
            <View style={styles.recipientContainer}>
                <Text style={styles.recipient}>Jane Doe</Text>
                <TouchableOpacity><Text style={styles.change}>Change</Text></TouchableOpacity>
            </View>
            <View style={styles.addressParent}>
                <Text style={styles.addressText}>
                    3 Newbridge Court Chino Hills,
                    CA 91709, United States
                </Text>
            </View>
        </View>
        <View style={{marginTop: 20,}}>
            <Text style={styles.header}>Payment</Text>
            <View style={styles.payMethod}>
                <View style={styles.payContainerParent}>
                    <View style={styles.payContainer}>
                        <Image style={styles.icon} source={BlanjaPay} />
                        <Text style={styles.BlanjaPay}>BlanjaPay</Text>
                    </View>
                    <Text style={styles.text}>BlanjaPay</Text>
                </View>
                <CheckBox
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    color="#009688"
                />
            </View>
        </View>
        <View style={styles.btnParent}>
          <View style={styles.amount}>
            <Text style={styles.total}>Order:</Text>
            <Text style={styles.price}>112$</Text>
          </View>
          <View style={styles.amount}>
            <Text style={styles.total}>Delivery:</Text>
            <Text style={styles.price}>15$</Text>
          </View>
          <View style={styles.amount}>
            <Text style={styles.total}>Summary:</Text>
            <Text style={styles.price}>127$</Text>
          </View>
          <TouchableOpacity onPress={makeProcess} style={styles.btnCheck}>
            <Text style={styles.checkoutText}>SUBMIT ORDER</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 25,
        flexGrow: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        backgroundColor: '#e5e5e5',
        // justifyContent: 'space-between'
    },
    search: {
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 30,
    },
    searchInput: {
        width: '100%',
        paddingLeft: 10,
        fontSize: 16,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        // borderWidth: 1,
        // borderColor: '#DB3022',
    },
    recipientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recipient: {
        fontSize: 16,
    },
    change: {
        fontSize: 14,
        color: '#DB3022',
    },
    addressText: {
        fontSize: 14,
        color: 'grey',
        flexWrap: 'wrap',
        width: '85%',
    },
    addressParent: {
        flexWrap: 'wrap',
        marginTop: 5,
    },
    btnParent: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        // marginBottom: 30,
        // backgroundColor: 'white',
        padding: 10,
        // width: '100%',
    },
    btn: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#222222',
        height: 48,
    },
    btnText: {
        color: 'black',
        fontSize: 14,
    },
    amount: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnCheck: {
        width:'100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#DB3022',
        marginTop: 15,
    },
    total: {
        color: 'grey',
    },
    checkoutText: {
        color: 'white',
    },
    payMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: 'black',
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
        marginRight: 10,
        backgroundColor: '#009688',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
    },
    payContainerParent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

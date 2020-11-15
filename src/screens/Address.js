/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Platform, ScrollView, Alert, Text, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import image
import profile from '../assets/profile.png';

// import action
import addressAction from '../redux/actions/address';

export default function Address(props) {
    const dispatch = useDispatch();

    const addressHandler = () =>{
        props.navigation.navigate('ChangeAddress');
    };
    const user = useSelector(state=>state.profile);
    const token = useSelector(state=>state.auth.token);
    useEffect(()=>{
        // alert(openModal)
        dispatch(addressAction.getPrimaryAddress(token, 1));
    }, [dispatch, token]);
    const addressState = useSelector(state=>state.address);
    const {data, isLoading} = addressState;
  return (
    <ScrollView style={styles.container}>
        <View style={styles.search}>
            <Icon name="magnify" size={20} color="grey" />
            <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <View style={{marginBottom: 10}}>
            <Text style={styles.header}>Shipping address</Text>
        </View>
        {data && <View style={styles.card}>
            <View style={styles.recipientContainer}>
                <Text style={styles.recipient}>{data.recipient_name}</Text>
                <TouchableOpacity onPress={addressHandler}><Text style={styles.change}>Change</Text></TouchableOpacity>
            </View>
            <View style={styles.addressParent}>
                <Text style={styles.addressText}>
                    {data.place}, {data.address_name}, {data.postal_code}, {data.city}
                </Text>
            </View>
        </View>}
        <View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>ADD NEW ADDRESS</Text>
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
        borderWidth: 1,
        borderColor: '#DB3022',
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
        width: '80%',
    },
    addressParent: {
        flexWrap: 'wrap',
        marginTop: 5,
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
});

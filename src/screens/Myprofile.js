/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Platform, ScrollView, StatusBar, Alert, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Thumbnail} from 'native-base';
import {store, persistor} from '../redux/store';

// import image
import profile from '../assets/profile.png';

// import actions
import profileAction from '../redux/actions/profile';
import logOutAction from '../redux/actions/auth';
import rootReducer from '../redux/reducers/index';

// import env
import {API_URL} from '@env';
import { persistStore } from 'redux-persist';
export default function Myprofile(props) {
    const dispatch = useDispatch();

    const Logout = async () =>{
        try {
            await persistor.purge();
            await persistor.purge();
            await persistor.flush();
            // persistStore(props).purge();
            setTimeout(() => persistor.purge(), 200);
            dispatch(logOutAction.logout());
            // rootReducer(undefined, {type: 'LOGOUT_USER'});
          } catch (err) {
            console.log(err.message);
          }
    };
    const token = useSelector(state=>state.auth.token);
    const user = useSelector(state=>state.profile);
    const {data, updated} = user;

  useEffect(()=>{
    dispatch(profileAction.getProfile(token));
    if (updated) {
      dispatch(profileAction.getProfile(token));
    }
  },[dispatch, token, updated]);
    const myOrderHandler = () =>{
        props.navigation.navigate('Myorder');
    };
    const addressHandler = () =>{
        props.navigation.navigate('Address');
    };
    const settingAccountHandler = () =>{
        props.navigation.navigate('Setting');
    };
    const searchHandler = () =>{
        props.navigation.navigate('Search');
    };
  return (
    <ScrollView style={styles.container}>
        {/* <StatusBar backgroundColor="blue" /> */}
        <View style={{alignItems: 'flex-end', marginTop: 35, marginBottom: 5}}>
            <TouchableOpacity onPress={searchHandler}>
                <Icon name="magnify" size={30} />
            </TouchableOpacity>
        </View>
        <View>
            <Text style={styles.header}>My profile</Text>
        </View>
        <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
                <Thumbnail source={{uri: API_URL + data.profile_picture ? data.profile_picture : `https://ui-avatars.com/api/?size=50&name=${data.name}`}} />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.email}>{data.email}</Text>
            </View>
        </View>
        <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.myOrder} onPress={myOrderHandler}>
                <View>
                    <Text style={styles.myOrderText}>My orders</Text>
                    <Text style={styles.subText}>Already have 12 orders</Text>
                </View>
                <Icon name="chevron-right" color="grey" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.myOrder} onPress={addressHandler}>
                <View>
                    <Text style={styles.myOrderText}>Shipping addresses</Text>
                    <Text style={styles.subText}>3 addresses</Text>
                </View>
                <Icon name="chevron-right" color="grey" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.myOrder} onPress={settingAccountHandler}>
                <View>
                    <Text style={styles.myOrderText}>Settings</Text>
                    <Text style={styles.subText}>Notifications, password</Text>
                </View>
                <Icon name="chevron-right" color="grey" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.myOrder} onPress={Logout}>
                <View>
                    <Text style={styles.myOrderText}>Logout</Text>
                </View>
                <Icon name="chevron-right" color="grey" size={25} />
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: 'red',
    },
    imageContainer: {
        marginTop: 25,
        marginRight: 15,
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    },
    profilePicture: {
        width: 64,
        height: 64,
        borderRadius: 150 / 2,
        resizeMode: 'contain',
    },
    profileInfo: {
        //
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: 'grey',
    },
    infoContainer: {
        marginTop: 40,
        marginBottom: 40,
    },
    myOrder: {
        width: '110%',
        borderWidth: 0.4,
        borderTopWidth: 0,
        borderColor: '#9B9B9B',
        height: 50,
        left: -10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        flexDirection: 'row',
    },
    myOrderText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    subText: {
        color: 'grey',
        fontSize: 11,
    },
});

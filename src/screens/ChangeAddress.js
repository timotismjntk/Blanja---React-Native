/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Keyboard, ScrollView, Alert, Text, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import image
import profile from '../assets/profile.png';

export default function Myprofile() {
    const [bottom, setBottom] = useState(30);
    const [bottom1, setBottom1] = useState(30);
    const [bottom2, setBottom2] = useState(30);
    const [bottom3, setBottom3] = useState(30);
    const [bottom4, setBottom4] = useState(30);
    const [bottom5, setBottom5] = useState(30);

    const [colors, setColors] = useState('grey');
    const [colors1, setColors1] = useState('grey');
    const [colors2, setColors2] = useState('grey');
    const [colors3, setColors3] = useState('grey');
    const [colors4, setColors4] = useState('grey');
    const [colors5, setColors5] = useState('grey');


    const [addressPlace, setAddressPlace] = useState('');
    const [recipientName, setRecipientName] = useState('');


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        // cleanup function
        return () => {
          Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        };
      }, []);

      const _keyboardDidShow = () => {
        setBottom(45);
      };

    const Focus = () =>{
        setBottom(45);
        setColors('#187465');
    };
    const Blur = () =>{
        if (addressPlace.length > 0) {
            setBottom(45);
        } else {
            setBottom(30);
            setColors('grey');
        }
    };
    const Focus1 = () =>{
        setBottom1(45);
        setColors1('#187465');
    };
    const Blur1 = () =>{
        if (recipientName.length > 0) {
            setBottom1(45);
        } else {
            setBottom1(30);
            setColors1('grey');
        }
    };

    const Focus2 = () =>{
        setBottom2(45);
        setColors2('#187465');
    };
    const Blur2 = () =>{
        if (recipientName.length > 0) {
            setBottom2(45);
        } else {
            setBottom2(30);
            setColors2('grey');
        }
    };
    const Focus3 = () =>{
        setBottom3(45);
        setColors3('#187465');
    };
    const Blur3 = () =>{
        if (recipientName.length > 0) {
            setBottom3(45);
        } else {
            setBottom3(30);
            setColors3('grey');
        }
    };
    const Focus4 = () =>{
        setBottom4(45);
        setColors4('#187465');
    };
    const Blur4 = () =>{
        if (recipientName.length > 0) {
            setBottom4(45);
        } else {
            setBottom4(30);
            setColors4('grey');
        }
    };
    const Focus5 = () =>{
        setBottom5(45);
        setColors5('#187465');
    };
    const Blur5 = () =>{
        if (recipientName.length > 0) {
            setBottom5(45);
        } else {
            setBottom5(30);
            setColors5('grey');
        }
    };
  return (
    <ScrollView style={styles.container}>
        <View style={styles.userAddress}>
            <View style={styles.inputParent}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom, color: colors || 'grey'}]}>Save address as (ex : home address, office address)</Text>
                <TextInput style={[styles.inputText, {color: colors, borderColor: colors}]} onChangeText={(text)=>{setAddressPlace(text);}} onFocus={Focus} onBlur={ () => Blur() } />
            </View>
            <View style={styles.inputParent}>
                <Text onFocus={Focus1} style={[styles.text, {bottom: bottom1, color: colors1}]}>Recipient’s name</Text>
                <TextInput style={[styles.inputText, {color: colors, borderColor: colors1}]} onChangeText={(text)=>{setRecipientName(text);}} onFocus={Focus1} onBlur={ () => Blur1() } />
            </View>
        </View>
        <View style={styles.userAddress}>
            <View style={styles.inputParent}>
                <Text onFocus={Focus2} style={[styles.text, {bottom: bottom2, color: colors2}]}>Address</Text>
                <TextInput style={[styles.inputText, {color: colors2, borderColor: colors2}]} onChangeText={(text)=>{setAddressPlace(text);}} onFocus={Focus2} onBlur={ () => Blur2() } />
            </View>
            <View style={styles.inputParent}>
                <Text onFocus={Focus3} style={[styles.text, {bottom: bottom3, color: colors3}]}>City or Subdistrict</Text>
                <TextInput style={[styles.inputText, {color: colors3, borderColor: colors3}]} onChangeText={(text)=>{setRecipientName(text);}} onFocus={Focus3} onBlur={ () => Blur3() } />
            </View>
            <View style={styles.inputParent}>
                <Text onFocus={Focus3} style={[styles.text, {bottom: bottom4, color: colors4}]}>Postal code</Text>
                <TextInput style={[styles.inputText, {color: colors4, borderColor: colors4}]} onChangeText={(text)=>{setRecipientName(text);}} onFocus={Focus4} onBlur={ () => Blur4() } />
            </View>
        </View>
        <View style={styles.userAddress}>
            <View style={styles.inputParent}>
                <Text onFocus={Focus5} style={[styles.text, {bottom: bottom5, color: colors5}]}>recipient's telephone number</Text>
                <TextInput style={[styles.inputText, {color: colors5, borderColor: colors5}]} onChangeText={(text)=>{setAddressPlace(text);}} onFocus={Focus5} onBlur={ () => Blur5() } />
            </View>
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>SAVE ADDRESS</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        padding: 10,
        flex: 1,
    },
    userAddress: {
        backgroundColor: 'white',
        marginTop: 20,
        paddingBottom: 10,
        borderRadius: 10,
    },
    inputParent: {
        // paddingTop: 10,
        paddingBottom: 10,
        // padding: 20,
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 15,
        // marginBottom: 25,
        // backgroundColor: 'red',
    },
    inputText: {
        fontSize: 17,
        fontWeight: '500',
        color: 'black',
        // height: 30,
        borderBottomWidth: 2,
        // position: 'relative',
        // backgroundColor: 'red',
    },
    text: {
        position: 'absolute',
        fontSize: 12,
        left: 20,
        // bottom: 30,
        zIndex: 2,
        color: 'grey',
        // top: 10,
    },
    btnContainer: {
        marginTop: 10,
    },
    btn: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DB3022',
        height: 48,
    },
    btnText: {
        color: 'white',
        fontSize: 14,
    },
});

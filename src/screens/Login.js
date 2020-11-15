/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, Image, Keyboard, TextInput, TouchableOpacity, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import loginAction from '../redux/actions/auth';

export default function Login(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bottom, setBottom] = useState(20);
    const [bottom1, setBottom1] = useState(20);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        // cleanup function
        return () => {
          Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
          Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
      }, []);

      const _keyboardDidShow = () => {
        setBottom(45);
      };
      const _keyboardDidHide = () => {
        if (email.length > 0) {
            // setBottom(45);
        } else if (email.length === 0){
            // setBottom(20);
        }
      };

    const Focus = () =>{
        setBottom(45);
    };
    const Blur = () =>{
        if (email.length > 0) {
            setBottom(45);
        } else {
            setBottom(20);
        }
    };
    const Focus1 = () =>{
        setBottom1(45);
    };
    const Blur1 = () =>{
        if (password.length > 0) {
            setBottom1(45);
        } else {
            setBottom1(20);
        }
    };

    const loginHandler = () =>{
        setTimeout(() =>{
            dispatch(loginAction.login(email, password));
        }, 500);
        // console.log(data);
        // props.navigation.navigate('ProductDetail');
    };

  return (
    <View style={styles.parent}>
        <View>
            <Text style={styles.headerSignUp}>Login</Text>
        </View>
        <View style={styles.signup}>
            <View style={styles.inputParent}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>Email</Text>
                <TextInput style={[styles.inputText]} onChangeText={(text)=>{setEmail(text);}} onFocus={Focus} onBlur={ () => Blur() } />
            </View>
            <View style={styles.inputParent}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom1}]}>Password</Text>
                <TextInput style={[styles.inputText]} onChangeText={(text)=>{setPassword(text);}} onFocus={Focus1} onBlur={ () => Blur1() } />
            </View>
            <View style={styles.loginLink}>
              <Text style={styles.link}>Forgot your password?</Text>
            </View>
            <View style={styles.signUpBtn}>
                <TouchableOpacity onPress={loginHandler} style={styles.btn}>
                    <Text style={styles.textSignup}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#E5E5E5',
    },
    navigation: {
        marginTop: 20,
        marginBottom: 20,
        width: 25,
        marginLeft: -10,
    },
    headerSignUp: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    signup: {
        // backgroundColor: 'grey',
        marginTop: 20,
    },
    inputParent: {
        // paddingTop: 20,
        // paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 10,
        // marginBottom: 25,
        backgroundColor: 'white',
    },
    inputText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        height: 65,
        // position: 'relative',
        // backgroundColor: backgroundColor,
    },
    text: {
        position: 'absolute',
        fontSize: 17,
        left: 25,
        bottom: 25,
        zIndex: 2,
        color: 'grey',
        // top: 10,
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'flex-end',
      },
      link: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textDecorationStyle: 'solid',
        textDecorationColor: 'black',
      },
      signUpBtn: {
        marginTop: 40,
      },
      btn: {
          backgroundColor: 'rgba(219, 48, 34, 1)',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
      },
      textSignup: {
          color: 'white',
      },
});

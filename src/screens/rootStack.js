/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import SplashScreen from '../screens/SplashScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator();

const Main = (props) => {

  return (
        <Stack.Navigator>
            {/* <Stack.Screen
                options={{
                    headerShown: false,
                    headerTransparent: true,
                    headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: 'transparent',
                    }}}
                name="SplashScreen"
                component={SplashScreen}
            /> */}
            <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{headerShown: false}}
                name="SignUp"
                component={Signup}
            />
        </Stack.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  magnifyContainer: {
    marginRight: -35,
    marginLeft: -20,
    paddingLeft: 10,
    flex: 1,
    width: 290,
    height: 40,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'white',
  },
});

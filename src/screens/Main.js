/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabs from '../screens/BottomTabs';
import Login from '../screens/Login';
import Search from '../screens/SearchStack';
import Success from '../screens/Success';
import Checkout from '../screens/Checkout';
import ProductDetail from '../screens/ProductDetail';
import Address from '../screens/Address';
import ChangeAddress from '../screens/ChangeAddress';
import SplashScreen from 'react-native-splash-screen'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const Main = (props) => {
  const searchHandler = () =>{
  props.navigation.navigate('Search');
  };

  const dispatch = useDispatch();

  const LoginState = useSelector(state=>state.auth);

  const {isLogin} = LoginState;

  useEffect(() => {
    SplashScreen.hide();
}, []);

  return (
    <NavigationContainer>
      {!isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}
            />
          </Stack.Navigator>
      ) : (
        <>
            {/* <BottomTabs /> */}
        <Stack.Navigator>
        {/* <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'red',
            },
            headerTitle: '',
            headerCenter: ()=>(<Text>hai</Text>),
            headerRight: ()=>(<View style={styles.magnifyContainer}>
              <TouchableOpacity onPress={searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
                </View>),
              }}
            /> */}
            <Stack.Screen name="tab"
            options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTitle: '' }}
            component={BottomTabs} />
          <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Short Dress',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity>
                <Icon name="share-variant" size={25} />
              </TouchableOpacity>
            </View>),
            headerTitleAlign: 'center',
            // headerTitleStyle: { textAlign: 'center', marginLeft: -10 },
            // headerBackImage: () => <HeaderIcon />,
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Checkout',
            headerTitleAlign: 'center',
            // headerBackImage: () => <HeaderIcon />,
          }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            headerTransparent: true,
            headerTitle: '',
            // headerTitleAlign: 'center',
            headerLeft: '',
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Shipping Address',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ChangeAddress"
          component={ChangeAddress}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Change Address',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTitle: ()=>(<View style={styles.magnifyContainer}>
              <TouchableOpacity onPress={searchHandler}>
                <Icon name="magnify" size={25} color="grey" />
              </TouchableOpacity>
              <TextInput placeholder="Search" style={{width: '100%'}} />
                </View>),
            // headerTitleAlign: 'center',
          }}
        />
          </Stack.Navigator>
          {/* <Search /> */}
        </>
      )}
    </NavigationContainer>
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

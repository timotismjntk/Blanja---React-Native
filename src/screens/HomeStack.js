/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderIcon from '../components/Header';

// Import Screens
import Login from '../screens/Login';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import Myprofile from '../screens/Myprofile';
import MyOrders from '../screens/MyOrders';
import Mybags from './MyBags';
import OrderDetail from '../screens/OrderDetail';
import Address from '../screens/Address';
import Setting from '../screens/SettingAccount';

export default class StackNavigator extends Component {
  state = {
    isLogin: false,
  };
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen //nanti dihapus
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackImage: () => <HeaderIcon />,
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  share: {
    marginRight: 10,
  },
});

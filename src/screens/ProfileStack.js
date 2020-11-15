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
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import SplashScreen from '../screens/SplashScreen';
import Myprofile from '../screens/Myprofile';
import MyOrders from '../screens/MyOrders';
import Mybags from '../screens/Mybags';
import OrderDetail from '../screens/OrderDetail';
import Address from '../screens/Address';
import Setting from '../screens/SettingAccount';
import Search from './Search';

export default class StackNavigator extends Component {
  state = {
    isLogin: false,
  };

  searchHandler = () =>{
    this.props.navigation.navigate('Search');
  };
  render() {
    return (
      <Stack.Navigator>
          <Stack.Screen
          name="Profile"
          component={Myprofile}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: '',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        <Stack.Screen
          name="Myorder"
          component={MyOrders}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: '',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Order Details',
            headerTitleAlign: 'center',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        {/* <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        /> */}
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

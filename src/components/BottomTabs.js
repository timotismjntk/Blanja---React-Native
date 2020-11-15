/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/ProfileStack';
import HomeStack from '../screens/HomeStack';
import StackNavigators from '../components/StackNav';
import Mybags from '../screens/MyBagStack';
import Shop from '../screens/ShopStack';

const Icon = MaterialCommunityIcons;
const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs(props) {
  return (
    <Tab.Navigator
    barStyle={styles.parent}
    activeColor="#DB3022"
    tabBarOptions={{
      activeTintColor: '#DB3022',
    }}>
      <Tab.Screen name="Home" options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }} component={HomeStack} />
      <Tab.Screen name="Shop" options={{
        tabBarLabel: 'Shop',
        tabBarIcon: ({ color }) => (
          <Icon name="cart-outline" color={color} size={26} />
        ),
      }} component={Shop} />
      <Tab.Screen name="Mybag" options={{
        tabBarLabel: 'Bag',
        tabBarIcon: ({ color }) => (
          <Icon name="shopping-outline" color={color} size={26} />
        ),
      }} component={Mybags} />
      <Tab.Screen name="Favorites" options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => (
          <Icon name="heart-outline" color={color} size={26} />
        ),
      }} component={Login} />
      <Tab.Screen name="Profile" options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Icon name="account-outline" color={color} size={26} />
        ),
      }} component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  parent: {
    borderRadius: 8,
    backgroundColor: 'white',
    paddingTop: 5,
    marginTop: -30,
  },
});

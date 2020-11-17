/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import Signup from './Signup';
import Profile from './ProfileStack';
import HomeStack from './HomeStack';
// import StackNavigators from '../components/StackNav';
import Mybags from './MyBagStack';
import Shop from './ShopStack';

const Icon = FontAwesome;
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
            <Icon name="home" color={color} size={26} />
          ),
        }} component={HomeStack} />
      <Tab.Screen name="Shop" options={{
        tabBarLabel: 'Shop',
        tabBarIcon: ({ color }) => (
          <Icon name="shopping-cart" color={color} size={23} />
        ),
      }} component={Shop} />
      <Tab.Screen name="Mybag" options={{
        tabBarLabel: 'Bag',
        tabBarIcon: ({ color }) => (
          <Icon name="shopping-bag" color={color} size={23} />
        ),
      }} component={Mybags} />
      <Tab.Screen name="Favorites" options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => (
          <Icon name="heart" color={color} size={23} />
        ),
      }} component={Login} />
      <Tab.Screen name="Profile" options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Icon name="user" color={color} size={23} />
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

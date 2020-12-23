/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/FontAwesome';


// Import Screens
import Category from './Category';
import Search from './Search';
import Catalog from './Catalog';
import FilterProduct from './FilterProduct';


export default class MyBagStack extends Component {
  searchHandler = () =>{
    this.props.navigation.navigate('Search');
  };
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={Category}
          options={{
            headerStyle: {
              elevation: 0.5,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTitle: 'Categories',
            headerTitleAlign: 'center',
            headerLeft: ()=> (
              <TouchableOpacity style={{marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
                <Icon name="chevron-left" color="rgba(0,0,0,0.7)" size={25} />
              </TouchableOpacity>
            ),
            headerRight: ()=>(<TouchableOpacity style={styles.icon} onPress={this.searchHandler}>
              <Icon name="search" size={25} />
            </TouchableOpacity>),
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
            headerTitle: '',
            headerTitleAlign: 'center',
            headerRight: ()=>(<TouchableOpacity style={styles.icon} onPress={this.searchHandler}>
              <Icon name="search" size={25} />
            </TouchableOpacity>),
          }}
        />
        <Stack.Screen
          name="Catalog"
          component={Catalog}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerRight: ()=>(<TouchableOpacity style={styles.icon} onPress={this.searchHandler}>
              <Icon name="search" size={25} />
            </TouchableOpacity>),
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
  icon: {
    // marginRight: 15,
    padding: 10,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
  },
});

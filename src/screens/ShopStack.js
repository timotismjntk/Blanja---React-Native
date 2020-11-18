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
import ViewAll from './ViewProduct';
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
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity>
                <Icon name="search" size={25} />
              </TouchableOpacity>
            </View>),
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
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="search" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
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
                <Icon name="search" size={25} />
              </TouchableOpacity>
            </View>),
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

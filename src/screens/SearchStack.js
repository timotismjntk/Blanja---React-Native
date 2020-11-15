/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// Import Screens
import Search from './Search';


export default class MyBagStack extends Component {
  searchHandler = () =>{
      Alert.alert('tes')
    this.props.navigation.navigate('Search');
};
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
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
              <TouchableOpacity onPress={this.searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  magnifyContainer: {
    marginRight: 10,
    flex: 1,
    backgroundColor: 'red',
  },
});

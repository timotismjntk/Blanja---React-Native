/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/FontAwesome';


// Import Screens
import Search from './Search';


export default class SearchStack extends Component {
  state = {
    searchValue: '',
  }
  searchHandler = () =>{
    this.props.navigation.navigate('Shop', {
      screen: 'ViewAll',
      params: {
        id: 1,
        search: this.state.searchValue,
      },
    });
};
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          // options={{headerShown: false}}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTitle: ()=>(<View style={styles.magnifyContainer}>
                 <TouchableOpacity onPress={this.searchHandler}>
                   <Icon name="search" size={18} color="grey" />
                 </TouchableOpacity>
                 <TextInput value={this.state.searchValue} onChangeText={(text)=>{this.setState({searchValue: text})}} placeholder="Search" style={{width: '100%', paddingLeft: 10}} />
                   </View>),
              headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  magnifyContainer: {
    marginRight: -35,
    marginLeft: 5,
    paddingLeft: 20,
    marginTop: 5,
    flex: 1,
    width: 290,
    // height: 310,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'white',
  },
});

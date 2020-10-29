/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderIcon from './Header';

// Import Screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';

export default class StackNavigator extends Component {
  state = {
    isLogin: false,
  };
  render() {
    const {isLogin} = this.state;
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackImage: () => <HeaderIcon />,
          }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
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

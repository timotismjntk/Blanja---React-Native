import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderIcon from './src/components/Header';

// Import Screens
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Loading from './src/screens/SplashScreen';

// import BottomTabs from './src/components/StackNav';
import BottomTabs from './src/components/BottomTabs';

export default class App extends Component {
  // state = {
  //   isLogin: false,
  // };
  render() {
    // const {isLogin} = this.state;
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

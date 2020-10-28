import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Loading from './src/screens/Loading';

export default class App extends Component {
  state = {
    isLogin: false,
  };
  render() {
    const {isLogin} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin ? (
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              // component={Login}
              children={(props) => (
                <Login
                  doLogin={() => this.setState({isLogin: true})}
                  {...props}
                />
              )}
            />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
          <Stack.Screen
            options={{headerShown: false}}
            name="Loading"
            component={Loading}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

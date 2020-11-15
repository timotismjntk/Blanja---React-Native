/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderIcon from './Header';

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
              <TouchableOpacity>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
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
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Short Dress',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity>
                <Icon name="share-variant" size={25} />
              </TouchableOpacity>
            </View>),
            headerTitleAlign: 'center',
            // headerTitleStyle: { textAlign: 'center', marginLeft: -10 },
            headerBackImage: () => <HeaderIcon />,
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
              <TouchableOpacity>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: 'Shipping Address',
            headerTitleAlign: 'center',
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
              <TouchableOpacity>
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
              <TouchableOpacity>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
            </View>),
          }}
        />
        <Stack.Screen
          name="Mybag"
          component={Mybags}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: '',
            headerTitleAlign: 'center',
            headerRight: ()=>(<View style={styles.share}>
              <TouchableOpacity>
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

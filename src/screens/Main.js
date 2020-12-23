/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabs from '../screens/BottomTabs';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyResetCode from '../screens/VerifyResetCode';
import ResetPassword from '../screens/ResetPassword';
import Search from '../screens/SearchStack';
import Success from '../screens/Success';
import Checkout from '../screens/Checkout';
import ProductDetail from '../screens/ProductDetail';
import Address from '../screens/Address';
import ChangeAddress from '../screens/ChangeAddress';
import AddAddress from '../screens/AddAddress';
import SplashScreen from 'react-native-splash-screen';
import FilterProduct from './FilterProduct';

import Toast from 'react-native-root-toast';

import Icon from 'react-native-vector-icons/FontAwesome';

import authAction from '../redux/actions/auth';

const Stack = createStackNavigator();

const Main = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const LoginState = useSelector(state=>state.auth);

    const {isLogin, isError, isLoading, alertMsg} = LoginState;
    useEffect(() => {
      if (isError) {
          setMessage('Wrong Email or Password');
          setVisible(true);
          setTimeout(() =>{
              setVisible(false);
          }, 5000);
      }
      if (isLogin) {
          alertMsg.length ? (setVisible(true), setMessage(alertMsg)) : null;
          setTimeout(() =>{
            dispatch(authAction.removeMessage());
            setVisible(false);
          }, 5000);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, isError]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                // backgroundColor: 'red',
              },
              headerTitle: 'Blanja',
                }}
            name="SignUp"
            component={SignUp}
            />
            <Stack.Screen
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                // backgroundColor: 'red',
              },
              headerTitle: '',
                }}
            name="ForgotPassword"
            component={ForgotPassword}
            />
            <Stack.Screen
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitle: '',
                }}
            name="VerifyResetCode"
            component={VerifyResetCode}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                // backgroundColor: 'red',
              },
              headerTitle: '',
                }}
            />
            <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitle: '',
                }}
            />
          </Stack.Navigator>
      ) : (
        <>
            {/* <BottomTabs /> */}
        <Stack.Navigator>
        {/* <Stack.Screen
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
              <TouchableOpacity onPress={searchHandler}>
                <Icon name="magnify" size={25} />
              </TouchableOpacity>
                </View>),
              }}
            /> */}
            <Stack.Screen name="tab"
            options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTitle: '' }}
            component={BottomTabs} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTitle: '',
                headerRight: ()=>(<View style={styles.share}>
                  <TouchableOpacity>
                    <Icon name="share-alt" color="grey" size={23} />
                  </TouchableOpacity>
                </View>),
                headerTitleAlign: 'center',
                // headerTitleStyle: { textAlign: 'center', marginLeft: -10 },
                // headerBackImage: () => <HeaderIcon />,
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTitle: 'Checkout',
                headerTitleAlign: 'center',
                // headerBackImage: () => <HeaderIcon />,
              }}
            />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{
                headerTransparent: true,
                headerTitle: '',
                // headerTitleAlign: 'center',
                headerLeft: '',
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
              name="ChangeAddress"
              component={ChangeAddress}
              options={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTitle: 'Change Address',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddAddress}
              options={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTitle: 'Adding Shipping Address',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{headerShown: false}}
              // options={({ navigation }) => ({
              //   headerStyle: {
              //     elevation: 0,
              //     shadowOpacity: 0,
              //     backgroundColor: 'transparent',
              //   },
              //   headerTitle: '',
              //   // headerTitle: ()=>(<View style={styles.magnifyContainer}>
              //   //   <TouchableOpacity onPress={()=>{navigation.navigate('alProduct');}}>
              //   //     <Icon name="search" size={18} color="grey" />
              //   //   </TouchableOpacity>
              //   //   <TextInput placeholder="Search" style={{width: '100%'}} />
              //   //     </View>),
              //   // headerTitleAlign: 'center',
              // })}
            />
            <Stack.Screen
            name="FilterProduct"
            component={FilterProduct}
            options={{
              // headerStyle: {
              //   elevation: 0,
              //   shadowOpacity: 0,
              //   backgroundColor: 'transparent',
              // },
              headerTitle: 'Filters',
              headerTitleAlign: 'center',
              // headerRight: ()=>(<View style={styles.share}>
              //   <TouchableOpacity onPress={searchHandler}>
              //     <Icon name="search" size={20} />
              //   </TouchableOpacity>
              // </View>),
              }}
            />
          </Stack.Navigator>
          {/* <Search /> */}
        </>
      )}
      <Toast
            visible={visible}
            position={40}
            shadow={false}
            animation={true}
            hideOnPress={true}
            // textColor="yellow"
        >{message}</Toast>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  magnifyContainer: {
    marginRight: -35,
    marginLeft: -20,
    paddingLeft: 10,
    flex: 1,
    width: 290,
    height: 40,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  share: {
    marginRight: 10,
    marginTop: 5,
  },
});

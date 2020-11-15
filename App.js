import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// Import Screens
import Main from './src/screens/Main';

export default class App extends Component {
  // state = {
  //   isLogin: false,
  // };
  render() {
    // const {isLogin} = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

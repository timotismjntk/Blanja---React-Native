import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';

// Import Screens
import Main from './src/screens/Main';
import ViewProduct from './src/screens/ViewProduct';
import FilterProduct from './src/screens/FilterProduct';

export default class App extends Component {
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  render() {
    // const {isLogin} = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
            <Main />
          </RootSiblingParent>
        </PersistGate>
      </Provider>
    );
  }
}

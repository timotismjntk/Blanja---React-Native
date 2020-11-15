import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={style.parent}>
        <Text style={style.text}> Hello World!</Text>
        <Text style={style.text}> Hello World!</Text>
        <Text style={style.text}> Hello World!</Text>
      </View>
    );
  }
}
const style = StyleSheet.create({
  parent: {
    backgroundColor: 'tomato',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default App;

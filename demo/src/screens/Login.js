/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../assets/puma.png';

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    doLogin = () => {
        const {username, password} = this.state;
        if (username === 'admin' && password === 'admin') {
            this.props.doLogin();
            return Alert.alert('Login success');
        }
        return Alert.alert('Login failed');
    }
  render() {
    return (
      <View style={style.parent}>
        <View style={style.inner}>
          <Image style={style.logo} source={logo} />
          <View style={style.form}>
            <View style={style.inputWrapper}>
              <Text style={style.label}>Username</Text>
              <TextInput onChangeText={(text)=>this.setState({username: text})} style={style.input} />
            </View>
            <View style={style.inputWrapper}>
              <Text style={style.label}>Password</Text>
              <TextInput onChangeText={(text)=>this.setState({password: text})} style={style.input} />
            </View>
            <View style={style.forgotLink}>
              <Text style={style.link}>Forgot Password</Text>
            </View>
            <View style={style.btnLogin}>
              <TouchableOpacity onPress={this.doLogin} style={style.btn}>
                <Text style={style.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={style.borderLine}>
              <Text style={style.borderText}>Or</Text>
            </View>
            <View style={style.socialLogin}>
              <TouchableOpacity style={[style.btn, style.btnSocial]}>
                <Icon
                  color="rgba(255, 255, 255, 0.5)"
                  name="facebook"
                  size={30}
                  style={style.btnIcon}
                />
                <Text style={style.btnText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[style.btn, style.btnSocial]}>
                <Icon
                  color="rgba(255, 255, 255, 0.5)"
                  name="google"
                  size={30}
                  style={style.btnIcon}
                />
                <Text style={style.btnText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'center',
  },
  form: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 65,
    fontSize: 19,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  inputWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.5)',
  },
  forgotLink: {
    alignItems: 'flex-end',
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  btnLogin: {
    height: 65,
  },
  btnSocial: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },
  socialLogin: {
    flexDirection: 'row',
  },
  borderLine: {
    marginVertical: 10,
    alignItems: 'center',
  },
  borderText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 19,
  },
  // btnIcon: {
  //   marginRight: 5,
  // },
});

export default Login;

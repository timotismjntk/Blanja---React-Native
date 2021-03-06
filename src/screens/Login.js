import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

import loginAction from '../redux/actions/auth';

export default function Login(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bottom, setBottom] = useState(20);
  const [bottom1, setBottom1] = useState(20);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setBottom(45);
  };
  const _keyboardDidHide = () => {
    if (email.length > 0) {
      // setBottom(45);
    } else if (email.length === 0) {
      // setBottom(20);
    }
  };

  const Focus = () => {
    setBottom(45);
  };
  const Blur = () => {
    if (email.length > 0) {
      setBottom(45);
    } else {
      setBottom(20);
    }
  };
  const Focus1 = () => {
    setBottom1(45);
  };
  const Blur1 = () => {
    if (password.length > 0) {
      setBottom1(45);
    } else {
      setBottom1(20);
    }
  };

  const LoginState = useSelector((state) => state.auth);

  const {isLogin, isError, isLoading, alertMsg} = LoginState;

  const loginHandler = () => {
    dispatch(loginAction.login(email, password)).catch((err) =>
      console.log(err.message),
    );
    // console.log(data);
    // props.navigation.navigate('ProductDetail');
  };

  const gotoForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };

  useEffect(() => {
    if (isError) {
      setMessage('Wrong Email or Password');
      setVisible(true);
      setTimeout(() => {
        dispatch(loginAction.clearMessage());
        setVisible(false);
      }, 3000);
    }
    if (isLogin) {
      dispatch(loginAction.clearMessage());
      setVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, isError]);

  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <View>
        <Text style={styles.headerSignUp}>Login</Text>
      </View>
      <View style={styles.signup}>
        <KeyboardAvoidingView style={styles.inputParent}>
          <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>
            Email
          </Text>
          <TextInput
            style={[styles.inputText]}
            onChangeText={(text) => {
              setEmail(text);
            }}
            onFocus={Focus}
            onBlur={() => Blur()}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={styles.inputParent}>
          <Text onFocus={Focus} style={[styles.text, {bottom: bottom1}]}>
            Password
          </Text>
          <TextInput
            style={[styles.inputText]}
            onChangeText={(text) => {
              setPassword(text);
            }}
            onFocus={Focus1}
            onBlur={() => Blur1()}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.loginLink} onPress={gotoForgotPassword}>
          <Text style={styles.link}>Forgot your password?</Text>
          <Icon
            name="long-arrow-right"
            size={20}
            color="rgba(219, 48, 34, 1)"
          />
        </TouchableOpacity>
        <View style={styles.signupWrap}>
          <TouchableOpacity
            disabled={email.length > 4 && password.length > 0 ? false : true}
            onPress={loginHandler}
            style={[
              styles.btn,
              email.length < 4 &&
                password.length < 0 && {backgroundColor: 'grey'},
            ]}>
            <Text style={styles.textLogin}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <Toast
          visible={visible}
          position={40}
          shadow={false}
          animation={true}
          hideOnPress={true}
          // textColor="yellow"
        >
          {message}
        </Toast>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#E5E5E5',
  },
  navigation: {
    marginTop: 20,
    marginBottom: 20,
    width: 25,
    marginLeft: -10,
  },
  headerSignUp: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  signup: {
    // backgroundColor: 'grey',
    marginTop: 20,
  },
  inputParent: {
    // paddingTop: 20,
    // paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    // marginBottom: 25,
    backgroundColor: 'white',
  },
  inputText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    height: 65,
    // position: 'relative',
    // backgroundColor: backgroundColor,
  },
  text: {
    position: 'absolute',
    fontSize: 17,
    left: 25,
    bottom: 25,
    zIndex: 2,
    color: 'grey',
    // top: 10,
  },
  loginLink: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    marginRight: 5,
  },
  signupWrap: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: 'rgba(219, 48, 34, 1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textLogin: {
    color: 'white',
  },
});

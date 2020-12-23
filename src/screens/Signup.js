import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import actions
import signUpAction from '../redux/actions/auth';

export default function SignupUser(props) {
  const dispatch = useDispatch();

  const toLogin = () => {
    props.navigation.navigate('Login');
  };

  const [bottom, setBottom] = useState(20);
  const [bottom1, setBottom1] = useState(20);
  const [bottom2, setBottom2] = useState(20);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    // Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      //   Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setBottom(45);
  };
  // const _keyboardDidHide = () => {
  //     setBottom(20);
  // };

  const Focus = () => {
    setBottom(45);
  };
  const Blur = (name) => {
    if (name.length > 0) {
      setBottom(45);
    } else {
      setBottom(20);
    }
  };
  const Focus1 = () => {
    setBottom1(45);
  };
  const Blur1 = (email) => {
    if (email.length > 0) {
      setBottom1(45);
    } else {
      setBottom1(20);
    }
  };
  const Focus2 = () => {
    setBottom2(45);
  };
  const Blur2 = (password) => {
    if (password.length > 0) {
      setBottom2(45);
    } else {
      setBottom2(20);
    }
  };

  const signUpState = useSelector((state) => state.auth);

  const {isSignup, failSignup, isLoading, alertMsg} = signUpState;

  useEffect(() => {
    if (failSignup) {
      setMessage(alertMsg);
      setVisible(true);
      setTimeout(() => {
        dispatch(signUpAction.clearMessage());
        setVisible(false);
      }, 5000);
    }
    if (isSignup) {
      setMessage(alertMsg);
      dispatch(signUpAction.clearMessage());
      setVisible(true);
      setTimeout(() => {
        props.navigation.navigate('Login');
        setVisible(false);
      }, 5000);
    }
  }, [isSignup, failSignup, alertMsg, dispatch]);
  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <View>
        <Text style={styles.headerSignUp}>Sign up</Text>
      </View>
      <View style={styles.signup}>
        <Formik
          initialValues={{name: '', email: '', password: ''}}
          onSubmit={(values) =>
            dispatch(signUpAction.signUp(values)).catch((err) =>
              console.log(err.message),
            )
          }
          validationSchema={yup.object().shape({
            name: yup.string().required('Required'),
            email: yup.string('Required').email('Invalid Email.').required(),
            password: yup
              .string()
              .min(
                6,
                'Too Short, minimal password length must be at least 6 characters',
              )
              .required('Required'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <View
                style={[
                  styles.inputParent,
                  touched.name && errors.name
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.name && {borderWidth: 1, borderColor: 'green'},
                ]}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>
                  Name
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('name')}
                  onBlur={() => {
                    setFieldTouched('name');
                    Blur(values.name);
                  }}
                  onFocus={Focus}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  failSignup
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.email && errors.email
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.email && {borderWidth: 1, borderColor: 'green'},
                ]}>
                <Text onFocus={Focus1} style={[styles.text, {bottom: bottom1}]}>
                  Email
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('email')}
                  onBlur={() => {
                    setFieldTouched('email');
                    Blur1(values.email);
                  }}
                  onFocus={Focus1}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  touched.password && errors.password
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.password && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus2} style={[styles.text, {bottom: bottom2}]}>
                  Password
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => {
                    setFieldTouched('password');
                    Blur2(values.password);
                  }}
                  onFocus={Focus2}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.loginLink} onPress={toLogin}>
                <Text style={styles.link}>Already have an account?</Text>
                <Icon
                  name="long-arrow-right"
                  size={20}
                  color="rgba(219, 48, 34, 1)"
                />
              </TouchableOpacity>
              <View style={styles.signUpBtn}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={[
                    styles.btn,
                    styles.submit,
                    !isValid ? {opacity: 0.5} : {opacity: 1},
                  ]}>
                  <Text style={styles.textSignup}>SIGNUP</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
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
    borderRadius: 5,
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
  error: {
    // position: 'absolute',
    // left: 10,
    // top: 45,
    fontSize: 12,
    color: 'red',
    width: '100%',
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
    marginRight: 10,
  },
  signUpBtn: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: 'rgba(219, 48, 34, 1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textSignup: {
    color: 'white',
  },
});

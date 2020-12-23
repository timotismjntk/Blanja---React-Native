/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import actions
import resetAction from '../redux/actions/auth';

export default function ForgotPassword(props) {
  const dispatch = useDispatch();
  const [bottom, setBottom] = useState(20);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    };
  }, []);

  const _keyboardDidShow = () => {
    setBottom(45);
  };

  const Focus = () => {
    setBottom(45);
  };
  const Blur = (value) => {
    if (value.length > 0) {
      setBottom(45);
    } else {
      setBottom(20);
    }
  };

  const authState = useSelector((state) => state.auth);
  const {
    resetCodeData,
    isMatch,
    isErrorResetCode,
    alertMsg,
    isLoading,
  } = authState;

  useEffect(() => {
    if (isErrorResetCode) {
      setMessage(alertMsg);
      setVisible(true);
      setTimeout(() => {
        dispatch(resetAction.clearMessage());
        setVisible(false);
      }, 1000);
    }
    if (isMatch) {
      setMessage(alertMsg);
      dispatch(resetAction.clearMessage());
      setVisible(true);
      setTimeout(() => {
        props.navigation.navigate('VerifyResetCode', {
          reset: resetCodeData,
          email: email,
        });
        setVisible(false);
      }, 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMatch, isErrorResetCode, alertMsg, dispatch]);
  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <View>
        <Text style={styles.headerSignUp}>Forgot Password</Text>
      </View>
      <View style={styles.signup}>
        <Text>
          Please, enter your email address. You will receive a link to create a
          new password via email.
        </Text>
        <Formik
          initialValues={{email: ''}}
          onSubmit={(values) => {
            dispatch(resetAction.getResetCode(values.email)).catch((err) =>
              console.log(err.message),
            );
            setEmail(values.email);
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string('Required')
              .email('Not a valid email address. Should be your@email.com.')
              .required(),
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
                  touched.email && errors.email
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.email && {borderWidth: 1, borderColor: 'green'},
                ]}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>
                  Email
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('email')}
                  onBlur={() => {
                    setFieldTouched('email');
                    Blur(values.email);
                  }}
                  onFocus={Focus}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <View style={styles.signUpBtn}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={[
                    styles.btn,
                    styles.submit,
                    !isValid ? {opacity: 0.5} : {opacity: 1},
                  ]}>
                  <Text style={styles.textSignup}>SEND</Text>
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
          hideOnPress={true}>
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

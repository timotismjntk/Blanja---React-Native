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

export default function VerifyResetCode(props) {
  const dispatch = useDispatch();
  const [bottom, setBottom] = useState(20);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [verification, setVerification] = useState('');
  const [error, SetError] = useState(false);
  const [show, setShow] = useState(false);
  const [showVerifyError, setShowVerifyError] = useState(false);
  const [alert, setAlert] = useState('');
  const {reset, email} = props.route.params;

  console.log(props);

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
  const Blur = (name) => {
    if (name.length > 0) {
      setBottom(45);
    } else {
      setBottom(20);
    }
  };

  useEffect(() => {
    setAlert(`Masukkan kode berikut: ${reset ? reset : ''}`);
    setShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authState = useSelector((state) => state.auth);
  const {isVerify, isErrorVerify, alertMsg} = authState;

  const verify = async (values) => {
    Keyboard.dismiss();
    try {
      await dispatch(resetAction.verifyResetCode(email, values.reset_code));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isVerify) {
      setShow(false);
      setAlert('');
      props.navigation.navigate('ResetPassword', {email: email});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerify]);

  useEffect(() => {
    if (isErrorVerify) {
      setShowVerifyError(true);
      setTimeout(() => {
        setShowVerifyError(false);
        dispatch(resetAction.clearMessage());
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorVerify]);

  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <View style={styles.signup}>
        <Formik
          initialValues={{reset_code: ''}}
          onSubmit={(values) => verify(values)}
          validationSchema={yup.object().shape({
            reset_code: yup
              .string('Required')
              .required('Reset Code is required'),
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
                  touched.reset_code && errors.reset_code
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.reset_code && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>
                  reset Code
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('reset_code')}
                  onBlur={() => {
                    setFieldTouched('reset_code');
                    Blur(values.reset_code);
                  }}
                  onFocus={Focus}
                />
              </View>
              {touched.reset_code && errors.reset_code && (
                <Text style={styles.error}>{errors.reset_code}</Text>
              )}
              <View style={styles.resetBtn}>
                <TouchableOpacity
                  disabled={!isValid || alertMsg}
                  onPress={handleSubmit}
                  style={[
                    styles.btn,
                    styles.submit,
                    !isValid ? {opacity: 0.5} : {opacity: 1},
                    alertMsg && {backgroundColor: 'grey'},
                  ]}>
                  <Text style={styles.textReset}>SEND</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <Toast
          visible={show}
          position={40}
          shadow={false}
          animation={true}
          hideOnPress={true}>
          {alert}
        </Toast>
        <Toast
          visible={showVerifyError}
          position={160}
          shadow={false}
          animation={true}
          hideOnPress={true}>
          {alertMsg}
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
  resetBtn: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: 'rgba(219, 48, 34, 1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textReset: {
    color: 'white',
  },
});

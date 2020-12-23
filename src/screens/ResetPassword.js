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

//import actions
import resetPasswordAction from '../redux/actions/profile';

export default function ResetPassword(props) {
  const dispatch = useDispatch();
  const [bottom, setBottom] = useState(20);
  const [bottom1, setBottom1] = useState(20);

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
  const Blur = (value) => {
    if (value.length > 0) {
      setBottom(45);
    } else {
      setBottom(20);
    }
  };
  const Focus1 = () => {
    setBottom1(45);
  };
  const Blur1 = (value) => {
    if (value.length > 0) {
      setBottom1(45);
    } else {
      setBottom1(20);
    }
  };

  const [showVerifyError, setShowVerifyError] = useState(false);
  const {email} = props.route.params;

  const profileState = useSelector((state) => state.profile);
  const {isLoading, isError, updated, alertMsg} = profileState;

  const resetPassword = (value) => {
    const data = {
      email: email,
      password: value,
    };
    dispatch(resetPasswordAction.resetPassword(data)).catch((e) => {
      console.log(e.message);
    });
  };

  useEffect(() => {
    if (updated) {
      props.navigation.navigate('Login');
      setShowVerifyError(true);
      setTimeout(() => {
        setShowVerifyError(false);
        dispatch(resetPasswordAction.removeMessage());
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  useEffect(() => {
    if (isError) {
      setShowVerifyError(true);
      setTimeout(() => {
        setShowVerifyError(false);
        dispatch(resetPasswordAction.removeMessage());
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <View>
        <Text style={styles.headerText}>Reset Password</Text>
      </View>
      <View style={styles.signup}>
        <Formik
          initialValues={{email: email, newPassword: '', repeatPassword: ''}}
          onSubmit={(values) => resetPassword(values.newPassword)}
          validationSchema={yup.object().shape({
            email: yup.string('Required').email('Invalid Email.').required(),
            newPassword: yup
              .string()
              .min(8, 'Too Short!')
              .required('New password must fill'),
            repeatPassword: yup
              .string()
              .min(8, 'Too Short!')
              .required('Repeat password must fill')
              .test(
                'confirm-password-test',
                'Password and Repeat password should match',
                function (value) {
                  return value === this.parent.newPassword;
                },
              ),
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
                  touched.newPassword && errors.newPassword
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.newPassword && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>
                  New Password
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('newPassword')}
                  onBlur={() => {
                    setFieldTouched('newPassword');
                    Blur(values.newPassword);
                  }}
                  onFocus={Focus}
                />
              </View>
              {touched.newPassword && errors.newPassword && (
                <Text style={styles.error}>{errors.newPassword}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  touched.repeatPassword && errors.repeatPassword
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.repeatPassword && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus1} style={[styles.text, {bottom: bottom1}]}>
                  Repeat Password
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('repeatPassword')}
                  onBlur={() => {
                    setFieldTouched('repeatPassword');
                    Blur1(values.repeatPassword);
                  }}
                  onFocus={Focus1}
                />
              </View>
              {touched.repeatPassword && errors.repeatPassword && (
                <Text style={styles.error}>{errors.repeatPassword}</Text>
              )}
              <View style={styles.resetWrap}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={[
                    styles.btn,
                    styles.submit,
                    !isValid ? {opacity: 0.5} : {opacity: 1},
                  ]}>
                  <Text style={styles.textSubmit}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <Toast
          visible={showVerifyError}
          position={40}
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
  headerText: {
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
  resetWrap: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: 'rgba(219, 48, 34, 1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textSubmit: {
    color: 'white',
  },
});

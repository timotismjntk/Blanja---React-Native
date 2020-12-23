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

// import actions
import addressAction from '../redux/actions/address';

export default function AddAddress(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [bottom, setBottom] = useState(20);
  const [bottom1, setBottom1] = useState(20);
  const [bottom2, setBottom2] = useState(20);
  const [bottom3, setBottom3] = useState(20);
  const [bottom4, setBottom4] = useState(20);
  const [bottom5, setBottom5] = useState(20);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

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
  const Focus2 = () => {
    setBottom2(45);
  };
  const Blur2 = (value) => {
    if (value.length > 0) {
      setBottom2(45);
    } else {
      setBottom2(20);
    }
  };
  const Focus3 = () => {
    setBottom3(45);
  };
  const Blur3 = (value) => {
    if (value.length > 0) {
      setBottom3(45);
    } else {
      setBottom3(20);
    }
  };
  const Focus4 = () => {
    setBottom4(45);
  };
  const Blur4 = (value) => {
    if (value.length > 0) {
      setBottom4(45);
    } else {
      setBottom4(20);
    }
  };
  const Focus5 = () => {
    setBottom5(45);
  };
  const Blur5 = (value) => {
    if (value.length > 0) {
      setBottom5(45);
    } else {
      setBottom5(20);
    }
  };

  const addressState = useSelector((state) => state.address);
  const {isError, isSuccess, alertMsg} = addressState;

  const saveAddress = (values) => {
    dispatch(addressAction.createAddress(token, values)).catch((e) =>
      console.log(e.message),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      setMessage(alertMsg);
      setTimeout(() => {
        dispatch(addressAction.getAddress(token)).catch((err) =>
          console.log(err.message),
        );
        dispatch(addressAction.removeMessage());
        props.navigation.goBack();
      }, 250);
    }
    if (isError) {
      setVisible(true);
      setMessage(alertMsg);
      setTimeout(() => {
        dispatch(addressAction.removeMessage());
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <View>
        <Text style={styles.headerText}>Sign up</Text>
      </View>
      <View style={styles.formWrap}>
        <Formik
          initialValues={{
            place: '',
            recipient_name: '',
            recipient_number: '',
            address_name: '',
            postal_code: '',
            city: '',
            isPrimary: 0,
          }}
          onSubmit={(values) => {
            console.log(values);
            saveAddress(values);
          }}
          validationSchema={yup.object().shape({
            place: yup.string().required('Required'),
            recipient_name: yup.string().required('Required'),
            recipient_number: yup.string().required('Required'),
            address_name: yup.string().required('Required'),
            postal_code: yup.string().required('Required'),
            city: yup.string().required('Required'),
            isPrimary: yup.string().required('Required'),
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
                  touched.place && errors.place
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.place && {borderWidth: 1, borderColor: 'green'},
                ]}>
                <Text onFocus={Focus} style={[styles.text, {bottom: bottom}]}>
                  Place
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('place')}
                  onBlur={() => {
                    setFieldTouched('place');
                    Blur(values.place);
                  }}
                  onFocus={Focus}
                />
              </View>
              {touched.place && errors.place && (
                <Text style={styles.error}>{errors.place}</Text>
              )}
              <View style={styles.inputParent}>
                <Text onFocus={Focus1} style={[styles.text, {bottom: bottom1}]}>
                  Recipient
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  onChangeText={handleChange('recipient_name')}
                  onBlur={() => {
                    setFieldTouched('recipient_name');
                    Blur1(values.recipient_name);
                  }}
                  onFocus={Focus1}
                />
              </View>
              {touched.recipient_name && errors.recipient_name && (
                <Text style={styles.error}>{errors.recipient_name}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  touched.recipient_number && errors.recipient_number
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.recipient_number && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus2} style={[styles.text, {bottom: bottom2}]}>
                  Phone Number
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  value={values.recipient_number}
                  onChangeText={handleChange('recipient_number')}
                  onBlur={() => {
                    setFieldTouched('recipient_number');
                    Blur2(values.recipient_number);
                  }}
                  onFocus={Focus2}
                />
              </View>
              {touched.recipient_number && errors.recipient_number && (
                <Text style={styles.error}>{errors.recipient_number}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  touched.address_name && errors.address_name
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.address_name && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus3} style={[styles.text, {bottom: bottom3}]}>
                  Address
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  value={values.address_name}
                  onChangeText={handleChange('address_name')}
                  onBlur={() => {
                    setFieldTouched('address_name');
                    Blur3(values.address_name);
                  }}
                  onFocus={Focus3}
                />
              </View>
              {touched.address_name && errors.address_name && (
                <Text style={styles.error}>{errors.address_name}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  touched.postal_code && errors.postal_code
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.postal_code && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus4} style={[styles.text, {bottom: bottom4}]}>
                  Postal Code
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  value={values.postal_code}
                  onChangeText={handleChange('postal_code')}
                  onBlur={() => {
                    setFieldTouched('postal_code');
                    Blur4(values.postal_code);
                  }}
                  onFocus={Focus4}
                />
              </View>
              {touched.postal_code && errors.postal_code && (
                <Text style={styles.error}>{errors.postal_code}</Text>
              )}
              <View
                style={[
                  styles.inputParent,
                  touched.city && errors.city
                    ? {borderWidth: 1, borderColor: 'red'}
                    : touched.city && {
                        borderWidth: 1,
                        borderColor: 'green',
                      },
                ]}>
                <Text onFocus={Focus5} style={[styles.text, {bottom: bottom5}]}>
                  City
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={() => {
                    setFieldTouched('city');
                    Blur5(values.city);
                  }}
                  onFocus={Focus5}
                />
              </View>
              {touched.city && errors.city && (
                <Text style={styles.error}>{errors.city}</Text>
              )}
              <View style={styles.btnSubmit}>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={[
                    styles.btn,
                    styles.submit,
                    !isValid ? {opacity: 0.5} : {opacity: 1},
                  ]}>
                  <Text style={styles.btnText}>SAVE ADDRESS</Text>
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
  formWrap: {
    marginTop: 20,
  },
  inputParent: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  inputText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    height: 65,
  },
  text: {
    position: 'absolute',
    fontSize: 17,
    left: 25,
    bottom: 25,
    zIndex: 2,
    color: 'grey',
  },
  error: {
    fontSize: 12,
    color: 'red',
    width: '100%',
  },
  btnSubmit: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: 'rgba(219, 48, 34, 1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnText: {
    color: 'white',
  },
});

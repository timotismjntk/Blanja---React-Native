/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Button,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import * as yup from 'yup';
import { Formik } from 'formik';
import Toast from 'react-native-root-toast';

// Import image
import Line from '../assets/line.png';

// import actions
import profileAction from '../redux/actions/profile';

export default function ChangePassword(props) {
    const {
        open,
        close,
    } = props;

    useEffect(() => {
        if (open === true) {
            setVisible(open);
        } else if (open === false) {
            setVisible(open);
        }
    }, [open]);

    const [visible, setVisible] = useState(open);
    const [oldPassword, setOldPassword] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const toggleBottomModal = () => {
        setVisible(open);
    };
    const dispatch = useDispatch();

    const token = useSelector(state=>state.auth.token);
    const privateData = useSelector(state=>state.profile);
    const {data, isMatch, isError, isNotMatch, updated, alertMsg} = privateData;

    const checkPasswordHandler = (values) => {
      // console.log(values.newPassword)
      const email = data.email;
      const result = {
        email,
        password: oldPassword,
      };
      console.log(result);
      dispatch(profileAction.checkPassword(token, result))
      .catch((err) => console.log(err.message));
      setTimeout(() => {
        if (isMatch) {
          console.log('password cocok');
          if (values.newPassword && values.repeatPassword !== oldPassword ) {
            // console.log(values.newPassword);
            // setShow(true);
            // setMessage(alertMsg);
            dispatch(profileAction.updateProfile(token, {password: values.newPassword}))
            .catch((err) => console.log(err.message));
            setTimeout(() => {
              dispatch(profileAction.removeMessage());
              setShow(false);
            },1000);
          } else {
            setShow(true);
            setMessage('new password cannot be same with old password');
            setTimeout(() => {
              setShow(false);
            },2000);
          }
        }
        if (isNotMatch) {
            setMessage('password is not match');
            setShow(true);
            setTimeout(() => {
              dispatch(profileAction.removeMessage());
              setShow(false);
            },1500);
        }
      }, 2000);

    };
    useEffect(() => {
      if (isMatch && updated) {
          setShow(true);
          setMessage('Password updated successfully');
          setTimeout(() => {
          dispatch(profileAction.removeMessage());
          setShow(false);
          setVisible(close);
        },8000);
      }
    }, [dispatch, isMatch, close, updated]);

  return (
    <>
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggleBottomModal}
      onBackdropPress={()=>{setVisible(close);}}>
      <View style={styles.modal}>
        <View style={styles.line}>
          <Image source={Line} />
        </View>
        <Text style={styles.title}>Password Change</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Old Password"
            secureTextEntry={true}
            style={styles.input}
            value={oldPassword}
            onChangeText={(text)=> setOldPassword(text)}
          />
        </View>
        <View style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
        </View>
        <Formik
        initialValues={{ newPassword: '', repeatPassword: '' }}
        onSubmit={values => {
          checkPasswordHandler(values);
        }}
        validationSchema={yup.object().shape({
          newPassword: yup
            .string()
            .min(5, 'Too Short!')
            .required('New password must fill'),
          repeatPassword: yup
            .string()
            .min(5, 'Too Short!')
            .required('Repeat password must fill')
            .test(
              'confirm-password-test',
              'Password and Repeat password should match',
              function(value) {
              return value === this.parent.newPassword;
              }
            ),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <View style={styles.inputContainer}>
                <View style={{flexDirection: 'column', width: '100%'}}>
                  <TextInput
                    placeholder="Type Your New Password"
                    secureTextEntry={true}
                    style={styles.input}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={() => setFieldTouched('newPassword')}
                  />
                  {touched.newPassword && errors.newPassword &&
                    <Text style={{ fontSize: 12, color: 'red' }}>{errors.newPassword}</Text>
                  }
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={{flexDirection: 'column', width: '100%'}}>
                  <TextInput
                    placeholder="Repeat Your New Password"
                    secureTextEntry={true}
                    style={styles.input}
                    value={values.repeatPassword}
                    onChangeText={handleChange('repeatPassword')}
                    onBlur={() => setFieldTouched('repeatPassword')}
                  />
                  {touched.repeatPassword && errors.repeatPassword &&
                    <Text style={{ fontSize: 12, color: 'red' }}>{errors.repeatPassword}</Text>
                  }
                </View>
              </View>
              <View style={{marginVertical: 10}}>
                <Button
                title="SAVE PASSWORD"
                disabled={!isValid}
                onPress={handleSubmit}
                color="#DB3022"
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </BottomSheet>
    <View style={{zIndex: 1, position: 'absolute', flex: 1}}>
      <Toast
        visible={show}
        position={70}
        opacity={50}
        shadow={true}
        animation={true}
        hideOnPress={true}
        backgroundColor='red'
        // textColor="yellow"
      >{message}
      </Toast>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 420,
        // borderRadius: 25,
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        alignItems: 'center',
        // paddingLeft: 20,
        padding: 20,
    },
    line: {
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    inputContainer: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 20,
    },
    input: {
        height: 64,
        width: '100%',
        // paddingLeft: 10,
        fontSize: 16,
    },
    forgot: {
        width: '100%',
        alignItems: 'flex-end',
    },
    forgotText: {
        color: 'grey',
        paddingTop: 10,
    },
    btn: {
        flex: 1,
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DB3022',
        marginTop: 30,
    },
    btnText: {
        color: 'white',
    },
});

/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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

// Import image
import Line from '../assets/line.png';

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

    const toggleBottomModal = () => {
        setVisible(open);
    };
  return (
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
          />
        </View>
        <View style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
        </View>
        <Formik
        initialValues={{ newPassword: '', repeatPassword: '' }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
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

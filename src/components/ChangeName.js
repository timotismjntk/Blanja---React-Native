/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import * as yup from 'yup';
import { Formik } from 'formik';
import Toast from 'react-native-root-toast';

// Import image
import Line from '../assets/line.png';

// import actions
import profileAction from '../redux/actions/profile';

export default function ChangeName(props) {
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
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const toggleBottomModal = () => {
        setVisible(open);
    };

    const dispatch = useDispatch();

    const token = useSelector(state=>state.auth.token);
    const privateData = useSelector(state=>state.profile);
    const {isError, updated, alertMsg} = privateData;

    useEffect(() => {
      if (updated) {
        setMessage(alertMsg);
        setShow(true);
        setTimeout(() => {
          dispatch(profileAction.removeMessage());
          setShow(false);
        },1000);
      }
    },[updated, dispatch, alertMsg]);

    const changeNameHandler = (values) => {
      dispatch(profileAction.updateProfile(token, values))
      .catch((err) => console.log(err.message));
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
        <Text style={styles.title}>Change Name</Text>
        <Formik
              initialValues={{ name: '' }}
              onSubmit={values => changeNameHandler(values)}
              validationSchema={yup.object().shape({
              name: yup
                  .string()
                  .required('Required'),
              })}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                onChangeText={handleChange('name')}
              />
            </View>
            {touched.name && errors.name &&
              <Text style={styles.error}>{errors.name}</Text>
            }
            <TouchableOpacity
                style={[styles.btn, !isValid ? [styles.btn, {opacity: 0.5}] : [styles.btn, {opacity : 1}]]}
                disabled={!isValid}
                onPress={handleSubmit}
            >
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableOpacity>
          </>
          )}
        </Formik>
      </View>
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
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 260,
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
    error: {
      position: 'absolute',
      left: 40,
      top: 155,
      fontSize: 13,
      fontWeight: 'bold',
      color: 'red',
      width: '100%',
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

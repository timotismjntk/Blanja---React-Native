/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Repeat New Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>SAVE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 435,
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

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
import DateTimePicker from '@react-native-community/datetimepicker';
import {BottomSheet} from 'react-native-btr';
import moment from 'moment';
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
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [results, setResults] = useState('');
    const [mode, setMode] = useState('date');

    const dispatch = useDispatch();

    const token = useSelector(state=>state.auth.token);
    const changeHandler = () => {
      if (results.length) {
        close();
        dispatch(profileAction.updateProfile(token, {dateOfBirth: results}));
      } else {
        console.log('Choose Your Birth date');
      }
    };

    const [message, setMessage] = useState('');
    const privateData = useSelector(state=>state.profile);
    const {isError, updated, alertMsg} = privateData;

    useEffect(() => {
      if (updated) {
        setMessage(alertMsg);
        setShow(true);
        close();
        setTimeout(() => {
          dispatch(profileAction.removeMessage());
          setShow(false);
        },600);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[updated]);


    const toggleBottomModal = () => {
        setVisible(open);
    };
    const showDate = () => {
      setShow(true);
      // console.log('show')
    };
    const onChange = (event, selectedDate) => {
      console.log(event);
      if (event.type === 'set') {
        // const currentDate = selectedDate || date;
        setResults(moment(event.nativeEvent.timestamp).format('YYYY/MM/DD'));
        console.log(event.nativeEvent.timestamp.toString());
        setShow(false);
      }
      else if (event.type === 'dismissed') {
        setShow(false);
      }
      // setShow(false);
      // console.log(selectedDate);
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
        <Text style={styles.title}>Change Birth Date</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={showDate}>
          <TextInput style={styles.input}
            editable={false}
            value={results}
            placeholder="Birth Date"
            style={{color: 'black', width: '100%'}}
          />
        </TouchableOpacity>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
        <TouchableOpacity style={styles.btn} onPress={changeHandler}>
            <Text style={styles.btnText}>SAVE</Text>
        </TouchableOpacity>
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

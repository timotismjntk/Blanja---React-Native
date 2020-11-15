/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Alert, 
    Platform, 
    Text, 
    Switch, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// import components
import ChangePassword from '../components/ChangePassword';


export default function SettingAccount() {
    const [openModal, setOpenModal] = useState(false);

    const [isEnabledSales, setIsEnabledSales] = useState(false);
    const [isEnabledArrival, setIsEnabledArrival] = useState(false);
    const [isEnabledDelivery, setIsEnabledDelivery] = useState(false);

    const toggleSwitch = () => setIsEnabledSales(!isEnabledSales);
    const toggleSwitch2 = () => setIsEnabledArrival(!isEnabledArrival);
    const toggleSwitch3 = () => setIsEnabledDelivery(!isEnabledDelivery);

    const changePasswordToggle = () => {
        setOpenModal(true);
    };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [birthDate, setBirthdate] = useState('Date of Birth');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'android');
    const dates = currentDate.getDate();
    const months = currentDate.getMonth();
    const years = currentDate.getFullYear();
    setBirthdate(`${dates}/${months}/${years}`);

    setDate(currentDate);
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.subHeader}>Personal Information</Text>
        <View style={styles.inputContainer}>
            <TextInput placeholder="Full name" style={styles.input} />
        </View>
        <TouchableOpacity onPress={showDatepicker} style={[styles.inputContainer, {height: 65, paddingLeft: 30}]}>
            <Text style={{color: 'grey'}}>{birthDate}</Text>
        </TouchableOpacity>
        <View style={styles.passwordContainer}>
            <Text style={styles.password}>Password</Text>
            <TouchableOpacity onPress={changePasswordToggle}>
                <Text style={styles.changePassword}>Change</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} />
        </View>
        <Text style={styles.notifications}>Notifications</Text>
        <View style={styles.notificationsContainer}>
            <Text style={styles.sales}>Sales</Text>
            <Switch
                thumbColor={isEnabledSales ? '#2AA952' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabledSales}
            />
        </View>
        <View style={styles.notificationsContainer}>
            <Text style={styles.sales}>New arrivals</Text>
            <Switch
                thumbColor={isEnabledArrival ? '#2AA952' : '#f4f3f4'}
                onValueChange={toggleSwitch2}
                value={isEnabledArrival}
            />
        </View>
        <View style={[styles.notificationsContainer, styles.delivery]}>
            <Text style={styles.sales}>Delivery status changes</Text>
            <Switch
                thumbColor={isEnabledDelivery ? '#2AA952' : '#f4f3f4'}
                onValueChange={toggleSwitch3}
                value={isEnabledDelivery}
            />
        </View>
        <ChangePassword open={openModal} close={()=>setOpenModal(false)} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 16,
        marginTop: 15,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 20,
    },
    input: {
        height: 64,
        width: '100%',
        paddingLeft: 10,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    password: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    changePassword: {
        color:'grey',
    },
    notifications: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
    },
    notificationsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        // marginBottom: 80,
    },
    sales: {
        fontSize: 16,
        fontWeight: '600',
    },
    delivery: {
        marginBottom: 60,
    },
});

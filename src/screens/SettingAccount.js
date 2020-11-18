/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import ChangeName from '../components/ChangeName';
import ChangeEmail from '../components/ChangeEmail';
import ChangeBirthDate from '../components/ChangeBirthdate';


import profileAction from '../redux/actions/profile';

export default function SettingAccount() {
    const dispatch = useDispatch();
    const token = useSelector(state=>state.auth.token);
    const user = useSelector(state=>state.profile);
    const {data, updated} = user;

    useEffect(()=>{
        if (updated) {
          dispatch(profileAction.getProfile(token))
          .catch((err) => console.log(err.message));
          dispatch(profileAction.removeMessage());
        }
      },[dispatch, token, updated]);

    const [openModalPassword, setOpenModalPassword] = useState(false);
    const [openModalName, setOpenModalName] = useState(false);
    const [openModalEmail, setOpenModalEmail] = useState(false);
    const [openModalBirthDate, setOpenModalBirthdate] = useState(false);


    const [isEnabledSales, setIsEnabledSales] = useState(false);
    const [isEnabledArrival, setIsEnabledArrival] = useState(false);
    const [isEnabledDelivery, setIsEnabledDelivery] = useState(false);

    const toggleSwitch = () => setIsEnabledSales(!isEnabledSales);
    const toggleSwitch2 = () => setIsEnabledArrival(!isEnabledArrival);
    const toggleSwitch3 = () => setIsEnabledDelivery(!isEnabledDelivery);

    const changePasswordToggle = () => {
        setOpenModalPassword(true);
    };
    const changeNameToggle = () => {
        setOpenModalName(true);
    };
    const changeEmailToggle = () => {
        setOpenModalEmail(true);
    };
    const changeBirthdateToggle = () => {
        setOpenModalBirthdate(true);
    };

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.subHeader}>Personal Information</Text>
        <View style={styles.nameContainer}>
            <Text style={styles.name}>Full Name</Text>
            <TouchableOpacity onPress={changeNameToggle}>
                <Text style={styles.changeName}>Change</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TextInput placeholder="Full name" value={data.name} editable={false} style={styles.input} />
        </View>
        <View style={styles.emailContainer}>
            <Text style={styles.email}>Full Email</Text>
            <TouchableOpacity onPress={changeEmailToggle}>
                <Text style={styles.changeEmail}>Change</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TextInput placeholder="Email" value={data.email} editable={false} style={styles.input} />
        </View>
        <View style={styles.birthDateContainer}>
            <Text style={styles.name}>Birth Date</Text>
            <TouchableOpacity onPress={changeBirthdateToggle}>
                <Text style={styles.changeBirthdate}>Change</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <TextInput placeholder="Birth Date" value={data.dateOfBirth} editable={false} style={styles.input} />
        </View>
        <View style={styles.passwordContainer}>
            <Text style={styles.password}>Password</Text>
            <TouchableOpacity onPress={changePasswordToggle}>
                <Text style={styles.changePassword}>Change</Text>
            </TouchableOpacity>
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
        <ChangePassword open={openModalPassword} close={()=>setOpenModalPassword(false)} />
        <ChangeName open={openModalName} close={()=>setOpenModalName(false)} />
        <ChangeEmail open={openModalEmail} close={()=>setOpenModalEmail(false)} />
        <ChangeBirthDate open={openModalBirthDate} close={()=>setOpenModalBirthdate(false)} />

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
        color: 'black',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    birthDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 10,
    },
    password: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    changeName: {
        color:'grey',
    },
    changeEmail: {
        color:'grey',
    },
    changeBirthdate: {
        color:'grey',
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

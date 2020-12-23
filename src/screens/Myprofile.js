/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Thumbnail} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import {store, persistor} from '../redux/store';

// import actions
import profileAction from '../redux/actions/profile';
import logOutAction from '../redux/actions/auth';
import ordersAction from '../redux/actions/orders';
import addressAction from '../redux/actions/address';

// import env
import {API_URL} from '@env';

export default function Myprofile(props) {
  const dispatch = useDispatch();
  const [items, setItems] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  // logout
  const Logout = async () => {
    try {
      await persistor.purge();
      await persistor.purge();
      await persistor.flush();
      setTimeout(async () => await persistor.purge(), 200);
      setTimeout(() => dispatch(logOutAction.logout()), 200);
    } catch (err) {
      console.log(err.message);
    }
  };
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(profileAction.getProfile(token)).catch((err) =>
      console.log(err.message),
    );
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(ordersAction.readOrders(token)).catch((err) =>
      console.log(err.message),
    );
    dispatch(addressAction.getAddress(token)).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordersState = useSelector((state) => state.orders);
  const {data: order} = ordersState;

  const user = useSelector((state) => state.profile);
  const {data, updated, isUploaded} = user;

  const addressState = useSelector((state) => state.address);
  const {address} = addressState;

  useEffect(() => {
    if (updated) {
      dispatch(profileAction.getProfile(token)).catch((err) =>
        console.log(err.message),
      );
    }
  }, [dispatch, token, updated]);
  const myOrderHandler = () => {
    props.navigation.navigate('Myorder');
  };
  const addressHandler = () => {
    props.navigation.navigate('Address');
  };
  const settingAccountHandler = () => {
    props.navigation.navigate('Setting');
  };

  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Instagram'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const createFormData = (results) => {
    const image = new FormData();
    console.log(results);

    image.append('picture', {
      name: results.fileName,
      type: results.type,
      uri: results.uri,
    });
    console.log(image._parts[0][1]);
    if (results.fileSize > 500000) {
      setMessage('image size is too large, atleast < 500 kb');
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else {
      setItems(image._parts[0][1].uri);
      dispatch(profileAction.uploadProfileImage(token, image)).catch((err) =>
        console.log(err.message),
      );
    }
  };
  useEffect(() => {
    dispatch(profileAction.getProfile(token));
    if (isUploaded) {
      setMessage('Image Uploaded successfully');
      setVisible(true);
      dispatch(profileAction.getProfile(token)).catch((err) =>
        console.log(err.message),
      );
      dispatch(profileAction.removeMessage());
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [dispatch, token, isUploaded]);

  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar backgroundColor="blue" /> */}
      {/* <View style={{alignItems: 'flex-end', marginBottom: 5, marginTop: 25}}>
            <TouchableOpacity onPress={searchHandler}>
                <Icon name="search" size={30} />
            </TouchableOpacity>
        </View> */}
      <View>
        <Text style={styles.header}>My profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.imageContainer}>
            <Thumbnail
              source={
                data.profile_picture
                  ? {uri: data.profile_picture}
                  : {
                      uri: `https://ui-avatars.com/api/?size=50&name=${data.name}`,
                    }
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  createFormData(response);
                }
              });
            }}
            style={{
              position: 'absolute',
              right: 5,
              top: 60,
              borderWidth: 1,
              backgroundColor: 'grey',
              padding: 5,
              borderRadius: 25,
              borderColor: 'grey',
            }}>
            <Icon name="camera" size={10} color="black" />
          </TouchableOpacity>
          <Toast
            visible={visible}
            position={40}
            shadow={true}
            animation={true}
            hideOnPress={true}
            // textColor="yellow"
          >
            {message}
          </Toast>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.email}>{data.email}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.myOrder} onPress={myOrderHandler}>
          <View>
            <Text style={styles.myOrderText}>My orders</Text>
            <Text style={styles.subText}>
              Already have {order && order.length} orders
            </Text>
          </View>
          <Icon name="chevron-right" color="grey" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.myOrder} onPress={addressHandler}>
          <View>
            <Text style={styles.myOrderText}>Shipping addresses</Text>
            <Text style={styles.subText}>{address.length} addresses</Text>
          </View>
          <Icon name="chevron-right" color="grey" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.myOrder}
          onPress={settingAccountHandler}>
          <View>
            <Text style={styles.myOrderText}>Settings</Text>
            <Text style={styles.subText}>Notifications, password</Text>
          </View>
          <Icon name="chevron-right" color="grey" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.myOrder} onPress={Logout}>
          <View>
            <Text style={styles.myOrderText}>Logout</Text>
          </View>
          <Icon name="chevron-right" color="grey" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
  },
  imageContainer: {
    marginTop: 25,
    marginRight: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  profilePicture: {
    width: 64,
    height: 64,
    borderRadius: 150 / 2,
    resizeMode: 'contain',
  },
  profileInfo: {
    //
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'grey',
  },
  infoContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  myOrder: {
    width: '110%',
    borderWidth: 0.4,
    borderTopWidth: 0,
    borderColor: '#9B9B9B',
    height: 50,
    left: -10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  myOrderText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  subText: {
    color: 'grey',
    fontSize: 11,
  },
});

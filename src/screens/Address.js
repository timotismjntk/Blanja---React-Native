import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  FlatList,
  ScrollView,
  Alert,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// import action
import addressAction from '../redux/actions/address';

export default function Address(props) {
  const dispatch = useDispatch();

  const addressHandler = (id) => {
    props.navigation.navigate('ChangeAddress', {
      id: id,
    });
  };

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(addressAction.getAddress(token)).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectPrimaryAddress = (id) => {
    dispatch(addressAction.selectAddress(token, id)).catch((e) => {
      console.log(e.message);
    });
  };

  const AddNewAddress = () => {
    props.navigation.navigate('AddAddress');
  };

  const RenderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.card, item.isPrimary !== 1 && {borderColor: 'grey'}]}
      onPress={() => selectPrimaryAddress(item.id)}>
      <View style={styles.recipientContainer}>
        <Text style={styles.recipient}>{item.recipient_name}</Text>
        <TouchableOpacity onPress={() => addressHandler(item.id)}>
          <Text
            style={[styles.change, item.isPrimary !== 1 && {color: 'grey'}]}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressParent}>
        <Text style={styles.addressText}>
          {item.place}, {item.address_name}, {item.postal_code}, {item.city}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const addressState = useSelector((state) => state.address);
  const {address, isLoading, isSelect, isError} = addressState;
  const scrollRef = useRef(); // ref for flatlist to make scroll to top

  useEffect(() => {
    if (isSelect) {
      scrollRef.current.scrollToOffset({animated: true, offset: 0});
      dispatch(addressAction.getAddress(token)).catch((err) =>
        console.log(err.message),
      );
      setTimeout(() => {
        dispatch(addressAction.removeMessage());
        props.navigation.goBack();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelect]);
  return (
    <View style={styles.container}>
      {/* <View style={styles.search}>
        <Icon name="magnify" size={20} color="grey" />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View> */}
      <View style={{marginBottom: 10}}>
        <Text style={styles.header}>Shipping address</Text>
      </View>
      {address.length > 0 && (
        <FlatList
          data={address}
          ref={scrollRef}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View>
        <TouchableOpacity style={styles.btn} onPress={AddNewAddress}>
          <Text style={styles.btnText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    flex: 1,
  },
  search: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 30,
  },
  searchInput: {
    width: '100%',
    paddingLeft: 10,
    fontSize: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DB3022',
  },
  recipientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipient: {
    fontSize: 18,
  },
  change: {
    fontSize: 14,
    color: '#DB3022',
  },
  addressText: {
    fontSize: 14,
    color: 'grey',
    flexWrap: 'wrap',
    width: '80%',
  },
  addressParent: {
    flexWrap: 'wrap',
    marginTop: 5,
  },
  btn: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#222222',
    height: 48,
  },
  btnText: {
    color: 'black',
    fontSize: 14,
  },
});

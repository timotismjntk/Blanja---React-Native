/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ScrollView, Alert, FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from 'native-base';
import Toast from 'react-native-root-toast';

import orderPicture from '../assets/orderPicture.png';

import Icon from 'react-native-vector-icons/FontAwesome';

// import actions
import cartAction from '../redux/actions/cart';

// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

// import env
import {API_URL} from '@env';

const Mybags = (props) => {

  const token = useSelector(state=>state.auth.token);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);
  const [cartId, setCartId] = useState([]);
  const [product_id, setProductId] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const increaseAmountProductCart = (id, prodId, quantity) => {
    setProductId(prodId);
    setCartId(id);
    setQty(quantity + 1);
  };

  const decreaseAmountProductCart = (id, prodId, quantity) => {
      setProductId(prodId);
      setCartId(id);
      setQty(quantity - 1);
  };

  const deleteCartById = (id) => {
    dispatch(cartAction.deleteCart(token, Number(id)))
    .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const itemCart = ({ item, onPress, style }) => (
    <View style={{padding: 15}}>
      <View style={styles.card}>
        <Image source={{uri: API_URL + item.url}} style={styles.image} />
        <View style={styles.cardSub}>
          <View style={styles.cardSubParent}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity>
                <Picker
                  mode="dropdown"
                  style={{ width: 40, height: 80, top: 10, backgroundColor: 'white', color: 'white', position: 'absolute' }}
                  selectedValue={selected}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelected(itemValue === setSelected('key1') ? setSelected('key2') : setSelected('key1'));
                    deleteCartById(item.id);
                  }}
                >
                  <Picker.Item label="Are you sure?" value="key1" />
                  <Picker.Item label="Delete Item" color="red" value="key2" />
                </Picker>
              <Icon name="ellipsis-v" size={20} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardSubChildOne}>
            <View style={styles.color}>
              <Text style={styles.colorText}>Color:</Text>
              <Text style={styles.colorValue}>Gray</Text>
            </View>
            <View style={styles.size}>
              <Text style={styles.sizeText}>Size:</Text>
              <Text style={styles.sizeValue}>L</Text>
            </View>
          </View>
          <View style={styles.cardSubChildTwo}>
            <View style={styles.unit}>
              <View>
                <TouchableOpacity style={styles.btnMin} onPress={()=>{decreaseAmountProductCart(item.id, item.product_id, item.quantity)}}>
                  <Icon name="minus" size={20} color="grey" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.unitValue}>{item.quantity}</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.btnAdd} onPress={()=>{increaseAmountProductCart(item.id, item.product_id, item.quantity)}}>
                  <Icon name="plus" size={20} color="grey" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>{convertToRupiah(item.price)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
);
  const checkoutHandler = () =>{
    props.navigation.navigate('Checkout');
  };

  const searchHandler = () =>{
    props.navigation.navigate('Search');
};

useEffect(()=>{
    if (isChecked === false) {
        setTotalPrice(0);
    }
}, [isChecked]);

useEffect(()=>{
    setTimeout(()=>{
        dispatch(cartAction.getCart(token))
        .catch((err) => console.log(err.message));
    }, 200);
}, [dispatch, token]);

const quantityState = useSelector(state=>state.cart);
const {info, isError, isLoading, isSelected, isDelete, totalSummary} = quantityState;

useEffect(()=>{
    if (isLoading) {
        dispatch(cartAction.getCart(token))
        .catch((err) => console.log(err.message));
    }
}, [dispatch, isLoading, isError, token, info]);

useEffect(()=>{
    if (isDelete) {
        setMessage('Item deleted successfully');
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 3000);
        dispatch(cartAction.clearMessage());
    }
}, [cartId, dispatch, token, isSelected, isDelete]);

useEffect(()=>{
    if (info.length > 0) {
        info.map((items)=>{
            let a = 0;
            a += items;
        });
    }
}, [info]);

useEffect(()=>{
    if (qty){
        let data = {
            product_id: product_id,
            quantity: qty,
        };
        dispatch(cartAction.patchQuantityCart(token, data, {user_id: cartId}, product_id));
        setTimeout(() =>{
            dispatch(cartAction.getCart(token))
            .catch((err) => console.log(err.message));
        });
    }
}, [dispatch, product_id, isSelected, qty, cartId, token, totalPrice]);


  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'white', padding: 5, paddingBottom: 15}}>
        <View style={{alignItems: 'flex-end', marginVertical: 5, paddingRight: 10}}>
          <TouchableOpacity onPress={searchHandler}>
              <Icon name="search" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{padding: 10, paddingTop: 0}}>
          <Text style={styles.header}>My Bag</Text>
        </View>
      </View>
      {info.length
      ? <FlatList
        data={info}
        renderItem={itemCart}
        keyExtractor={(item) => item.name + item.id.toString()}
        // extraData={selectedId}
        /> :
        <View style={{flex: 1, padding: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>Ooopsss....</Text>
          <Text>likely you not have any item in your cart.</Text>
        </View>}
      {/* <View style={{marginBottom: 100}}>
      </View> */}

      <View style={styles.Checkout}>
        <View style={styles.amount}>
            <Text style={styles.total}>Total amount:</Text>
            <Text style={styles.price}>{info.length ? convertToRupiah(totalSummary) : convertToRupiah(0)}</Text>
          </View>
          <TouchableOpacity style={styles.btnCheck} onPress={checkoutHandler}>
            <Text style={styles.checkoutText}>CHECK OUT</Text>
          </TouchableOpacity>
      </View>
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
  );
};

export default Mybags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // marginTop: 35,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#e5e5e5',
    // justifyContent: 'space-between'
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  card: {
    // marginTop: 25,
    // marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    height: 104,
    width: '100%',
    flexDirection: 'row',
  },
  cardSub: {
    // backgroundColor: 'red',
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    // justifyContent: 'center',
  },
  cardSubParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSubChildOne: {
    flexDirection: 'row',
  },
  cardSubChildTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
    borderRadius: 10,
    // marginLeft: 5,
  },
  color: {
    flexDirection: 'row',
  },
  colorText: {
    fontSize: 11,
    color: 'grey',
  },
  colorValue: {
    fontSize: 11,
    paddingLeft: 5,
  },
  size: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  sizeText: {
    fontSize: 11,
    color: 'grey',
  },
  sizeValue: {
    fontSize: 11,
    paddingLeft: 5,
  },
  unit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: 100,
    justifyContent: 'space-between',
  },
  btnMin: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(10, 10, 10, 0.3)',
    borderRadius: 25,
  },
  btnAdd: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(10, 10, 10, 0.3)',
    borderRadius: 25,
  },
  Checkout: {
    // flex: 1,
    // height: 100,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
    // marginTop: 40,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    // top: 435,
    position: 'relative',
    // backgroundColor: 'red',
  },
  amount: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnCheck: {
    width:'100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#DB3022',
  },
  total: {
    color: 'grey',
  },
  checkoutText: {
    color: 'white',
  },
});

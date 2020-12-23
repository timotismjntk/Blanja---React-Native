/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Alert,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from 'native-base';
import Toast from 'react-native-root-toast';

// import components
import ModalDeleteCart from '../components/ModalDeleteCart';

import Icon from 'react-native-vector-icons/FontAwesome';

// import actions
import cartAction from '../redux/actions/cart';

// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

// import env
import {API_URL} from '@env';

const Mybags = (props) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);
  const [cartId, setCartId] = useState([]);
  const [product_id, setProductId] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const deleteCartById = () => {
    dispatch(cartAction.deleteCart(token, Number(product_id))).catch((err) =>
      console.log(err.message),
    );
    console.log(product_id);
    setOpenModal(false);
  };

  const itemCart = ({item, onPress, style}) => (
    <View style={{padding: 15}}>
      <View style={styles.card}>
        <Image source={{uri: API_URL + item.url}} style={styles.image} />
        <View style={styles.cardSub}>
          <View style={styles.cardSubParent}>
            <Text style={styles.productName}>
              {item.name.length > 20
                ? item.name.slice(0, 20) + '...'
                : item.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setOpenModal(true);
                setProductId(item.id);
              }}>
              <ModalDeleteCart
                open={openModal}
                close={() => setOpenModal(false)}
                press={deleteCartById}
              />
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
                <TouchableOpacity
                  style={styles.btnMin}
                  onPress={() => {
                    decreaseAmountProductCart(
                      item.id,
                      item.product_id,
                      item.quantity,
                    );
                  }}>
                  <Icon name="minus" size={20} color="grey" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.unitValue}>{item.quantity}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    increaseAmountProductCart(
                      item.id,
                      item.product_id,
                      item.quantity,
                    );
                  }}>
                  <Icon name="plus" size={20} color="grey" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                {convertToRupiah(item.price)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
  const checkoutHandler = () => {
    props.navigation.navigate('Checkout');
  };

  useEffect(() => {
    if (isChecked === false) {
      setTotalPrice(0);
    }
  }, [isChecked]);

  useEffect(() => {
    dispatch(cartAction.getCart(token)).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(cartAction.getCart(token)).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const quantityState = useSelector((state) => state.cart);
  const {data, isDelete, totalSummary} = quantityState;

  useEffect(() => {
    if (isDelete) {
      setMessage('Item deleted successfully');
      setVisible(true);
      setTimeout(() => {
        dispatch(cartAction.getCart(token)).catch((err) =>
          console.log(err.message),
        );
        setVisible(false);
      }, 300);
      dispatch(cartAction.clearMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete]);

  useEffect(() => {
    if (qty) {
      let add = {
        product_id: product_id,
        quantity: qty,
      };
      dispatch(
        cartAction.patchQuantityCart(token, add, {user_id: cartId}, product_id),
      );
      setTimeout(() => {
        dispatch(cartAction.getCart(token)).catch((err) =>
          console.log(err.message),
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty]);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'white', paddingBottom: 15}}>
        <View style={{padding: 10}}>
          <Text style={styles.header}>My Bag</Text>
        </View>
      </View>
      {data.length ? (
        <FlatList
          data={data}
          renderItem={itemCart}
          keyExtractor={(item) => item.name + item.id.toString()}
        />
      ) : (
        <View style={{flex: 1, padding: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
            Ooopsss....
          </Text>
          <Text>likely you not have any item in your cart.</Text>
        </View>
      )}
      <View style={styles.myBag}>
        <View style={styles.amount}>
          <Text style={styles.total}>Total amount:</Text>
          <Text style={styles.price}>
            {data.length ? convertToRupiah(totalSummary) : convertToRupiah(0)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnCheck}
          disabled={data.length > 0 ? false : true}
          onPress={checkoutHandler}>
          <Text style={styles.myBagText}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
      <Toast
        visible={visible}
        position={40}
        shadow={true}
        animation={true}
        hideOnPress={true}>
        {message}
      </Toast>
    </View>
  );
};

export default Mybags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#e5e5e5',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    // paddingLeft: 0,
    // height: 104,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSub: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
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
    width: 80,
    height: 80,
    resizeMode: 'contain',
    // borderRadius: 10,
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
  myBag: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    position: 'relative',
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
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#DB3022',
  },
  total: {
    color: 'grey',
  },
  myBagText: {
    color: 'white',
  },
});

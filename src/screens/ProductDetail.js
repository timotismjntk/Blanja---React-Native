import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Alert,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheet, RadioButton} from 'react-native-btr';

// Import component
import Rating from '../components/Rating';
import SuggestProduct from '../components/SuggestProduct';

// import actions
import getDetailProductIdAction from '../redux/actions/detailProduct';
import cartAction from '../redux/actions/cart';

// Import image
import Line from '../assets/line.png';
import ProductDetailImage from '../assets/productDetail.png';

// import env
import {API_URL} from '@env';

// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

// const renderItem = ({item, index}) => {
//     // console.log(item);
//     return (
//         <View style={styles.card}>
//             <Image style={styles.image} source={{uri: API_URL + item.url}} />
//         </View>
//     );
// };

export default function ProductDetail({route, navigation}) {
  const [visibleSizing, setVisibleSizing] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [visibleColor, setVisibleColor] = useState(false);
  const [isCheckedBlack, setIsCheckedBlack] = useState(false);
  const [isCheckedRed, setIsCheckedRed] = useState(false);
  const [isCheckedBlue, setIsCheckedBlue] = useState(false);
  const [isCheckedGreen, setIsCheckedGreen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    selectedSize.length && Alert.alert(selectedSize);
  }, [selectedSize]);

  const toggleBottomModalSizing = () => {
    setVisibleSizing(!visibleSizing);
  };
  const toggleBottomModalColor = () => {
    setVisibleColor(!visibleColor);
  };

  const blackColorHandler = () => {
    setIsCheckedBlack(!isCheckedBlack);
    setIsCheckedRed(false);
    setIsCheckedBlue(false);
    setIsCheckedGreen(false);
  };
  const redColorHandler = () => {
    setIsCheckedBlack(false);
    setIsCheckedRed(!isCheckedRed);
    setIsCheckedBlue(false);
    setIsCheckedGreen(false);
  };
  const blueColorHandler = () => {
    setIsCheckedBlack(false);
    setIsCheckedRed(false);
    setIsCheckedBlue(!isCheckedBlue);
    setIsCheckedGreen(false);
  };
  const greenColorHandler = () => {
    setIsCheckedBlack(false);
    setIsCheckedRed(false);
    setIsCheckedBlue(false);
    setIsCheckedGreen(!isCheckedGreen);
  };

  const {id, title} = route.params;

  useEffect(() => {
    dispatch(getDetailProductIdAction.getDetailProducts(id));
    navigation.setOptions({headerTitle: title});
  }, [dispatch, id, navigation, title]);

  const {token} = useSelector((state) => state.auth);
  const quantityState = useSelector((state) => state.cart);
  const {quantity, isAdded, isError} = quantityState;
  const productState = useSelector((state) => state.detailproduct);
  const {data, price} = productState;

  const createCart = (e) => {
    e.preventDefault();
    // alert(quantity)
    let dataCart = {
      product_id: id,
      quantity,
    };
    dispatch(cartAction.createCart(token, dataCart));
  };

  useEffect(() => {
    console.log(data.price);
  }, [data]);
  return (
    <>
      {data ? (
        <>
          <ScrollView>
            {/* <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={500}
                itemWidth={200}
                /> */}
            <View style={styles.card}>
              <Image style={styles.image} source={{uri: API_URL + data.url}} />
            </View>
            <View style={styles.container}>
              <View style={styles.btnInfo}>
                <TouchableOpacity
                  onPress={toggleBottomModalSizing}
                  style={styles.btnSisCo}>
                  <Text>Size</Text>
                  <Icon name="menu-down" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleBottomModalColor}
                  style={styles.btnSisCo}>
                  <Text>Color</Text>
                  <Icon name="menu-down" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnHeart}>
                  <Icon name="heart-outline" color={'grey'} size={15} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.productParent}>
                  <Text style={styles.productName}>{data.name}</Text>
                  <Text style={styles.price}>
                    {data.length > 0 ? convertToRupiah(data.price) : 'Rp. 0'}
                  </Text>
                </View>
                <Text style={styles.product}>{data.category_name}</Text>
                <Rating number={data.length > 0 ? data.total_rating : 0} />
              </View>
              <View>
                <Text style={styles.description}>{data.description}</Text>
              </View>
              <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.sizeShipping}>
                  <Text style={styles.sizeShippingText}>Shipping info</Text>
                  <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sizeShipping, styles.sizeSupport]}>
                  <Text style={styles.sizeShippingText}>Support</Text>
                  <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
                <SuggestProduct />
              </View>
            </View>
            {/* For sizing modal */}
            <BottomSheet
              visible={visibleSizing}
              onBackButtonPress={toggleBottomModalSizing}
              onBackdropPress={toggleBottomModalSizing}>
              <View style={styles.modalSize}>
                <View style={styles.line}>
                  <Image source={Line} />
                </View>
                <Text style={styles.textSize}>Select size</Text>
                <View style={styles.bottomModalSize}>
                  <TouchableOpacity
                    onPress={() => setSelectedSize('XS')}
                    style={styles.btnSizing}>
                    <Text>XS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedSize('S')}
                    style={styles.btnSizing}>
                    <Text>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedSize('M')}
                    style={styles.btnSizing}>
                    <Text>M</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedSize('L')}
                    style={styles.btnSizing}>
                    <Text>L</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedSize('XL')}
                    style={styles.btnSizing}>
                    <Text>XL</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.sizeInfo}
                  onPress={toggleBottomModalSizing}>
                  <Text style={styles.sizeInfoText}>Size info</Text>
                  <Icon name="chevron-right" size={25} />
                </TouchableOpacity>
              </View>
            </BottomSheet>
            {/*For color modal */}
            <BottomSheet
              visible={visibleColor}
              onBackButtonPress={toggleBottomModalColor}
              onBackdropPress={toggleBottomModalColor}>
              <View style={styles.modalColor}>
                <View style={styles.line}>
                  <Image source={Line} />
                </View>
                <Text style={styles.textSize}>Select Color</Text>
                <View style={styles.bottomModalColor}>
                  <View>
                    <RadioButton
                      borderWidth={2}
                      checked={isCheckedBlack}
                      color="black"
                      disabled={false}
                      size={14}
                      onPress={blackColorHandler}
                    />
                  </View>
                  <View>
                    <RadioButton
                      borderWidth={2}
                      checked={isCheckedRed}
                      color="red"
                      disabled={false}
                      size={14}
                      onPress={redColorHandler}
                    />
                  </View>
                  <View>
                    <RadioButton
                      borderWidth={2}
                      checked={isCheckedBlue}
                      color="#4290D8"
                      disabled={false}
                      size={14}
                      onPress={blueColorHandler}
                    />
                  </View>
                  <View>
                    <RadioButton
                      borderWidth={2}
                      checked={isCheckedGreen}
                      color="#42D86C"
                      disabled={false}
                      size={14}
                      onPress={greenColorHandler}
                    />
                  </View>
                </View>
              </View>
            </BottomSheet>
            {/* < */}
          </ScrollView>
          <View style={styles.AddToCart}>
            <TouchableOpacity style={styles.btnAddTocart} onPress={createCart}>
              <Text style={styles.AddToCartText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    // height: 300,
    // width: '100%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // left: -65,
    padding: 0,
    backgroundColor: 'white',
    // marginRight: 1,
  },
  cardContainer: {
    marginTop: 3,
    padding: 5,
    // flex: 1,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 300,
    // flex: 1,
    // width: '100%',
  },
  btnInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 10,
  },
  btnSisCo: {
    width: 138,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9B9B9B',
    // backgroundColor: 'red',
  },
  btnHeart: {
    borderColor: '0px 4px 4px rgba(0, 0, 0, 0.08)',
    // elevation: 1.5,
    // borderRadius: 8,
    borderWidth: 2,
    // borderColor: '#9B9B9B',
    width: 36,
    height: 36,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productParent: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  product: {
    color: 'grey',
    fontSize: 11,
  },
  productName: {
    fontSize: 24,
    width: 190,
    color: '#222222',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#222222',
    // width: 100,
    fontWeight: 'bold',
  },
  description: {
    padding: 10,
    color: '#222222',
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  sizeShipping: {
    width: '110%',
    borderWidth: 0.4,
    borderColor: '#9B9B9B',
    height: 50,
    left: -10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  sizeShippingText: {
    fontSize: 16,
    color: '#222222',
  },
  sizeSupport: {
    marginBottom: 15,
  },
  modalSize: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: 276,
    // borderRadius: 25,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    alignItems: 'center',
    paddingLeft: 20,
  },
  modalColor: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: 150,
    // borderRadius: 25,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    alignItems: 'center',
    paddingLeft: 20,
  },
  line: {
    marginTop: 10,
  },
  textSize: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomModalSize: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  bottomModalColor: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 20,
    // justifyContent: 'center',
  },
  btnSizing: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    marginRight: 10,
    marginTop: 30,
    borderColor: '0px 4px 4px rgba(0, 0, 0, 0.08)',
    // elevation: 1.5,
    // borderRadius: 8,
    borderWidth: 2,
    // borderColor: '#9B9B9B',
    borderRadius: 10,
  },
  sizeInfo: {
    width: '105%',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#9B9B9B',
    height: 50,
    left: -10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    flexDirection: 'row',
  },
  sizeInfoText: {
    fontSize: 15,
    color: '#222222',
  },
  AddToCart: {
    // flex: 1,
    height: 100,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: 30,
    // marginTop: 40,
    backgroundColor: 'white',
    padding: 10,
    // paddingTop: 50,
    width: '100%',
    top: 415,
    justifyContent: 'center',
    zIndex: 2,
    position: 'absolute',
    // backgroundColor: 'red',
  },
  amount: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnAddTocart: {
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
  AddToCartText: {
    color: 'white',
  },
});

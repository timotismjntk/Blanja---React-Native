import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {API_URL} from '@env';

// import image
import filter from '../assets/filter.png';
import sort from '../assets/sort.png';
import shape from '../assets/Shape.png';
import order from '../assets/orderPicture.png';

// import components
import Rating from '../components/Rating';

// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

// import Action
import AllProductAction from '../redux/actions/allProduct';

const ViewProduct = ({route}) => {
  const detailProduct = (itemId, itemName) => {
    navigation.navigate('ProductDetail', {
      id: itemId,
      title: itemName,
    });
  };

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={() => detailProduct(item.id, item.name)}
      style={[styles.product, style]}>
      <Image source={{uri: API_URL + item.url}} style={styles.image} />
      <View style={styles.containerCard}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.storeName}>
          {item.store_name.length > 0 ? item.store_name : 'Zalora'}
        </Text>
        <Rating number={item.total_rating} />
        <Text style={styles.price}>
          {item ? convertToRupiah(item.price) : 'Rp. 0'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {search} = route.params;

  console.log(route);
  useEffect(() => {
    dispatch(AllProductAction.getProduct()).catch((err) =>
      console.log(err.message),
    );
  }, [dispatch]);

  useEffect(() => {
    if (search.length) {
      dispatch(AllProductAction.getProduct(search)).catch((err) =>
        console.log(err.message),
      );
      console.log(search);
    }
  }, [dispatch, search]);

  const productState = useSelector((state) => state.allProduct);

  const {data} = productState;
  const gotoFilter = () => navigation.navigate('FilterProduct');
  return (
    <View style={{flex: 1}}>
      <View style={styles.parent}>
        {/* <Text style={styles.header}>Shorts</Text> */}
        <View style={styles.nav}>
          <TouchableOpacity style={styles.subNav} onPress={gotoFilter}>
            <Image source={filter} style={styles.icon} />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subNav}>
            <Image source={sort} style={styles.icon} />
            <Text>Price: lowest to high</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subNav}>
            <Image source={shape} />
          </TouchableOpacity>
        </View>
      </View>
      {data.length ? (
        <View style={styles.item}>
          <FlatList
            data={data}
            renderItem={Item}
            keyExtractor={(item) => item.id.toString()}
            // extraData={selectedId}
          />
        </View>
      ) : (
        <View style={{padding: 10}}>
          <Text>Oops product not found</Text>
        </View>
      )}
    </View>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    padding: 10,
    paddingTop: 10,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F0',
    padding: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  subNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  item: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    flex: 1,
    // marginBottom: 300,
  },
  product: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeName: {
    color: 'grey',
    marginVertical: 5,
  },
  price: {
    marginTop: 5,
  },
  image: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
  },
  containerCard: {
    marginLeft: 10,
    justifyContent: 'center',
  },
});

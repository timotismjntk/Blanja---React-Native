import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.product, style]}>
    <Image source={order} style={styles.image} />
    <View style={styles.containerCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.storeName}>
        {item.store_name.length > 0 ? item.store_name : 'Zalora'}
      </Text>
      <Rating number={item.rating_id} />
      <Text style={styles.price}>
        {item ? convertToRupiah(item.price) : 'Rp. 0'}
      </Text>
    </View>
  </TouchableOpacity>
);

const ViewProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllProductAction.getProduct());
  }, [dispatch]);

  const productState = useSelector((state) => state.allProduct);

  const {data} = productState;
  return (
    <View style={{flex: 1}}>
      <View style={styles.parent}>
        <Text style={styles.header}>Shorts</Text>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.subNav}>
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
      <View style={styles.item}>
        <FlatList
          data={data}
          renderItem={Item}
          keyExtractor={(item) => item.id.toString()}
          // extraData={selectedId}
        />
      </View>
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

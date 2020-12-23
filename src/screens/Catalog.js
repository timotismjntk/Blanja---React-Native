/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useMemo} from 'react';
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
import {BottomSheet} from 'react-native-btr';

import {API_URL} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';

// import image
import filter from '../assets/filter.png';
import sort from '../assets/sort.png';
import shape from '../assets/Shape.png';
import Line from '../assets/line.png';

// import components
import Rating from '../components/Rating';

// import helpers
import convertToRupiah from '../helpers/rupiahConverter';

// import Action
import AllProductAction from '../redux/actions/allProduct';

const Catalog = ({route}) => {
  const detailProduct = (itemId, itemName) => {
    navigation.navigate('ProductDetail', {
      id: itemId,
      title: itemName,
    });
  };

  const ListItem = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={() => detailProduct(item.id, item.category_name)}
      style={styles.product}>
      <Image source={{uri: API_URL + item.url}} style={styles.image} />
      <View style={styles.containerCard}>
        <Text style={styles.productName_List}>
          {item.name.length > 30 ? item.name.slice(0, 25) + '...' : item.name}
        </Text>
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

  const GridItem = ({item, onPress, style}) => (
    <>
      <TouchableOpacity
        onPress={() => detailProduct(item.id, item.category_name)}
        style={styles.gridProduct}>
        <Image source={{uri: API_URL + item.url}} style={styles.image} />
        <Text style={styles.productName_Grid}>
          {item.name.length > 30 ? item.name.slice(0, 25) + '...' : item.name}
        </Text>
        <Text style={styles.storeName}>
          {item.store_name.length > 0 ? item.store_name : 'Zalora'}
        </Text>
        <Rating number={item.total_rating} />
        <Text style={styles.price}>
          {item ? convertToRupiah(item.price) : 'Rp. 0'}
        </Text>
      </TouchableOpacity>
      <View style={{padding: 5}} />
    </>
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {search, categoryName} = route.params; // categoryName passing from screen category
  const [sortBy, setSortBy] = useState('');
  const [sortByText, setSortByText] = useState('Price: lowest to high');
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    // dispatch action if categoryName is passing
    if (categoryName) {
      navigation.setOptions({headerTitle: categoryName});
      if (categoryName !== 'New' && categoryName !== 'Popular') {
        dispatch(
          AllProductAction.getProductByCategory(categoryName),
        ).catch((err) => console.log(err.message));
      } else {
        if (categoryName === 'New') {
          dispatch(
            AllProductAction.getProductByCategory('', 'created_at', 'DESC'),
          ).catch((err) => console.log(err.message));
        }
        if (categoryName === 'Popular') {
          dispatch(
            AllProductAction.getProduct('', 'rating_id', 'DESC'),
          ).catch((err) => console.log(err.message));
        }
      }
    } else if (search) {
      dispatch(AllProductAction.getProduct(search)).catch((err) =>
        console.log(err.message),
      );
    } else {
      dispatch(AllProductAction.getProduct()).catch((err) =>
        console.log(err.message),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, search]);

  // console.log(route);

  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const toggleBottomSheet = () => {
    setOpenBottomSheet(!openBottomSheet);
  };

  useEffect(() => {
    if (sortBy.length > 0) {
      scrollRef.current.scrollToOffset({animated: true, offset: 0});
      setStoreData(data); // reset concat data, to prevent duplicated key in flatlist
      // ref for flatlist to make scroll to top
      toggleBottomSheet();
      if (sortBy === 'lowest') {
        if (categoryName !== 'New') {
          dispatch(
            AllProductAction.getProductByCategory(categoryName, 'price', 'ASC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else if (search) {
          dispatch(
            AllProductAction.getProduct(search, 'price', 'ASC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else {
          dispatch(
            AllProductAction.getProduct('', 'price', 'ASC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        }
      } else if (sortBy === 'highest') {
        if (categoryName) {
          dispatch(
            AllProductAction.getProductByCategory(
              categoryName,
              'price',
              'DESC',
            ),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else if (search) {
          dispatch(
            AllProductAction.getProduct(search, 'price', 'DESC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else {
          dispatch(
            AllProductAction.getProduct('', 'price', 'DESC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        }
      } else if (sortBy === 'Popular') {
        if (categoryName) {
          dispatch(
            AllProductAction.getProductByCategory(
              categoryName,
              'rating_id',
              'DESC',
            ),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else if (search) {
          dispatch(
            AllProductAction.getProduct(search, 'rating_id', 'DESC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else {
          dispatch(
            AllProductAction.getProduct('', 'rating_id', 'DESC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        }
      } else if (sortBy === 'Newest') {
        if (categoryName) {
          dispatch(
            AllProductAction.getProductByCategory(
              categoryName,
              'created_at',
              'DESC',
            ),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else if (search) {
          dispatch(
            AllProductAction.getProduct(search, 'created_at', 'DESC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        } else {
          dispatch(
            AllProductAction.getProduct('', 'created_at', 'DESC'),
          ).catch((err) => console.log(err.message));
          setSortBy('');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const bottomSheetCustom = () => (
    <BottomSheet
      visible={openBottomSheet}
      onBackButtonPress={toggleBottomSheet}
      onBackdropPress={toggleBottomSheet}>
      <View style={styles.bottomSheet}>
        <View style={styles.line}>
          <Image source={Line} />
          <Text style={{fontSize: 20, marginTop: 10}}>Sort by</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.bottomSheetBtn,
            sortBy === 'Popular' && {backgroundColor: '#DB3022'},
          ]}
          onPress={() => {
            setSortBy('Popular');
            setSortByText('Popular');
          }}>
          <Text
            style={[
              styles.bottomSheetBtnText,
              sortBy === 'Popular' && {color: 'white'},
            ]}>
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomSheetBtn,
            sortBy === 'Newest' && {backgroundColor: '#DB3022'},
          ]}
          onPress={() => {
            setSortBy('Newest');
            setSortByText('Newest');
          }}>
          <Text
            style={[
              styles.bottomSheetBtnText,
              sortBy === 'Newest' && {color: 'white'},
            ]}>
            Newest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomSheetBtn,
            sortBy === 'lowest' && {backgroundColor: '#DB3022'},
          ]}
          onPress={() => {
            setSortBy('lowest');
            setSortByText('Price: lowest to hight');
          }}>
          <Text
            style={[
              styles.bottomSheetBtnText,
              sortBy === 'lowest' && {color: 'white'},
            ]}>
            Price: lowest to high
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomSheetBtn,
            sortBy === 'highest' && {backgroundColor: '#DB3022'},
          ]}
          onPress={() => {
            setSortBy('highest');
            setSortByText('Price: highest to low');
          }}>
          <Text
            style={[
              styles.bottomSheetBtnText,
              sortBy === 'highest' && {color: 'white'},
            ]}>
            Price: highest to low
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );

  const productState = useSelector((state) => state.allProduct);

  const {data, isLoading, pageInfo} = productState;
  const gotoFilter = () => navigation.navigate('FilterProduct');

  useEffect(() => {
    if (data) {
      setStoreData(data);
    }
  }, [data]);

  // select for list or grid view
  const [renderView, setRenderView] = useState('grid');

  const refreshData = () => {
    setSortBy('');
    navigation.setOptions({headerTitle: ''});
    navigation.navigate('Shop', {
      screen: 'Catalog',
      params: {
        id: 1,
        search: '',
        categoryName: '',
      },
    });
    scrollRef.current.scrollToOffset({animated: true, offset: 0}); //ref for flatlist to make scroll to top
    dispatch(
      AllProductAction.getProduct('', 'created_at', 'DESC'),
    ).catch((err) => console.log(err.message));
  };

  const moreProduct = () => {
    if (pageInfo.nextLink) {
      const nextPage = pageInfo.currentPage + 1;
      if (sortBy.length > 0) {
        if (sortBy === 'lowest') {
          if (categoryName !== 'New') {
            dispatch(
              AllProductAction.getProductByCategory(
                categoryName,
                'price',
                'ASC',
                nextPage,
              ),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else if (search) {
            dispatch(
              AllProductAction.getProduct(search, 'price', 'ASC', nextPage),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else {
            dispatch(
              AllProductAction.getProduct('', 'price', 'ASC', nextPage),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          }
        } else if (sortBy === 'highest') {
          if (categoryName) {
            dispatch(
              AllProductAction.getProductByCategory(
                categoryName,
                'price',
                'DESC',
                nextPage,
              ),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else if (search) {
            dispatch(
              AllProductAction.getProduct(search, 'price', 'DESC', nextPage),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else {
            dispatch(
              AllProductAction.getProduct('', 'price', 'DESC', nextPage),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          }
        } else if (sortBy === 'Popular') {
          if (categoryName) {
            dispatch(
              AllProductAction.getProductByCategory(
                categoryName,
                'rating_id',
                'DESC',
                nextPage,
              ),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else if (search) {
            dispatch(
              AllProductAction.getProduct(
                search,
                'rating_id',
                'DESC',
                nextPage,
              ),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else {
            dispatch(
              AllProductAction.getProduct('', 'rating_id', 'DESC', nextPage),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          }
        } else if (sortBy === 'Newest') {
          if (categoryName) {
            dispatch(
              AllProductAction.getProductByCategory(
                categoryName,
                'created_at',
                'DESC',
                nextPage,
              ),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          } else if (search) {
            dispatch(
              AllProductAction.getProduct(
                search,
                'created_at',
                'DESC',
                nextPage,
              ),
            ).catch((err) => console.log(err.message));
            setSortBy('');
          }
        }
      } else if (
        !search &&
        !categoryName &&
        search.length === 0 &&
        categoryName.length === 0
      ) {
        dispatch(
          AllProductAction.getProduct('', 'created_at', 'DESC', nextPage),
        ).catch((err) => console.log(err.message));
        setSortBy('');
      }
    }
  };

  useEffect(() => {
    if (pageInfo.currentPage > 1) {
      const newData = storeData.concat(...data);
      setStoreData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]); // infinite scroll effect

  const scrollRef = useRef(); // ref for flatlist to make scroll to top
  // using memo to prevent VirtualizedList: You have a large list that is slow to update
  const memoizedValue = useMemo(
    () => (renderView === 'grid' ? GridItem : ListItem),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderView, storeData],
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.subNav} onPress={gotoFilter}>
            <Image source={filter} style={styles.icon} />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subNav} onPress={toggleBottomSheet}>
            <Image source={sort} style={styles.icon} />
            <Text>{sortByText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subNav}
            onPress={() =>
              renderView === 'grid'
                ? setRenderView('list')
                : setRenderView('grid')
            }>
            {renderView === 'grid' ? (
              <Image source={shape} />
            ) : (
              <Icon name="list" size={16} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {storeData.length ? (
        <View style={styles.item}>
          {renderView === 'grid' ? (
            <FlatList
              key={'_'}
              ref={scrollRef}
              data={storeData}
              renderItem={memoizedValue}
              keyExtractor={(item, index) => '_' + index.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading}
              onRefresh={refreshData}
              onEndReachedThreshold={0.3}
              onEndReached={moreProduct}
            />
          ) : (
            <FlatList
              key={'#'}
              ref={scrollRef}
              data={storeData}
              renderItem={memoizedValue}
              keyExtractor={(item, index) => '#' + index.toString()}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading}
              onRefresh={refreshData}
              onEndReachedThreshold={0.3}
              onEndReached={moreProduct}
            />
          )}
        </View>
      ) : (
        <View style={{padding: 10}}>
          <Text>Oops product not found</Text>
        </View>
      )}
      {bottomSheetCustom()}
    </View>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  parent: {
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
  },
  product: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  gridProduct: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 33,
  },
  productName_List: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productName_Grid: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
  },
  storeName: {
    color: 'grey',
    marginVertical: 5,
  },
  price: {
    marginTop: 5,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  containerCard: {
    marginLeft: 20,
  },
  bottomSheet: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
  },
  bottomSheetBtn: {
    padding: 15,
    paddingBottom: 10,
  },
  bottomSheetBtnText: {
    fontSize: 20,
    color: 'grey',
  },
  line: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const dataColor = [
  {
    id: 1,
    hex: '#000000',
  },
  {
    id: 2,
    hex: '#F6F6F6',
  },
  {
    id: 3,
    hex: '#B82222',
  },
  {
    id: 4,
    hex: '#BEA9A9',
  },
  {
    id: 5,
    hex: '#E2BB8D',
  },
  {
    id: 6,
    hex: '#151867',
  },
];

// import Action
import ProductCategoryAction from '../redux/actions/categoryProduct';

const FilterProduct = (props) => {
  const [selectedId, setSelectedId] = useState([]);
  const [selectedSize, setSelectedSize] = useState(false);
  const dispatch = useDispatch();

  const [xs, setXs] = useState(false);
  const [s, setS] = useState(false);
  const [m, setM] = useState(false);
  const [l, setL] = useState(false);
  const [xl, setXl] = useState(false);
  const [all, setAll] = useState(false);
  const [category, setCategory] = useState('');

  const applyFilter = () => {
    props.navigation.navigate('Shop', {
      screen: 'Catalog',
      params: {
        id: 1,
        search: '',
        categoryName: category,
      },
    });
    setCategory('');
  };

  const checkBox = ({item}) => (
    <TouchableOpacity
      style={
        item.id === selectedId
          ? [styles.wrapper]
          : {marginTop: 4, marginLeft: 5}
      }
      onPress={() => setSelectedId(item.id)}>
      <View style={[styles.myCheckBox, {backgroundColor: item.hex}]} />
    </TouchableOpacity>
  );

  useEffect(() => {
    dispatch(ProductCategoryAction.getCatProduct()).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderCategory = ({item, index}) => (
    <TouchableOpacity
      style={
        item.category_name !== category
          ? {
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
              borderColor: '#E5E5E5',
              padding: 7,
              height: 45,
              width: 80,
              marginBottom: 10,
              marginRight: 15,
              // marginLeft: 15,
            }
          : {
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: '#E5E5E5',
              padding: 7,
              height: 45,
              marginBottom: 10,
              width: 80,
              marginRight: 15,
              backgroundColor: '#DB3022',
            }
      }
      onPress={() => setCategory(item.category_name)}>
      <Text
        style={
          item.category_name === category ? {color: 'white'} : {color: 'black'}
        }>
        {item.category_name}
      </Text>
    </TouchableOpacity>
  );

  const categoryState = useSelector((state) => state.categoryProduct);
  const {data} = categoryState;

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Colors</Text>
          <FlatList
            horizontal
            data={dataColor}
            renderItem={checkBox}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'space-between',
              marginVertical: 15,
              backgroundColor: 'white',
              paddingVertical: 25,
              paddingHorizontal: 10,
            }}
          />
          <Text style={styles.title}>Sizes</Text>
          <View style={styles.parent}>
            <TouchableOpacity
              style={[
                styles.btn,
                xs ? {backgroundColor: '#DB3022', color: 'white'} : styles.btn,
              ]}
              onPress={() => setXs(!xs)}>
              <Text style={[{color: 'black'}, xs && {color: 'white'}]}>XS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                s ? {backgroundColor: '#DB3022', color: 'white'} : styles.btn,
              ]}
              onPress={() => setS(!s)}>
              <Text style={[{color: 'black'}, s && {color: 'white'}]}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                m ? {color: 'white', backgroundColor: '#DB3022'} : styles.btn,
              ]}
              onPress={() => setM(!m)}>
              <Text style={[{color: 'black'}, m && {color: 'white'}]}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                l ? {backgroundColor: '#DB3022', color: 'white'} : styles.btn,
              ]}
              onPress={() => setL(!l)}>
              <Text style={[{color: 'black'}, l && {color: 'white'}]}>L</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                xl ? {backgroundColor: '#DB3022', color: 'white'} : styles.btn,
              ]}
              onPress={() => setXl(!xl)}>
              <Text style={[{color: 'black'}, xl && {color: 'white'}]}>XL</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Category</Text>
          <FlatList
            horizontal
            data={data}
            pagingEnabled={true}
            renderItem={RenderCategory}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              marginVertical: 15,
              backgroundColor: 'white',
              paddingVertical: 25,
              paddingHorizontal: 10,
            }}
          />
          <View style={styles.parent}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Brand</Text>
              <Text style={{color: '#9B9B9B'}}>
                adidas Originals, Jack & Jones, s.Oliver
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 35,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={{
            width: 160,
            borderWidth: 1,
            height: 36,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => props.navigation.goBack()}>
          <Text>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              width: 160,
              // borderWidth: 1,
              height: 36,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey',
            },
            category.length > 0 && {backgroundColor: '#DB3022'},
          ]}
          disabled={category.length > 0 ? false : true}
          onPress={applyFilter}>
          <Text style={{color: 'white'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterProduct;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  wrapper: {
    // marginTop: 20,
    marginLeft: 1,
    marginRight: -4,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: '#DB3022',
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  myCheckBox: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  parent: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  btn: {
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#E5E5E5',
  },
  btnCategory: {
    borderWidth: 1,
    width: 90,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#E5E5E5',
    marginLeft: 15,
    marginBottom: 20,
  },
});

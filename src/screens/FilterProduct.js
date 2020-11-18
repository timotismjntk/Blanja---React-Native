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

const data = [
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

const FilterProduct = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [selectedSize, setSelectedSize] = useState(false);

  const [xs, setXs] = useState(false);
  const [s, setS] = useState(false);
  const [m, setM] = useState(false);
  const [l, setL] = useState(false);
  const [xl, setXl] = useState(false);
  const [all, setAll] = useState(false);
  const [women, setWomen] = useState(false);
  const [men, setMen] = useState(false);
  const [boys, setBoys] = useState(false);
  const [girls, setGirl] = useState(false);

  const a = [];
  let b = {};
  const checkBox = ({item, onPress, style}) => (
    <TouchableOpacity
      style={
        item.id === selectedId
          ? [styles.wrapper]
          : {marginTop: 4, marginLeft: 5}
      }
      onPress={() => {
        setSelectedId(item.id);
        a.push({...a, ...[item.id]});
        b = {
          a,
        };
        console.log(a);
      }}>
      <View style={[styles.myCheckBox, {backgroundColor: item.hex}]} />
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Colors</Text>
        <FlatList
          horizontal
          data={data}
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
        <View
          style={[
            styles.parent,
            {justifyContent: 'flex-start', flexWrap: 'wrap'},
          ]}>
          <TouchableOpacity
            style={[
              styles.btnCategory,
              all
                ? {backgroundColor: '#DB3022', color: 'white'}
                : styles.btnCategory,
            ]}
            onPress={() => setAll(!all)}>
            <Text style={[{color: 'black'}, all && {color: 'white'}]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnCategory,
              women
                ? {backgroundColor: '#DB3022', color: 'white'}
                : styles.btnCategory,
            ]}
            onPress={() => setWomen(!women)}>
            <Text style={[{color: 'black'}, women && {color: 'white'}]}>
              Women
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnCategory,
              men
                ? {backgroundColor: '#DB3022', color: 'white'}
                : styles.btnCategory,
            ]}
            onPress={() => setMen(!men)}>
            <Text style={[{color: 'black'}, men && {color: 'white'}]}>Men</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnCategory,
              boys
                ? {backgroundColor: '#DB3022', color: 'white'}
                : styles.btnCategory,
            ]}
            onPress={() => setBoys(!boys)}>
            <Text style={[{color: 'black'}, boys && {color: 'white'}]}>
              Boys
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnCategory,
              girls
                ? {backgroundColor: '#DB3022', color: 'white'}
                : styles.btnCategory,
            ]}
            onPress={() => setGirl(!girls)}>
            <Text style={[{color: 'black'}, girls && {color: 'white'}]}>
              Girls
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.parent}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Brand</Text>
            <Text style={{color: '#9B9B9B'}}>
              adidas Originals, Jack & Jones, s.Oliver
            </Text>
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
          }}>
          <Text>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 160,
            // borderWidth: 1,
            height: 36,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#DB3022',
          }}>
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

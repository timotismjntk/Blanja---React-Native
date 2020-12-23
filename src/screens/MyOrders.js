import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

// import actions
import ordersAction from '../redux/actions/orders';

export default function Myprofile(props) {
  const orderDetailHandler = (value) => {
    props.navigation.navigate('OrderDetail', {
      id: value,
    });
  };

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(ordersAction.readOrders(token)).catch((err) =>
      console.log(err.message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordersState = useSelector((state) => state.orders);
  const {data} = ordersState;

  const RenderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => orderDetailHandler(item.id)}>
        <View style={styles.orderTitle}>
          <Text style={styles.subOrder}>Order №.{item.id}</Text>
          <Text style={styles.orderDate}>
            {Moment(item.createdAt).format('LL')}
          </Text>
        </View>
        <View style={styles.trackingTitle}>
          <Text style={styles.info}>Tracking number:</Text>
          <Text style={styles.value}>{item.tracking_number}</Text>
        </View>
        <View style={styles.quantityTitle}>
          <Text style={styles.info}>Quantity:</Text>
          <Text style={styles.value}>{item.total_quantity}</Text>
        </View>
        <View style={styles.amoutTitle}>
          <Text style={styles.info}>Total Amount:</Text>
          <Text style={styles.value}>Rp: {item.summary}</Text>
        </View>
        <View style={styles.deliverTitle}>
          <Text style={styles.deliverSub}>Delivered</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <Text style={styles.header}>My Orders</Text>
      </View>
      {data.length > 0 ? (
        <FlatList
          renderItem={RenderItem}
          data={data}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={{flex: 1, padding: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>Ooopsss....</Text>
          <Text>likely you not have any orders.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    marginBottom: 50,
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  orderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subOrder: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderDate: {
    fontSize: 14,
    color: 'grey',
  },
  info: {
    fontSize: 14,
    color: 'grey',
  },
  value: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  trackingTitle: {
    flexDirection: 'row',
  },
  quantityTitle: {
    flexDirection: 'row',
  },
  amoutTitle: {
    flexDirection: 'row',
  },
  deliverTitle: {
    alignItems: 'flex-end',
  },
  deliverSub: {
    color: '#2AA952',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

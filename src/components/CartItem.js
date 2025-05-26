import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.button}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  quantity: {
    marginHorizontal: 10,
  },
});

export default CartItem;

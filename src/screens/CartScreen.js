/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const cart = useSelector(state => state.cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <Text style={styles.total}>Total: ${total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CartScreen;

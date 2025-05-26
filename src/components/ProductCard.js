/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoriteSlice';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorite);
  const isFav = favorites.some(fav => fav.id === item.id);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleFavorite = () => {
    scale.value = withSpring(1.2, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
    dispatch(toggleFavorite(item));
  };

  const handleAddToCart = () => {
    scale.value = withSpring(1.2, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
    dispatch(addToCart(item));
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleAddToCart}>
          <Text style={styles.button}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorite}>
          <Text style={[styles.button, isFav && { color: 'white' }]}>♥</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 5,
    color: 'green',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    color: '#007bff',
  },
});

export default ProductCard;


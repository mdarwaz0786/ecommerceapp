/* eslint-disable no-extra-semi */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoriteSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorite);

  const cartItem = cart.find((cartProd) => cartProd.id === item.id);
  const isFav = favorites.some((fav) => fav.id === item.id);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const triggerScale = () => {
    scale.value = withSpring(1.1, { damping: 5 }, () => {
      scale.value = withSpring(1);
    });
  };

  const handleFavorite = () => {
    triggerScale();
    dispatch(toggleFavorite(item));
  };

  const handleAddToCart = () => {
    triggerScale();
    dispatch(addToCart(item));
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: cartItem.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (cartItem.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: cartItem.quantity - 1 }));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: 0 }));
    };
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavorite}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={22}
            color={isFav ? '#FFA6A6' : '#999'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.divider} />

        {cartItem && cartItem.quantity > 0 ? (
          <View style={styles.qtyContainer}>
            <TouchableOpacity onPress={handleDecrement}>
              <Ionicons name="remove-circle-outline" size={24} color="#6CC51D" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <TouchableOpacity onPress={handleIncrement}>
              <Ionicons name="add-circle-outline" size={24} color="#6CC51D" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleAddToCart} style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="#6CC51D" />
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  price: {
    fontSize: 16,
    color: '#6CC51D',
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 6,
  },
  cartButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    padding: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default ProductCard;

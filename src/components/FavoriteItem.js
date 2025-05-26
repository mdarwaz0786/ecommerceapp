// components/FavoriteItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favoriteSlice';

const FavoriteItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFavorite = () => {
    dispatch(toggleFavorite(item));
  };

  return (
    <ScrollView contentContainerStyle={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity onPress={handleRemoveFavorite}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    color: '#6CC51D',
    marginBottom: 6,
  },
  removeText: {
    color: '#ff4d4d',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FavoriteItem;

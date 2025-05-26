// screens/FavoriteScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteItem from '../components/FavoriteItem';

const FavoriteScreen = () => {
  const favorites = useSelector((state) => state.favorite);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No items in favorites.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FavoriteItem item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default FavoriteScreen;

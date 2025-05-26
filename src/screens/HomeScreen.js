// screens/HomeScreen.js
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  incrementSkip,
  searchProducts,
  setQuery,
} from '../features/productSlice';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, skip, query, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ skip: 0 }));
  }, []);

  const handleLoadMore = () => {
    if (status !== 'loading') {
      dispatch(incrementSkip());
      dispatch(fetchProducts({ skip: skip + 10 }));
    }
  };

  const handleSearch = (text) => {
    dispatch(setQuery(text));
    if (text.length > 1) {
      dispatch(searchProducts(text));
    } else {
      dispatch(fetchProducts({ skip: 0 }));
    }
  };

  const renderFooter = () => {
    if (status === 'loading') {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="large" color="#6CC51D" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    margin: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;

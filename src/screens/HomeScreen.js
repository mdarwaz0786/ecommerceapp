/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  incrementSkip,
  searchProducts,
  setQuery,
} from '../features/productSlice';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, skip, query, status } = useSelector((state) => state.product);

  const scrollY = useRef(new Animated.Value(0)).current;

  const user = {
    name: 'Hey Jasmine',
    profileImage: 'https://i.pravatar.cc/150?img=12',
  };

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

  const userRowOpacity = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const userRowHeight = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

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

  const renderHeader = () => {
    return (
      <View style={styles.featuredHeader}>
        <Text style={styles.featuredTitle}>Featured Products</Text>
        <Icon name="angle-right" size={24} color="#000" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Animated.View
          style={[
            styles.userRow,
            {
              opacity: userRowOpacity,
              height: userRowHeight,
              overflow: 'hidden',
            },
          ]}
        >
          <Text style={styles.userName}>Hi, {user.name}</Text>
          <Image source={{ uri: user.profileImage }} style={styles.avatar} />
        </Animated.View>

        <View style={styles.searchBox}>
          <Icon name="search" size={14} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products or Store"
            placeholderTextColor="#fff"
            value={query}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <Animated.FlatList
        data={items}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#6CC51D',
    padding: 16,
    paddingBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AEDC81',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeScreen;

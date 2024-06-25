// HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';

const HomeScreen = () => {
  const [orchids, setOrchids] = useState([]);
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    axios.get('https://667a8dfbbd627f0dcc8f7e00.mockapi.io/categories')
      .then(response => {
        const data = response.data.map(category => category.data).flat();
        setOrchids(data);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { item })}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Text style={[styles.favorite, { color: isFavorite ? 'red' : 'gray' }]}>❤️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={orchids}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favorite: {
    fontSize: 24,
  },
});

export default HomeScreen;

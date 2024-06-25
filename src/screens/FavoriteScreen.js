// FavoriteScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoriteScreen = () => {
  const [orchids, setOrchids] = useState([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://667a8dfbbd627f0dcc8f7e00.mockapi.io/categories')
      .then(response => {
        const data = response.data.map(category => category.data).flat();
        const favoriteOrchids = data.filter(item => favorites.includes(item.id));
        setOrchids(favoriteOrchids);
      })
      .catch(error => console.error(error));
  }, [favorites]);

  const handleRemoveFavorite = (id) => {
    Alert.alert(
      "Remove Favorite",
      "Are you sure you want to remove this orchid from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => toggleFavorite(id),
          style: "destructive"
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { item })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
            <Text style={styles.favorite}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

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
    color: 'red',
  },
});

export default FavoriteScreen;

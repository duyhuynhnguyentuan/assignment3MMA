// src/context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (id) => {
    const currentFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    let updatedFavorites;
    if (currentFavorites.includes(id)) {
      updatedFavorites = currentFavorites.filter(favId => favId !== id);
    } else {
      updatedFavorites = [...currentFavorites, id];
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

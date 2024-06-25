// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import DetailScreen from './src/screens/DetailScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';

const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DetailScreen" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <FavoriteStack.Screen name="DetailScreen" component={DetailScreen} />
    </FavoriteStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'heart' : 'heart-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { display: 'flex' },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Favorites" component={FavoriteStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DetailScreen from '../screens/DetailScreen'; 
import { COLORS } from '../theme';
import {
  HomeStackParamList,
  RootTabParamList,
} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{
          title: 'Vehículos',
        }}
      />

      <Stack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={{
          title: 'Detalle del vehículo',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          headerShown: false,
          tabBarLabel: route.name === 'Home' ? 'Autos' : 'Favoritos',

          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === 'Home'
                ? 'car-outline'
                : 'heart-outline';

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            title: 'Autos',
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'Favoritos',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

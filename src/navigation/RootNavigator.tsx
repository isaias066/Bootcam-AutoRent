import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateScreen from '../screens/CreateScreen';
import { RootStackParamList } from './types';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'AutoRent',
          }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Detalle del vehículo',
          }}
        />

        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            title: 'Nuevo vehículo',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

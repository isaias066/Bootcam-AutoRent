import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { cars } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { RootStackParamList } from '../navigation/types';


type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;


export default function DetailScreen({
  route,
}: DetailScreenProps): React.JSX.Element {
  const { id } = route.params;

const savedCars = useSavedStore((state) => state.savedCars);
const addCar = useSavedStore((state) => state.addCar);
const removeCar = useSavedStore((state) => state.removeCar);

const car = cars.find((item) => item.id === id);
const isSaved = savedCars.some((item) => item.id === id);


  const handleToggleSaved = (): void => {
    if (!car) {
      return;
    }

    if (isSaved) {
      removeCar(car.id);
    } else {
      addCar(car);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🚗</Text>

      <Text style={styles.title}>{car?.name ?? 'Vehículo'}</Text>


      <Text style={styles.subtitle}>
        Detalle del vehículo
      </Text>

      <View style={styles.info}>
        <Text style={styles.label}>ID del vehículo</Text>
        <Text style={styles.value}>{id}</Text>
      </View>

      <Pressable
        onPress={handleToggleSaved}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          {isSaved ? 'Quitar de guardados' : 'Guardar vehículo'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },

  icon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  info: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },

  label: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  value: {
    marginTop: SPACING.xs,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },

  button: {
    marginTop: SPACING.xl,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});

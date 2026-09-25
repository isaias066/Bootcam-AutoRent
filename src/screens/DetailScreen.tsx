import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  navigation,
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

  const handleEdit = (): void => {
    navigation.navigate('Edit', {
      id,
    });
  };

  if (!car) {
    return (
      <View style={styles.container}>
        <Text style={styles.icon}>🚗</Text>

        <Text style={styles.title}>
          Vehículo no encontrado
        </Text>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Volver
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🚗</Text>

      <Text style={styles.title}>
        {car.name}
      </Text>

      <Text style={styles.subtitle}>
        {car.category}
      </Text>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transmisión</Text>
          <Text style={styles.value}>
            {car.transmission}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Pasajeros</Text>
          <Text style={styles.value}>
            {car.seats}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Precio por día</Text>
          <Text style={styles.price}>
            ${car.pricePerDay}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>
            {car.id}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleToggleSaved}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          {isSaved
            ? '❤️ Quitar de favoritos'
            : '🤍 Guardar en favoritos'}
        </Text>
      </Pressable>

      <Pressable
        onPress={handleEdit}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.secondaryButtonText}>
          ✏️ Editar vehículo
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>
          ← Volver
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    paddingTop: SPACING.xl,
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
    width: '100%',
    marginTop: SPACING.xl,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoRow: {
    marginBottom: SPACING.md,
  },

  label: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  value: {
    marginTop: SPACING.xs,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  price: {
    marginTop: SPACING.xs,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '800',
  },

  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  secondaryButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  backButton: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  backButtonText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },
});

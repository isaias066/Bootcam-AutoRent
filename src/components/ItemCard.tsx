import React, { memo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Car } from '../types';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';
import { useSavedStore } from '../stores/savedStore';

interface ItemCardProps {
  car: Car;
  onPress: (car: Car) => void;
}

function ItemCard({
  car,
  onPress,
}: ItemCardProps): React.JSX.Element {
  const savedCars = useSavedStore(
    (state) => state.savedCars,
  );

  const addCar = useSavedStore(
    (state) => state.addCar,
  );

  const removeCar = useSavedStore(
    (state) => state.removeCar,
  );

  const isSaved = savedCars.some(
    (item) => item.id === car.id,
  );

  const handleToggleSaved = (): void => {
    if (isSaved) {
      removeCar(car.id);
    } else {
      addCar(car);
    }
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onPress(car)}
        style={({ pressed }) => [
          pressed && styles.cardPressed,
        ]}
      >
        <Image
          source={{ uri: car.image }}
          style={styles.image}
        />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {car.name}
          </Text>

          <Text style={styles.price}>
            ${car.pricePerDay}/día
          </Text>
        </View>

        <Text style={styles.category}>
          {car.category}
        </Text>

        <View style={styles.details}>
          <Text style={styles.detail}>
            ⚙️ {car.transmission}
          </Text>

          <Text style={styles.detail}>
            👥 {car.seats} pasajeros
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => onPress(car)}
            style={styles.detailButton}
          >
            <Text style={styles.action}>
              Ver detalles →
            </Text>
          </Pressable>

          <Pressable
            onPress={handleToggleSaved}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteText}>
              {isSaved ? '❤️' : '🤍'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardPressed: {
    opacity: 0.7,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },

  name: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },

  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  category: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  details: {
    flexDirection: 'row',
    gap: SPACING.md,
  },

  detail: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },

  detailButton: {
    paddingVertical: SPACING.xs,
  },

  action: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },

  favoriteButton: {
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },

  favoriteText: {
    fontSize: 22,
  },
});

export default memo(ItemCard);

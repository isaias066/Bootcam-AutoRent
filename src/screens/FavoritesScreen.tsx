import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { cars } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { Car } from '../types';

export default function FavoritesScreen(): React.JSX.Element {
  const [favorites, setFavorites] = useState<Car[]>(cars.slice(0, 3));

  const handleRemoveFavorite = useCallback((carId: string) => {
    setFavorites((prev) => prev.filter((car) => car.id !== carId));
  }, []);

  const handleAddFavorite = useCallback((car: Car) => {
    setFavorites((prev) => {
      if (prev.some((c) => c.id === car.id)) {
        return prev;
      }
      return [...prev, car];
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Car }) => (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={styles.price}>
              ${item.pricePerDay}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.detail}>
              ⚙️ {item.transmission}
            </Text>
            <Text style={styles.detail}>
              👥 {item.seats}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.removeButton,
              pressed && styles.removeButtonPressed,
            ]}
            onPress={() => handleRemoveFavorite(item.id)}
          >
            <Text style={styles.removeButtonText}>
              ❌ Quitar de favoritos
            </Text>
          </Pressable>
        </View>
      </View>
    ),
    [handleRemoveFavorite],
  );

  const renderEmptyState = useCallback((): React.JSX.Element => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💔</Text>
      <Text style={styles.emptyTitle}>
        No hay vehículos favoritos
      </Text>
      <Text style={styles.emptyText}>
        Agrega autos a tus favoritos para verlos aquí
      </Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis favoritos ❤️</Text>
        <Text style={styles.count}>
          {favorites.length} vehículo{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          favorites.length === 0
            ? styles.emptyList
            : styles.listContent
        }
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
  },

  count: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  listContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },

  emptyList: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  emptyIcon: {
    marginBottom: SPACING.md,
    fontSize: 48,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
    textAlign: 'center',
  },

  emptyText: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
  },

  card: {
    overflow: 'hidden',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: '100%',
    height: 160,
  },

  content: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },

  info: {
    flex: 1,
    gap: SPACING.xs,
  },

  name: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },

  category: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },

  details: {
    flexDirection: 'row',
    gap: SPACING.md,
  },

  detail: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  removeButton: {
    marginTop: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
  },

  removeButtonPressed: {
    opacity: 0.7,
  },

  removeButtonText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
  },

  separator: {
    height: SPACING.md,
  },
});

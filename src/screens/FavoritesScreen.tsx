import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

export default function FavoritesScreen(): React.JSX.Element {
  const savedCars = useSavedStore((state) => state.savedCars);
  const removeCar = useSavedStore((state) => state.removeCar);
  const clearCars = useSavedStore((state) => state.clearCars);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis favoritos ❤️</Text>

        {savedCars.length > 0 && (
          <Pressable onPress={clearCars}>
            <Text style={styles.clearText}>Limpiar</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={savedCars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          savedCars.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>❤️</Text>
            <Text style={styles.emptyTitle}>
              No tienes vehículos guardados
            </Text>
            <Text style={styles.emptyText}>
              Guarda un vehículo desde su pantalla de detalle.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
                ${item.pricePerDay}/día
              </Text>
            </View>

            <Pressable onPress={() => removeCar(item.id)}>
              <Text style={styles.removeText}>Quitar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.xl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
  },

  clearText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  list: {
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
    fontSize: 48,
    marginBottom: SPACING.md,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },

  cardContent: {
    flex: 1,
  },

  name: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },

  category: {
    marginTop: SPACING.xs,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  price: {
    marginTop: SPACING.sm,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  removeText: {
    marginLeft: SPACING.md,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
  },
});

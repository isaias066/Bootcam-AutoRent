import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ItemCard from '../components/ItemCard';
import { useItems } from '../hooks/useItems';
import { usePreferences } from '../hooks/usePreferences';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';
import { Car } from '../types';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen({
  navigation,
}: HomeScreenProps): React.JSX.Element {
  const [search, setSearch] = useState('');

  const {
    sortOrder,
    compactMode,
    itemsPerPage,
  } = usePreferences();

  const {
    data: cars = [],
    isLoading,
    isError,
  } = useItems();

  const filteredCars = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    let result = cars;

    if (normalizedSearch) {
      result = cars.filter((car) => {
        const searchableText = [
          car.name,
          car.category,
          car.transmission,
        ]
          .join(' ')
          .toLowerCase();

        return searchableText.includes(
          normalizedSearch,
        );
      });
    }

    return [...result]
      .sort((a, b) => {
        if (sortOrder === 'price') {
          return a.pricePerDay - b.pricePerDay;
        }

        return a.name.localeCompare(b.name);
      })
      .slice(0, itemsPerPage);
  }, [
    cars,
    search,
    sortOrder,
    itemsPerPage,
  ]);

  const handleCarPress = useCallback(
    (car: Car): void => {
      navigation.navigate('Detail', {
        id: car.id,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Car }): React.JSX.Element => (
      <ItemCard
        car={item}
        onPress={handleCarPress}
        compact={compactMode}
      />
    ),
    [handleCarPress, compactMode],
  );

  const renderEmptyState = useCallback(
    (): React.JSX.Element => {
      if (search.trim()) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔎</Text>

            <Text style={styles.emptyTitle}>
              No encontramos vehículos
            </Text>

            <Text style={styles.emptyText}>
              No hay autos que coincidan con "{search}".
            </Text>

            <Pressable
              onPress={() => setSearch('')}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>
                Limpiar búsqueda
              </Text>
            </Pressable>
          </View>
        );
      }

      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🚗</Text>

          <Text style={styles.emptyTitle}>
            No hay vehículos disponibles
          </Text>
        </View>
      );
    },
    [search],
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />

        <Text style={styles.loadingText}>
          Cargando vehículos...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyIcon}>⚠️</Text>

        <Text style={styles.emptyTitle}>
          No se pudieron cargar los vehículos
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Create')}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>
            Crear vehículo
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>
            AutoRent 🚗
          </Text>

          <Text style={styles.subtitle}>
            Encuentra el vehículo ideal para tu viaje
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            onPress={() =>
              navigation.navigate('Settings')
            }
            style={styles.settingsButton}
          >
            <Text style={styles.settingsButtonText}>
              ⚙️ Configuración
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Create')}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>
              + Nuevo vehículo
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nombre, categoría..."
          placeholderTextColor={
            COLORS.textSecondary
          }
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.preferenceInfo}>
        <Text style={styles.preferenceText}>
          Orden: {sortOrder === 'name'
            ? 'Nombre'
            : 'Precio'}{' '}
          · Mostrando {itemsPerPage}
          {compactMode ? ' · Compacto' : ''}
        </Text>
      </View>

      <View style={styles.offlineBanner}>
        <Text style={styles.offlineText}>
          ⚠️ Los datos se guardan localmente para
          poder consultarlos sin red.
        </Text>
      </View>

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        contentContainerStyle={
          filteredCars.length === 0
            ? styles.emptyList
            : styles.listContent
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },

  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },

  headerText: {
    marginBottom: SPACING.md,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: SPACING.xs,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },

  settingsButton: {
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  settingsButtonText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
  },

  createButton: {
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  createButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
  },

  searchContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },

  searchInput: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
  },

  preferenceInfo: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },

  preferenceText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  offlineBanner: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: '#FFF3CD',
    padding: SPACING.sm,
  },

  offlineText: {
    color: '#856404',
    fontSize: TYPOGRAPHY.caption,
  },

  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },

  separator: {
    height: SPACING.md,
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
    fontSize: 42,
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

  clearButton: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  clearButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});

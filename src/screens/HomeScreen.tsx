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
    data: cars = [],
    isLoading,
    isError,
  } = useItems();

  const filteredCars = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    if (!normalizedSearch) {
      return cars;
    }

    return cars.filter((car) => {
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
  }, [cars, search]);

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
      />
    ),
    [handleCarPress],
  );

  const renderEmptyState = useCallback((): React.JSX.Element => {
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
  }, [search]);

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

        <Pressable
          onPress={() => navigation.navigate('Create')}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>
            + Nuevo vehículo
          </Text>
        </Pressable>
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

  createButton: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  createButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  searchContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
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

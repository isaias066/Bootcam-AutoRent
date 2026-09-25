import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import FormField from '../components/FormField';
import { itemSchema, ItemFormData } from '../schemas/itemSchema';
import {
  useItemById,
  useUpdateItem,
} from '../hooks/useItems';
import { RootStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

type EditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Edit'
>;

export default function EditScreen({
  navigation,
  route,
}: EditScreenProps): React.JSX.Element {
  const { id } = route.params;

  const {
    data: car,
    isLoading,
    isError,
  } = useItemById(id);

  const updateItem = useUpdateItem();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      category: '',
      transmission: '',
      seats: 5,
      pricePerDay: 0,
      image: '',
    },
  });

  useEffect(() => {
    if (!car) {
      return;
    }

    reset({
      name: car.name,
      category: car.category,
      transmission: car.transmission,
      seats: car.seats,
      pricePerDay: car.pricePerDay,
      image: car.image,
    });
  }, [car, reset]);

  const onSubmit = async (data: ItemFormData): Promise<void> => {
    await updateItem.mutateAsync({
      id,
      payload: data,
    });

    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
        <Text style={styles.statusText}>
          Cargando vehículo...
        </Text>
      </View>
    );
  }

  if (isError || !car) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          No se pudo cargar el vehículo
        </Text>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>
            Volver
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Editar vehículo
      </Text>

      <FormField
        control={control}
        name="name"
        label="Nombre"
        placeholder="Ej. Toyota RAV4"
      />

      <FormField
        control={control}
        name="category"
        label="Categoría"
        placeholder="Ej. SUV"
      />

      <FormField
        control={control}
        name="transmission"
        label="Transmisión"
        placeholder="Ej. Automática"
      />

      <FormField
        control={control}
        name="seats"
        label="Pasajeros"
        placeholder="Ej. 5"
        keyboardType="numeric"
        numeric
        />


      <FormField
        control={control}
        name="pricePerDay"
        label="Precio por día"
        placeholder="Ej. 55"
        keyboardType="numeric"
        numeric
        />

      <FormField
        control={control}
        name="image"
        label="URL de imagen"
        placeholder="https://..."
        autoCapitalize="none"
      />

      <Pressable
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.button,
          isSubmitting && styles.buttonDisabled,
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator color={COLORS.background} />
        ) : (
          <Text style={styles.buttonText}>
            Guardar cambios
          </Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },

  title: {
    marginBottom: SPACING.lg,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },

  statusText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  errorTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
    textAlign: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  backButton: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  buttonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import FormField from '../components/FormField';
import { itemSchema, ItemFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';
import { RootStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

type CreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Create'
>;

export default function CreateScreen({
  navigation,
}: CreateScreenProps): React.JSX.Element {
  const createItem = useCreateItem();

  const {
    control,
    handleSubmit,
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

  const onSubmit = async (data: ItemFormData): Promise<void> => {
    try {
      await createItem.mutateAsync(data);
      navigation.goBack();
    } catch (error) {
      console.error('Error creando vehículo:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Nuevo vehículo</Text>

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
        placeholder="https://images.unsplash.com/..."
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
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
            Crear vehículo
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

  buttonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});

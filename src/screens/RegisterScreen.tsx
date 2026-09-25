import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  registerSchema,
  RegisterFormData,
} from '../schemas/authSchema';
import { useAuthStore } from '../stores/authStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

export default function RegisterScreen(): React.JSX.Element {
  const register = useAuthStore((state) => state.login);
  const isLoading = useAuthStore(
    (state) => state.isLoading,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (
    data: RegisterFormData,
  ): Promise<void> => {
    try {
      await register(data.username, data.password);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error
          ? error.message
          : 'No se pudo completar el registro.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Crear cuenta
      </Text>

      <Text style={styles.subtitle}>
        Regístrate en AutoRent 🚗
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>
          Usuario
        </Text>

        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Tu usuario"
              placeholderTextColor={COLORS.textSecondary}
              autoCapitalize="none"
              style={styles.input}
            />
          )}
        />

        {errors.username && (
          <Text style={styles.error}>
            {errors.username.message}
          </Text>
        )}

        <Text style={styles.label}>
          Email
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="correo@ejemplo.com"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          )}
        />

        {errors.email && (
          <Text style={styles.error}>
            {errors.email.message}
          </Text>
        )}

        <Text style={styles.label}>
          Contraseña
        </Text>

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={COLORS.textSecondary}
              secureTextEntry
              style={styles.input}
            />
          )}
        />

        {errors.password && (
          <Text style={styles.error}>
            {errors.password.message}
          </Text>
        )}

        <Text style={styles.label}>
          Confirmar contraseña
        </Text>

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Repite tu contraseña"
              placeholderTextColor={COLORS.textSecondary}
              secureTextEntry
              style={styles.input}
            />
          )}
        />

        {errors.confirmPassword && (
          <Text style={styles.error}>
            {errors.confirmPassword.message}
          </Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          style={[
            styles.button,
            isLoading && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {isLoading
              ? 'Creando cuenta...'
              : 'Crear cuenta'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: SPACING.xs,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
  },

  form: {
    marginTop: SPACING.lg,
  },

  label: {
    marginBottom: SPACING.xs,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  input: {
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },

  error: {
    marginBottom: SPACING.sm,
    color: '#DC2626',
    fontSize: TYPOGRAPHY.caption,
  },

  button: {
    marginTop: SPACING.md,
    alignItems: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
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

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
  loginSchema,
  LoginFormData,
} from '../schemas/authSchema';
import { useAuthStore } from '../stores/authStore';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';

export default function LoginScreen(): React.JSX.Element {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore(
    (state) => state.isLoading,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (
    data: LoginFormData,
  ): Promise<void> => {
    try {
      await login(
        data.username,
        data.password,
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Usuario o contraseña incorrectos.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        AutoRent 🚗
      </Text>

      <Text style={styles.subtitle}>
        Inicia sesión para continuar
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
              placeholder="emilys"
              placeholderTextColor={
                COLORS.textSecondary
              }
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
              placeholder="emilyspass"
              placeholderTextColor={
                COLORS.textSecondary
              }
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
              ? 'Iniciando sesión...'
              : 'Iniciar sesión'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.demo}>
        Demo: emilys / emilyspass
      </Text>
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
    marginTop: SPACING.xl,
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

  demo: {
    marginTop: SPACING.lg,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    textAlign: 'center',
  },
});

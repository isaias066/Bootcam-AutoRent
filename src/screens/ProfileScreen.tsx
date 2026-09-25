import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthStore } from '../stores/authStore';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export default function ProfileScreen({
  navigation,
}: ProfileScreenProps): React.JSX.Element {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async (): Promise<void> => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert(
                'Error',
                'No se pudo cerrar sesión.',
              );
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          No hay información de usuario disponible
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👤</Text>
      </View>

      <Text style={styles.title}>
        Perfil de usuario
      </Text>

      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>
            Usuario
          </Text>
          <Text style={styles.value}>
            {user.username}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.field}>
          <Text style={styles.label}>
            Email
          </Text>
          <Text style={styles.value}>
            {user.email}
          </Text>
        </View>

        {user.firstName && (
          <>
            <View style={styles.divider} />

            <View style={styles.field}>
              <Text style={styles.label}>
                Nombre
              </Text>
              <Text style={styles.value}>
                {user.firstName} {user.lastName || ''}
              </Text>
            </View>
          </>
        )}

        {user.id && (
          <>
            <View style={styles.divider} />

            <View style={styles.field}>
              <Text style={styles.label}>
                ID de usuario
              </Text>
              <Text style={styles.value}>
                {user.id}
              </Text>
            </View>
          </>
        )}
      </View>

      <Pressable
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>
          Cerrar sesión
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        AutoRent 🚗 v1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  avatarText: {
    fontSize: 48,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    marginBottom: SPACING.lg,
  },

  card: {
    width: '100%',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },

  field: {
    marginBottom: SPACING.sm,
  },

  label: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },

  value: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },

  error: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
  },

  logoutButton: {
    width: '100%',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.danger,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },

  logoutButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  footer: {
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
});

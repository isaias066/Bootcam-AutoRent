import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePreferences } from '../hooks/usePreferences';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';
import { RootStackParamList } from '../navigation/types';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

const SECURE_KEY = 'autorent-access-code';

export default function SettingsScreen({
  navigation,
}: SettingsScreenProps): React.JSX.Element {
  const {
    sortOrder,
    compactMode,
    itemsPerPage,
    setSortOrder,
    setCompactMode,
    setItemsPerPage,
  } = usePreferences();

  const [hasSecureData, setHasSecureData] = useState(false);

  const handleSaveSecureData = async (): Promise<void> => {
    await SecureStore.setItemAsync(
      SECURE_KEY,
      'AUTORENT-2026',
    );

    setHasSecureData(true);

    Alert.alert(
      'Seguridad',
      'Código guardado de forma segura.',
    );
  };

  const handleReadSecureData = async (): Promise<void> => {
    const value = await SecureStore.getItemAsync(
      SECURE_KEY,
    );

    setHasSecureData(Boolean(value));

    Alert.alert(
      'Seguridad',
      value
        ? 'El código seguro existe y está almacenado.'
        : 'No hay ningún código almacenado.',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Preferencias
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Orden de vehículos
        </Text>

        <View style={styles.row}>
          <Pressable
            onPress={() => setSortOrder('name')}
            style={[
              styles.option,
              sortOrder === 'name' && styles.optionActive,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                sortOrder === 'name' &&
                  styles.optionTextActive,
              ]}
            >
              Nombre
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSortOrder('price')}
            style={[
              styles.option,
              sortOrder === 'price' &&
                styles.optionActive,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                sortOrder === 'price' &&
                  styles.optionTextActive,
              ]}
            >
              Precio
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.sectionTitle}>
              Modo compacto
            </Text>

            <Text style={styles.description}>
              Mostrar menos información en las tarjetas.
            </Text>
          </View>

          <Switch
            value={compactMode}
            onValueChange={setCompactMode}
            trackColor={{
              false: COLORS.border,
              true: COLORS.primary,
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Vehículos mostrados
        </Text>

        <View style={styles.row}>
          {[5, 10, 20].map((amount) => (
            <Pressable
              key={amount}
              onPress={() => setItemsPerPage(amount)}
              style={[
                styles.option,
                itemsPerPage === amount &&
                  styles.optionActive,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  itemsPerPage === amount &&
                    styles.optionTextActive,
                ]}
              >
                {amount}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Seguridad 🔐
        </Text>

        <Text style={styles.description}>
          Guarda un código de acceso de AutoRent usando
          almacenamiento seguro.
        </Text>

        <Pressable
          onPress={handleSaveSecureData}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Guardar código seguro
          </Text>
        </Pressable>

        <Pressable
          onPress={handleReadSecureData}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            {hasSecureData
              ? '✓ Código almacenado'
              : 'Comprobar código'}
          </Text>
        </Pressable>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },

  title: {
    marginBottom: SPACING.lg,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
  },

  section: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  description: {
    marginTop: SPACING.xs,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },

  option: {
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  optionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  optionText: {
    color: COLORS.text,
    fontWeight: '600',
  },

  optionTextActive: {
    color: COLORS.background,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    marginTop: SPACING.md,
    alignItems: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
  },

  secondaryButton: {
    marginTop: SPACING.sm,
    alignItems: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontWeight: '700',
  },

  buttonText: {
    color: COLORS.background,
    fontWeight: '700',
  },

  backButton: {
    alignItems: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.text,
    paddingVertical: SPACING.md,
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

export default function CreateScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo vehículo</Text>

      <Text style={styles.subtitle}>
        Formulario de creación
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },
});

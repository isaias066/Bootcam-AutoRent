import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<T extends FieldValues>
  extends TextInputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  numeric?: boolean;
}

export default function FormField<T extends FieldValues>({
  control,
  name,
  label,
  numeric = false,
  ...textInputProps
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <TextInput
            {...textInputProps}
            value={value === undefined ? '' : String(value)}
            onChangeText={(text) => {
              if (numeric) {
                const numberValue = Number(text);

                onChange(
                  text.trim() === ''
                    ? 0
                    : numberValue,
                );

                return;
              }

              onChange(text);
            }}
            onBlur={onBlur}
            style={[
              styles.input,
              error && styles.inputError,
            ]}
          />

          {error && (
            <Text style={styles.error}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },

  label: {
    marginBottom: SPACING.xs,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.text,
  },

  inputError: {
    borderColor: '#DC2626',
  },

  error: {
    marginTop: SPACING.xs,
    color: '#DC2626',
    fontSize: TYPOGRAPHY.caption,
  },
});

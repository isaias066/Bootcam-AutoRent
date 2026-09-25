import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { HomeStackParamList } from '../navigation/types';

type DetailScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'HomeDetail'
>;

export default function DetailScreen({
  route,
}: DetailScreenProps): React.JSX.Element {
  const { car } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleRent = () => {
    alert(`¡Alquiler de ${car.name} confirmado!`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen Grande */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: car.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Pressable
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </Pressable>
        </View>

        {/* Encabezado con Título y Precio */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{car.name}</Text>
            <Text style={styles.category}>{car.category}</Text>
          </View>
          <Text style={styles.price}>
            ${car.pricePerDay}
            <Text style={styles.priceLabel}>/día</Text>
          </Text>
        </View>

        {/* Descripción General */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Información del vehículo</Text>
          <Text style={styles.description}>
            Vehículo {car.category.toLowerCase()} con transmisión {car.transmission.toLowerCase()},
            con capacidad para {car.seats} pasajeros. Disponible para alquilar
            en nuestras sucursales.
          </Text>
        </View>

        {/* Detalles Técnicos */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Especificaciones</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>⚙️</Text>
              <Text style={styles.detailLabel}>Transmisión</Text>
              <Text style={styles.detailValue}>
                {car.transmission}
              </Text>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>👥</Text>
              <Text style={styles.detailLabel}>Pasajeros</Text>
              <Text style={styles.detailValue}>
                {car.seats} personas
              </Text>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>🔧</Text>
              <Text style={styles.detailLabel}>Categoría</Text>
              <Text style={styles.detailValue}>
                {car.category}
              </Text>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>🆔</Text>
              <Text style={styles.detailLabel}>ID</Text>
              <Text style={styles.detailValue}>
                {car.id}
              </Text>
            </View>
          </View>
        </View>

        {/* Características */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Características incluidas</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Aire acondicionado</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>GPS y sistema de entretenimiento</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Seguro incluido</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>Tanque de combustible lleno</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botones pegados al fondo */}
      <View style={styles.actionBar}>
        <Pressable
          style={styles.rentButton}
          onPress={handleRent}
        >
          <Text style={styles.rentButtonText}>
            Alquilar ahora
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  favoriteButton: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    fontSize: 28,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    gap: SPACING.md,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },

  category: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  price: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'right',
  },

  priceLabel: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },

  descriptionSection: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 22,
  },

  detailsSection: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },

  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },

  detailCard: {
    width: '48%',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: SPACING.xs,
  },

  detailIcon: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },

  detailLabel: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
  },

  detailValue: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    textAlign: 'center',
  },

  featuresSection: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },

  featureDot: {
    color: COLORS.primary,
    fontSize: 20,
  },

  featureText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    flex: 1,
  },

  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  rentButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rentButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '800',
  },
});

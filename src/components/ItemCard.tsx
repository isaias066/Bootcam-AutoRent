import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Car } from '../types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

interface ItemCardProps {
  car: Car;
  onPress: (car: Car) => void;
}

function ItemCard({ car, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={() => onPress(car)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Image source={{ uri: car.image }} style={styles.image} />

       <View style={styles.content}>
         <View style={styles.header}>
           <View style={styles.titleColumn}>
             <Text style={styles.name}>{car.name}</Text>
             <Text style={styles.category}>{car.category}</Text>
           </View>
           <Text style={styles.price}>${car.pricePerDay}</Text>
         </View>

         <View style={styles.details}>
           <View style={styles.detailItem}>
             <Text style={styles.detailLabel}>Transmisión</Text>
             <Text style={styles.detailValue}>
               ⚙️ {car.transmission}
             </Text>
           </View>

           <View style={styles.detailItem}>
             <Text style={styles.detailLabel}>Pasajeros</Text>
             <Text style={styles.detailValue}>
               👥 {car.seats}
             </Text>
           </View>
         </View>

         <Text style={styles.action}>Ver detalles →</Text>
       </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardPressed: {
    opacity: 0.7,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },

  titleColumn: {
    flex: 1,
    gap: SPACING.xs,
  },

  name: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },

  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },

  category: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },

  details: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },

  detailItem: {
    flex: 1,
    gap: SPACING.xs,
  },

  detailLabel: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
  },

  detailValue: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '500',
  },

  detail: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  action: {
    marginTop: SPACING.xs,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },
});

export default memo(ItemCard);

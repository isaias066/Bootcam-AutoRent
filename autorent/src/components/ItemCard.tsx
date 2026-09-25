import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Car } from '../types';

interface ItemCardProps {
  car: Car;
}

export default function ItemCard({
  car,
}: ItemCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: car.image }}
        style={styles.image}
        resizeMode="cover"
      />

       <View style={styles.content}>
         <Text style={styles.name}>{car.name}</Text>

         <Text style={styles.description}>
           {car.category} • {car.transmission}
         </Text>

         <View style={styles.infoRow}>
           <Text style={styles.detail}>
             👥 {car.seats} pasajeros
           </Text>
         </View>

         <Text style={styles.price}>
           ${car.pricePerDay.toLocaleString('es-CO')} / día
         </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => console.log(`Alquilar: ${car.name}`)}
        >
          <Text style={styles.buttonText}>
            Alquilar vehículo
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 6,
  },

  category: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  detail: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },

  details: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonPressed: {
    backgroundColor: '#1d4ed8',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

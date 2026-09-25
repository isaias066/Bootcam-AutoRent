import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ItemCard from '../components/ItemCard';
import { cars } from '../data/mockData';

export default function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>AutoRent</Text>
          <Text style={styles.subtitle}>
            Encuentra el vehículo ideal para tu próximo viaje
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Vehículos disponibles ({cars.length})
          </Text>

          <View style={styles.cardsList}>
            {cars.map((car) => (
              <ItemCard key={car.id} car={car} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  content: {
    paddingBottom: 30,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },

  section: {
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 16,
  },

  cardsList: {
    gap: 16,
  },
});

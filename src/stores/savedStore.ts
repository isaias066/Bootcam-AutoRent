import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Car } from '../types';

interface SavedStore {
  savedCars: Car[];
  addCar: (car: Car) => void;
  removeCar: (id: string) => void;
  clearCars: () => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedCars: [],

      addCar: (car) =>
        set((state) => {
          if (state.savedCars.some((savedCar) => savedCar.id === car.id)) {
            return state;
          }

          return {
            savedCars: [...state.savedCars, car],
          };
        }),

      removeCar: (id) =>
        set((state) => ({
          savedCars: state.savedCars.filter((car) => car.id !== id),
        })),

      clearCars: () =>
        set({
          savedCars: [],
        }),

      isSaved: (id) => {
        const { savedCars } = get();
        return savedCars.some((car) => car.id === id);
      },
    }),
    {
      name: 'autorent-saved-store',
      storage: AsyncStorage,
    }
  )
);

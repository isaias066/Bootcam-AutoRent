import { useSavedStore } from '../stores/savedStore';

export function useSavedItems() {
  const savedCars = useSavedStore((state) => state.savedCars);
  const addCar = useSavedStore((state) => state.addCar);
  const removeCar = useSavedStore((state) => state.removeCar);
  const isSaved = useSavedStore((state) => state.isSaved);

  return {
    savedCars,
    addCar,
    removeCar,
    isSaved,
  };
}

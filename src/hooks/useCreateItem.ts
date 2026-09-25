import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Car } from '../types';

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (car: Omit<Car, 'id'>) => {
      const response = await api.post('/posts', car);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}

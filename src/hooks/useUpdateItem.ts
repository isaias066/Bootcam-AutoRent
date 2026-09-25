import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Car } from '../types';

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (car: Car) => {
      const response = await api.put(`/posts/${car.id}`, car);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}

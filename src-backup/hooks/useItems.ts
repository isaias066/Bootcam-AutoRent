import { useQuery } from '@tanstack/react-query';

import { api } from '../services/api';
import { ApiPost } from '../types';

async function fetchItems(): Promise<ApiPost[]> {
  const response = await api.get<ApiPost[]>('/posts?_limit=20');

  return response.data;
}

export function useItems() {
  return useQuery({
    queryKey: ['cars'],
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener mínimo 3 caracteres'),
  category: z.string().min(1, 'La categoría es requerida'),
  transmission: z.string().min(1, 'La transmisión es requerida'),
  pricePerDay: z.number().min(0, 'El precio debe ser positivo'),
});

export type ItemFormData = z.infer<typeof itemSchema>;

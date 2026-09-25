import { z } from 'zod';

export const itemSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres'),

  category: z
    .string()
    .min(1, 'La categoría es obligatoria'),

  transmission: z
    .string()
    .min(1, 'La transmisión es obligatoria'),

  seats: z
    .number()
    .int('El número de pasajeros debe ser entero')
    .min(1, 'Debe tener al menos 1 pasajero')
    .max(9, 'No puede superar 9 pasajeros'),

  pricePerDay: z
    .number()
    .positive('El precio debe ser mayor que 0'),

  image: z
    .string()
    .url('Debe ser una URL válida'),
});

export type ItemFormData = z.infer<typeof itemSchema>;

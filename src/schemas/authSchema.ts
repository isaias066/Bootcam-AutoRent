import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'El usuario debe tener al menos 3 caracteres'),

    email: z
      .string()
      .email('Introduce un email válido'),

    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    confirmPassword: z
      .string()
      .min(6, 'Confirma tu contraseña'),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    },
  );

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<
  typeof registerSchema
>;

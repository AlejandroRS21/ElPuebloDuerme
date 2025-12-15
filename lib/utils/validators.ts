import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const createRoomSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  maxPlayers: z.number().min(4, 'Mínimo 4 jugadores').max(20, 'Máximo 20 jugadores'),
  minPlayers: z.number().min(4, 'Mínimo 4 jugadores'),
  isPrivate: z.boolean(),
}).refine((data) => data.minPlayers <= data.maxPlayers, {
  message: 'El mínimo de jugadores no puede ser mayor que el máximo',
  path: ['minPlayers'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateRoomFormData = z.infer<typeof createRoomSchema>;

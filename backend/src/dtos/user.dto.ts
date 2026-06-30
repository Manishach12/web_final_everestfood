import { z } from 'zod';

export const registerDtoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
});

export const loginDtoSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileDtoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
});

export const changePasswordDtoSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
});

export type RegisterDto = z.infer<typeof registerDtoSchema>;
export type LoginDto = z.infer<typeof loginDtoSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileDtoSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordDtoSchema>;

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  createdAt: Date;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  message: string;
}

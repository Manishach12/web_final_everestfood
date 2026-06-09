import { Request, Response } from 'express';
import { registerDtoSchema, UserResponseDto } from '../dtos/user.dto';
import { User } from '../models/User';
import { hashPassword } from '../utils/hashing';
import { setAuthCookie } from '../utils/token';

function toUserResponse(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  createdAt: Date;
}): UserResponseDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function register(req: Request, res: Response): Promise<void> {
  const parsed = registerDtoSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { name, email, password } = parsed.data;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(409).json({
      success: false,
      message: 'An account with this email already exists',
    });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  setAuthCookie(res, {
    userId: user._id.toString(),
    email: user.email,
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: toUserResponse(user),
  });
}

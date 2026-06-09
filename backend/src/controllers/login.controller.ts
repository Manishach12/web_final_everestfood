import { Request, Response } from 'express';
import { loginDtoSchema, UserResponseDto } from '../dtos/user.dto';
import { User } from '../models/User';
import { comparePassword } from '../utils/hashing';
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

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = loginDtoSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
    return;
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
    return;
  }

  setAuthCookie(res, {
    userId: user._id.toString(),
    email: user.email,
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: toUserResponse(user),
  });
}

export async function me(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const user = await User.findById(req.user.userId);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.status(200).json({
    success: true,
    user: toUserResponse(user),
  });
}

export async function logout(req: Request, res: Response): Promise<void> {
  const { clearAuthCookie } = await import('../utils/token');
  clearAuthCookie(res);
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}

import { Request, Response } from 'express';
import { updateProfileDtoSchema, changePasswordDtoSchema, UserResponseDto } from '../dtos/user.dto';
import { User } from '../models/User';
import { comparePassword, hashPassword } from '../utils/hashing';

function toUserResponse(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  profileImage?: string | null;
  createdAt: Date;
}): UserResponseDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    profileImage: user.profileImage ?? null,
    createdAt: user.createdAt,
  };
}

export async function whoami(req: Request, res: Response): Promise<void> {
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

export async function updateProfile(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const user = await User.findById(req.user.userId);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  const updateData: { name?: string; profileImage?: string } = {};
  if (req.body.name !== undefined) {
    const parsed = updateProfileDtoSchema.safeParse({ name: req.body.name });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }
    updateData.name = parsed.data.name;
  }

  if (req.file) {
    updateData.profileImage = `/uploads/${req.file.filename}`;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    { $set: updateData },
    { new: true },
  );

  if (!updatedUser) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: toUserResponse(updatedUser),
  });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const parsed = changePasswordDtoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const user = await User.findById(req.user.userId).select('+password');
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  const isValid = await comparePassword(parsed.data.currentPassword, user.password);
  if (!isValid) {
    res.status(400).json({ success: false, message: 'Current password is incorrect' });
    return;
  }

  const hashedPassword = await hashPassword(parsed.data.newPassword);
  await User.findByIdAndUpdate(req.user.userId, { $set: { password: hashedPassword } });

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
}

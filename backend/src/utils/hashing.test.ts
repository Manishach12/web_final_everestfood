import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../utils/hashing';

describe('hashing utilities', () => {
  it('hashes and verifies passwords', async () => {
    const plain = 'SecurePass123!';
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(await comparePassword(plain, hash)).toBe(true);
    expect(await comparePassword('wrong-password', hash)).toBe(false);
  });
});

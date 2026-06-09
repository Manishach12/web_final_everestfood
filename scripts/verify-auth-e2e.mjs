#!/usr/bin/env node
/**
 * End-to-end auth flow verification script.
 * Requires MongoDB at MONGODB_URI and backend running on PORT (default 5000).
 */
const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
const email = `e2e-${Date.now()}@everestfood.com`;
const password = 'SecurePass123!';

async function main() {
  console.log('Everest Food App — E2E auth verification\n');

  const health = await fetch(`${BASE}/health`);
  if (!health.ok) throw new Error('Backend health check failed');
  console.log('✓ Health check passed');

  const register = await fetch(`${BASE}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'E2E User', email, password }),
  });
  const registerBody = await register.json();
  if (!register.ok) throw new Error(`Register failed: ${JSON.stringify(registerBody)}`);
  console.log('✓ Register passed');

  const setCookie = register.headers.get('set-cookie');
  if (!setCookie?.includes('everest_token')) throw new Error('Register did not set auth cookie');
  console.log('✓ Auth cookie set on register');

  const login = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const loginBody = await login.json();
  if (!login.ok) throw new Error(`Login failed: ${JSON.stringify(loginBody)}`);
  console.log('✓ Login passed');

  const loginCookie = login.headers.get('set-cookie');
  if (!loginCookie) throw new Error('Login did not set auth cookie');

  const me = await fetch(`${BASE}/api/me`, {
    headers: { Cookie: loginCookie.split(';')[0] },
  });
  const meBody = await me.json();
  if (!me.ok || !meBody.user) throw new Error(`Protected route failed: ${JSON.stringify(meBody)}`);
  console.log('✓ Protected /api/me passed');
  console.log(`\nAll checks passed for ${email}`);
}

main().catch((err) => {
  console.error('\nE2E verification failed:', err.message);
  process.exit(1);
});

'use client';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { app, USING_EMULATORS } from './app';

export const auth = getAuth(app);

const g = globalThis as Record<string, unknown>;
if (typeof window !== 'undefined' && USING_EMULATORS && !g.__emuAuth) {
  g.__emuAuth = true;
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
}

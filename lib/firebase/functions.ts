'use client';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { app, USING_EMULATORS } from './app';

export const functions = getFunctions(app, 'asia-southeast1');

const g = globalThis as Record<string, unknown>;
if (typeof window !== 'undefined' && USING_EMULATORS && !g.__emuFn) {
  g.__emuFn = true;
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

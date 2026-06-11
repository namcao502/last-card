'use client';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { app, USING_EMULATORS } from './app';

export const rtdb = getDatabase(app);

const g = globalThis as Record<string, unknown>;
if (typeof window !== 'undefined' && USING_EMULATORS && !g.__emuDb) {
  g.__emuDb = true;
  connectDatabaseEmulator(rtdb, '127.0.0.1', 9000);
}

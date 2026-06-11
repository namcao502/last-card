import { initializeApp, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { setGlobalOptions } from 'firebase-functions/v2';

// Deployment-wide options MUST be set here, not in index.ts. The functions are defined in
// rooms/game/bots and re-exported from index.ts, so those modules evaluate (and capture their
// region) before index.ts's body would run - making a setGlobalOptions call there too late.
// Every function module imports this file for `db`, so this runs first by dependency order.
// `enforceAppCheck` rejects callable requests without a valid App Check token. It is OFF by default
// (env-gated) so callables keep working until the client + Firebase console are configured; flip
// ENFORCE_APP_CHECK=true once App Check traffic shows as verified. It does NOT affect the driveBots
// event trigger (EventHandlerOptions omits enforceAppCheck).
setGlobalOptions({
  region: 'asia-southeast1',
  maxInstances: 10,
  enforceAppCheck: process.env.ENFORCE_APP_CHECK === 'true',
});

if (getApps().length === 0) initializeApp();
export const db = getDatabase();

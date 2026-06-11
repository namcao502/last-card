# Firebase App Check setup

App Check binds backend access (RTDB reads + callable Cloud Functions) to the real app, blocking
scripted/abusive clients that have your public Firebase config. The **code is already wired** (client
init in `lib/firebase.ts`, callable enforcement in `functions/src/firebase.ts`) but stays **inert
until you do the console + env steps below**, so nothing breaks before it's configured.

## 1. Console: register the app

1. Firebase console -> **App Check**. For the **Web app**, choose the **reCAPTCHA v3** provider and
   register it. Copy the **site key** it gives you.
2. Leave **enforcement OFF** for now (Realtime Database + Cloud Functions) so you can roll out safely.

## 2. Env vars

**Web (App Hosting / `.env.local`):**

```
NEXT_PUBLIC_FIREBASE_APPCHECK_KEY=<reCAPTCHA v3 site key>
# Local dev only - a debug token registered under App Check -> Apps -> Manage debug tokens
# (or set to `true` once to print a token in the browser console, then register it):
NEXT_PUBLIC_APPCHECK_DEBUG_TOKEN=
```

Add `NEXT_PUBLIC_FIREBASE_APPCHECK_KEY` to `apphosting.yaml` alongside the other
`NEXT_PUBLIC_FIREBASE_*` vars so production builds pick it up.

**Functions (`functions/.env` or deploy env):**

```
ENFORCE_APP_CHECK=false   # keep false until step 4
```

## 3. Deploy with App Check ON but enforcement OFF (monitor)

- Deploy the web app with the site key set. App Check tokens now flow with requests.
- In the console, watch **App Check -> metrics** for Realtime Database / Cloud Functions. You want
  the **verified** request share to climb to ~100% before enforcing. Old/cached clients show as
  unverified for a while - that's why we don't enforce immediately.

## 4. Enforce (once traffic is verified)

1. **Cloud Functions:** set `ENFORCE_APP_CHECK=true` and redeploy functions. (`setGlobalOptions`
   reads it; it rejects callables lacking a valid token. The `driveBots` trigger is unaffected.)
2. **Realtime Database:** in the console, turn on **enforcement** for RTDB under App Check.

## Rollback

- Functions: set `ENFORCE_APP_CHECK=false`, redeploy.
- RTDB: toggle enforcement off in the console.

## Notes

- Anonymous users are already rejected by `requireHuman`; App Check is the orthogonal "is this my
  app" check (vs. "is this a signed-in human").
- App Check is skipped automatically when `NEXT_PUBLIC_USE_EMULATORS=true`.
- When you ship the Capacitor iOS/Android apps later, add the **App Attest** (iOS) and **Play
  Integrity** (Android) providers in the console and the native App Check plugin.

'use client';
import { useEffect } from 'react';
import { onDisconnect, ref, set, onValue } from 'firebase/database';
import { rtdb } from '../firebase';
import { useAuth } from '../auth';

export function usePresence(roomId: string | null) {
  const { user } = useAuth();
  useEffect(() => {
    if (!roomId || !user) return;
    const pRef = ref(rtdb, `rooms/${roomId}/presence/${user.uid}`);
    const connRef = ref(rtdb, '.info/connected');
    const u = onValue(connRef, (snap) => {
      if (snap.val() === false) return;
      onDisconnect(pRef).set({ online: false, lastSeen: Date.now() }).then(() => {
        set(pRef, { online: true, lastSeen: Date.now() });
      });
    });
    return () => {
      u();
      // Disarm the deferred handler so it can't resurrect a left/reaped room, and
      // mark offline now (the membership rule no-ops this if we have already left).
      onDisconnect(pRef).cancel();
      set(pRef, { online: false, lastSeen: Date.now() }).catch(() => {});
    };
  }, [roomId, user]);
}

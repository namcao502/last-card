'use client';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { rtdb } from '../firebase';
import { useAuth } from '../auth';
import type { Card } from '@last-card/engine';

export interface HandState {
  cards: Card[];
  drawnPlayableCardId: string | null; // a just-drawn card you may play, or keep by drawing again
}

export function useHand(roomId: string | null): HandState {
  const { user } = useAuth();
  const [hand, setHand] = useState<HandState>({ cards: [], drawnPlayableCardId: null });
  useEffect(() => {
    if (!roomId || !user) return;
    const u = onValue(ref(rtdb, `hands/${roomId}/${user.uid}`), s => {
      const v = s.val();
      setHand({ cards: v?.cards ?? [], drawnPlayableCardId: v?.drawnPlayableCardId ?? null });
    });
    return () => u();
  }, [roomId, user]);
  return hand;
}

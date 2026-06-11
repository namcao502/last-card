'use client';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useT } from '@/lib/i18n/context';
import { Lobby } from './Lobby';
import { SignInGate } from './SignInGate';

// /play is only the room destination now (create/browse/join are home-page popups; the /play
// server route redirects any non-room request to the matching home dialog).
export function PlayClient() {
  const params = useSearchParams();
  const { user, ready } = useAuth();
  const t = useT();
  if (!ready) return <div className="p-10 text-center text-muted-foreground">{t.common.loading}</div>;
  if (!user) return <SignInGate />;
  const room = params.get('room');
  if (room) return <Lobby roomId={room} />;
  return null;
}

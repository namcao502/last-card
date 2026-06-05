'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEFAULT_CONFIG, type RuleConfig } from '@uno/engine';
import { useAuth } from '@/lib/auth';
import { callCreateRoom, callJoinRoom } from '@/lib/functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeckConfig } from './DeckConfig';
import { LIMITS, STRINGS } from '@/lib/constants';

function errMsg(e: unknown): string {
  const err = e as { code?: string; message?: string };
  const code = err?.code ?? '';
  // Surface the real error for debugging; the UI still shows a friendly message.
  console.error('Room action failed:', code, err?.message, e);
  if (code.includes('unauthenticated')) return STRINGS.errors.signInRequired;
  if (code.includes('permission-denied')) return STRINGS.errors.googleRequired;
  if (code.includes('not-found')) return STRINGS.errors.roomNotFound;
  if (code.includes('failed-precondition')) return STRINGS.errors.alreadyStarted;
  if (code.includes('resource-exhausted')) return STRINGS.errors.roomFull;
  if (code.includes('internal') || code.includes('unavailable')) return STRINGS.errors.serverUnreachable;
  return STRINGS.errors.generic;
}

export function CreateJoin({ mode }: { mode: 'create' | 'join' }) {
  const router = useRouter();
  const { nickname, setNickname, ready } = useAuth();
  const [config, setConfig] = useState<RuleConfig>(DEFAULT_CONFIG);
  const [code, setCode] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const create = async () => {
    setBusy(true); setError('');
    try {
      const res = await callCreateRoom({ name: nickname || STRINGS.createJoin.nicknamePlaceholder, config, isPublic });
      router.push(`/play?room=${res.data.roomId}`);
    } catch (e) { setError(errMsg(e)); setBusy(false); }
  };
  const join = async (role: 'player' | 'audience') => {
    setBusy(true); setError('');
    try {
      const res = await callJoinRoom({ code: code.trim().toUpperCase(), name: nickname || STRINGS.createJoin.nicknamePlaceholder, role });
      router.push(`/play?room=${res.data.roomId}`);
    } catch (e) { setError(errMsg(e)); setBusy(false); }
  };

  const codeReady = code.trim().length >= LIMITS.roomCodeLength;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-6 py-10">
      <h1 className="text-2xl font-black">{mode === 'join' ? STRINGS.createJoin.joinTitle : STRINGS.createJoin.createTitle}</h1>
      <div className="space-y-2">
        <Label htmlFor="nick">{STRINGS.createJoin.nicknameLabel}</Label>
        <Input id="nick" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, LIMITS.nicknameMax))} placeholder={STRINGS.createJoin.nicknamePlaceholder} maxLength={LIMITS.nicknameMax} />
      </div>
      {mode === 'join' ? (
        <div className="space-y-3">
          <Label htmlFor="code">{STRINGS.createJoin.roomCodeLabel}</Label>
          <Input id="code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, LIMITS.roomCodeLength))} placeholder="ABCD" className="uppercase tracking-widest" />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-wrap gap-2">
            <Button disabled={busy || !ready || !codeReady} onClick={() => join('player')}>{STRINGS.createJoin.joinAsPlayer}</Button>
            <Button variant="outline" disabled={busy || !ready || !codeReady} onClick={() => join('audience')}>{STRINGS.createJoin.watchAsAudience}</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            or <Link href="/play?browse=1" className="font-semibold text-foreground underline">{STRINGS.createJoin.browsePrompt}</Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">{STRINGS.createJoin.deckTitle}</h2>
          <DeckConfig config={config} onChange={setConfig} disabled={busy} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublic} disabled={busy} onChange={(e) => setIsPublic(e.target.checked)} className="h-4 w-4 accent-uno-yellow" />
            {STRINGS.createJoin.publicToggle}
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button disabled={busy || !ready} onClick={create} className="bg-uno-yellow text-uno-ink hover:bg-uno-yellow/90">
            {STRINGS.createJoin.createRoom}
          </Button>
        </div>
      )}
    </div>
  );
}

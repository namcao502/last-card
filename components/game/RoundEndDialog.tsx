'use client';
import Link from 'next/link';
import type { RoomMeta, SeatRow } from '@/lib/hooks/useRoom';
import { buttonVariants } from '@/components/ui/button';
import { STRINGS } from '@/lib/constants';

interface RoundEndDialogProps {
  meta: RoomMeta;
  seats: SeatRow[];
  winnerId: string | null;
}

export function RoundEndDialog({ meta, seats, winnerId }: RoundEndDialogProps) {
  if (meta.phase !== 'gameOver') return null;

  const winner = seats.find((s) => s.id === winnerId);
  const standings = [...seats].sort((a, b) => a.handCount - b.handCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 text-center">
        <h2 className="text-2xl font-black">{STRINGS.roundEnd.gameOver}</h2>
        <p className="mt-1 text-uno-yellow">{winner ? `${winner.name} wins!` : STRINGS.roundEnd.winnerDecided}</p>
        <ul className="mt-4 space-y-1 text-left text-sm">
          {standings.map((s) => (
            <li key={s.id} className="flex justify-between rounded border bg-background px-3 py-1.5">
              <span>{s.name}{s.id === winnerId ? ' 🏆' : ''}{s.status === 'out' ? ' (out)' : ''}</span>
              <span className="text-muted-foreground">{s.handCount} cards</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-center">
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>{STRINGS.common.backToHome}</Link>
        </div>
      </div>
    </div>
  );
}

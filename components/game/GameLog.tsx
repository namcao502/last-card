'use client';
import { useEffect, useRef } from 'react';
import type { Card, LogEntry } from '@last-card/engine';
import { GameCard } from './GameCard';
import { STRINGS } from '@/lib/constants';

/** RTDB may hand arrays back as keyed objects; restore a dense array (mirrors serde.toArray). */
function toArr<T>(v: unknown): T[] {
  if (Array.isArray(v)) return v.filter((x) => x != null) as T[];
  if (v && typeof v === 'object')
    return Object.keys(v as Record<string, T>)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => (v as Record<string, T>)[k])
      .filter((x) => x != null);
  return [];
}

/** A run of consecutive entries sharing one draw-stack `stackId`, or a single standalone entry. */
interface Block { key: string; stackId?: number; rows: LogEntry[] }

function groupEntries(entries: LogEntry[]): Block[] {
  const blocks: Block[] = [];
  for (const e of entries) {
    const last = blocks[blocks.length - 1];
    if (e.stackId != null && last && last.stackId === e.stackId) last.rows.push(e);
    else if (e.stackId != null) blocks.push({ key: `chain-${e.stackId}`, stackId: e.stackId, rows: [e] });
    else blocks.push({ key: `e-${e.seq}`, rows: [e] });
  }
  return blocks;
}

function Row({ e }: { e: LogEntry }) {
  return (
    <div className="flex flex-wrap items-center gap-1 text-sm leading-snug">
      <b className="text-lc-yellow">{e.actorName}</b>
      <span className="text-muted-foreground">{e.text}</span>
      {e.kind === 'play' && toArr<Card>(e.cards).map((c) => <GameCard key={c.id} card={c} small />)}
      {e.kind === 'draw' && (e.drawCount ?? 0) > 1 && (
        <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-bold tabular-nums">+{e.drawCount}</span>
      )}
    </div>
  );
}

export function GameLog({ log }: { log: readonly LogEntry[] }) {
  const entries = toArr<LogEntry>(log);
  const blocks = groupEntries(entries);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest entry in view as history grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries.length]);

  return (
    <div className="flex h-[260px] flex-col rounded-xl border bg-card">
      <div className="border-b px-4 py-3 font-bold">{STRINGS.game.historyTitle}</div>
      <div ref={scrollRef} className="flex flex-1 flex-col gap-2 overflow-auto px-4 py-3">
        {entries.length === 0 && <p className="text-sm text-muted-foreground">{STRINGS.game.emptyHistory}</p>}
        {blocks.map((b) =>
          b.stackId != null ? (
            <div key={b.key} className="rounded-md border-l-2 border-lc-yellow bg-muted/30 py-1 pl-2 pr-1">
              <div className="text-[10px] font-bold uppercase tracking-wide text-lc-yellow/80">{STRINGS.game.drawChain}</div>
              {b.rows.map((e) => <Row key={e.seq} e={e} />)}
            </div>
          ) : (
            <Row key={b.key} e={b.rows[0]} />
          ),
        )}
      </div>
    </div>
  );
}

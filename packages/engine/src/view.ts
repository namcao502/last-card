import type { Card, CardColor } from './cards';
import { recycleTarget, type GameState, type GamePhase, type PendingDraw, type PendingUntil, type DuelState, type BombResponse, type LogEntry } from './state';

export interface PublicPlayer {
  id: string; name: string; isBot: boolean; connected: boolean;
  status: 'active' | 'out'; handCount: number;
}
export interface PublicView {
  phase: GamePhase;
  players: PublicPlayer[];
  discardTop: Card;
  recycleCopies: Card | null;   // the card a recycle played now would copy (sees through recycles)
  currentColor: CardColor;
  colorLocked: boolean;
  turnId: string;
  direction: 1 | -1;
  pending: PendingDraw | null;
  pendingUntil: PendingUntil | null;
  duel: DuelState | null;
  bombResponse: BombResponse | null;
  goAgain: boolean;
  drawnPlayable: { playerId: string; cardId: string } | null; // owner-only: a just-drawn card you may play or keep
  drawCount: number;
  winnerId: string | null;
  log: LogEntry[];
  you: { id: string; hand: Card[] } | null;
}

export function redactFor(state: GameState, viewerId: string | null): PublicView {
  const me = viewerId ? state.players.find(p => p.id === viewerId) ?? null : null;
  const turnId = state.phase === 'bombResponse' && state.bombResponse ? state.bombResponse.pending[0]
    : state.phase === 'duel' && state.duel ? state.duel.activeId
    : state.players[state.turnIndex]?.id ?? '';
  return {
    phase: state.phase,
    players: state.players.map(p => ({
      id: p.id, name: p.name, isBot: p.isBot, connected: p.connected,
      status: p.status, handCount: p.hand.length,
    })),
    discardTop: state.discardPile[state.discardPile.length - 1],
    recycleCopies: recycleTarget(state.discardPile)?.card ?? null,
    currentColor: state.currentColor,
    colorLocked: state.colorLocked,
    turnId,
    direction: state.direction,
    pending: state.pending,
    pendingUntil: state.pendingUntil,
    duel: state.duel,
    bombResponse: state.bombResponse,
    goAgain: state.goAgain,
    drawnPlayable: me && state.drawnPlayable?.playerId === me.id ? state.drawnPlayable : null,
    drawCount: state.drawPile.length,
    winnerId: state.winnerId,
    log: state.log,
    you: me ? { id: me.id, hand: me.hand } : null,
  };
}

import type { Card, CardKind } from '@last-card/engine';
import {
  Ban, RotateCcw, Swords, Bomb, Recycle, Eye, ArrowLeftRight,
  Hand, Gift, VenetianMask, Shield, Reply, Rainbow, Divide, Undo2, type LucideIcon,
} from 'lucide-react';

/**
 * Icon shown on a card's face. Number / draw / mult cards render their value as text,
 * and minus renders the "-#" glyph, so they have no icon here. Reverse-draw shows the
 * Undo2 icon with its value kept in the corner.
 */
const CARD_ICONS: Partial<Record<CardKind, LucideIcon>> = {
  skip: Ban,
  playAgain: RotateCcw,
  duel: Swords,
  bomb: Bomb,
  recycle: Recycle,
  eye: Eye,
  swap: ArrowLeftRight,
  steal: Hand,
  gift: Gift,
  drawUntilColor: VenetianMask,
  shield: Shield,
  counter: Reply,
  wild: Rainbow,
  div: Divide,
  reverseDraw: Undo2,
};

export function hasCardIcon(card: Card): boolean {
  return card.kind in CARD_ICONS;
}

interface CardIconProps {
  card: Card;
  className?: string;
}

/** Renders the lucide icon for a card, or nothing for value/text cards (numbers, draws, mult, minus). */
export function CardIcon({ card, className }: CardIconProps) {
  const Icon = CARD_ICONS[card.kind];
  if (!Icon) return null;
  return <Icon className={className} strokeWidth={2.5} aria-hidden />;
}

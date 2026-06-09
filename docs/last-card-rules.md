# Last Card - Full Rules

Last Card is a server-authoritative multiplayer shedding game in the UNO / Crazy Eights family. The
goal is simple - be the first to empty your hand - but getting there is not, because the deck is full
of draw stacks, reversals, duels, bombs, and cards that mess with other players' hands.

> This document describes the rules exactly as the game engine enforces them. The deck composition and
> a couple of settings are configurable in the lobby; the numbers below are the defaults.

---

## 1. Objective

- You win by **emptying your hand**.
- If every other player is eliminated, the **last player standing** wins.
- You cannot finish on certain cards - see Section 11, "Finishing, winning, and elimination".

---

## 2. The deck

There are four colors - **Red, Green, Blue, Yellow** - plus **Black** (colorless) cards that can be
played on anything. Default deck (180 cards):

### Colored cards (counts are per color, so multiply by 4)

| Card | Per color | Total | Notes |
|------|-----------|-------|-------|
| Numbers 0-10 | 2 of each rank | 88 | the building blocks; combine into pairs / runs |
| +2 (colored draw) | 2 | 8 | opens / extends a draw stack |
| +4 (colored draw) | 2 | 8 | opens / extends a draw stack |
| Play again | 2 | 8 | take another turn |
| Skip | 2 | 8 | next player loses their turn |
| Minus (-#) | 1 | 4 | dump chosen cards of a single color |

### Black (colorless) cards

| Card | Count | Card | Count |
|------|-------|------|-------|
| +2 / +4 / +6 / +8 / +10 (black draw) | 2 each (10) | Recycle | 4 |
| x2 | 4 | Wild | 4 |
| /2 | 4 | Eye | 3 |
| +4T (Duel) | 2 | Swap | 2 |
| ++4 (Bomb) | 2 | Steal | 3 |
| Reverse +4 | 2 | Gift | 3 |
| Reverse +10 | 2 | Draw-until-color | 3 |
| Shield | 4 | Counter | 4 |

---

## 3. Setup

- Each player is dealt a starting hand (default **7** cards). Default table size is up to **6** players
  (configurable 2-10).
- The opening card on the discard pile is a **random non-black colored card** - it may be a colored
  special (e.g. a skip or +2). Only its **color** seeds the game; an opening special's effect is **not**
  applied. The game never starts on a black card.
- The starting color is that card's color, and play begins clockwise.

---

## 4. Your turn: play or draw

On your turn you do exactly one of:

1. **Play** a legal card (or a legal multi-card set - see Section 6), or
2. **Draw one** card from the draw pile. If the card you draw is **playable**, you may immediately play
   it (only that card) or keep it and pass the turn. If it is not playable, your turn ends.

If a draw stack is active against you, your options are different - see Section 7.

---

## 5. Matching: what can follow what

When no draw stack is active and the color is not locked, you may play a card if **any** of these is
true:

- it is **black** (colorless) - black plays on anything;
- its **color** matches the current color;
- it is a **number** equal in value to the number on top of the pile (color does not matter);
- it is a **non-number** card of the **same kind** as the card on top (e.g. a Skip on a Skip).

**Active color.** Playing a **colored** card makes its color the new active color (for a run or
consecutive pairs, the color of the highest card played - they are all the same color anyway).

**Choosing a color.** Most black cards keep the current color. Five black card groups make you **pick
the new active color** when you play them: **Black +draws, Wild, Draw-until-color, +4T Duel, ++4 Bomb**.
For a Black +draw, your chosen color is the color the next player must follow after the stack is drawn
or otherwise resolved. (Reverse +draws are black but **keep** the current color - they do not ask you to
choose one.)

**Color lock.** Playing a run or consecutive pairs (Section 6) locks the color: the next player
must match the locked color. Black cards still ignore the lock.

---

## 6. Multi-card plays

You can play more than one card in a single turn in these shapes:

- **Pair** - two cards of the **same color and same number** (e.g. two Red 7s).
- **Run** - **3 or more** numbers of the **same color** in consecutive ascending order (e.g. Red 6-7-8).
  A run **locks the color** for the next player.
- **Consecutive pairs** - **three or more** consecutive ranks (so **6+ cards**), each rank appearing
  twice, all the **same color** (e.g. 6 6 7 7 8 8, or 6 6 7 7 8 8 9 9). Also **locks the color**.
- **x2 with a + card** - a draw card together with an x2 (see Section 7).

The lead card - the **lowest** card of a run or consecutive pairs, or either card of a pair - must be
legal to play on the pile by the rules in Section 5. After a run or consecutive pairs, the card left
"on top" (and the locked color) is the **highest** one played. Multi-card sets cannot be played onto an
active draw stack.

---

## 7. Draw stacks (the +N system)

A draw card creates a **stack** that the next player must answer. The stack tracks a **running total**
(how many cards will be drawn) and a **top value** (the value of the most recent + card, which sets the
bar for stacking further).

### Opening a stack

Playing any draw card with no stack active opens one:

- Colored draws: **+2, +4**.
- Black draws: **+2, +4, +6, +8, +10**.
- Reverse draws: **+4, +10** - these also **flip the direction** of play and aim the stack at the
  **previous** player (the new "next"). See Section 9.

The stack's total and top value both start at the card's value, and it passes to the next player
(for a reverse draw, the next player after the direction flips).

### Answering a stack

When it is your turn and a stack is active, you must do exactly **one** of the following. You may not
play any ordinary card, and you may not play a multi-card set (pair / run) onto a stack.

- **Draw the total.** Take the full running total into your hand. The stack clears and your turn ends.
- **Stack another +draw.** Its value must be **greater than or equal to the current top value**. Its
  value is added to the total, it becomes the new top value, and the stack passes on. Colored +draws
  can stack on colored +draws across colors if the value is equal or higher: Red +2 -> Blue +2 -> Blue
  +4 is legal. Black +draws can stack on either colored or black +draws if their value is equal or
  higher. If the current top +draw is **Black**, the next +draw must also be **Black**; for example, a
  Red +4 cannot be stacked on a Black +4.
- **Play x2.** See below.
- **Play /2.** The total is **halved (rounded down)**, **you** draw that many, and the stack clears.
- **Shield** - pass the entire stack, unchanged, to the **next** player. (Not allowed as your last card.)
- **Counter** - bounce the entire stack back to the **previous** player. (Not allowed as your last card.)

Once the stack is finally drawn, the active color is the color of the **last +draw** played onto it -
its own color for a colored draw, or the chooser's color for a black draw.

### ✖️ x2

x2 can only be played on an active stack. It comes in two forms:

- **With a + card** (the + card must be `>=` the current top value): that + card's value is **doubled**
  and added to the total, and the + card's value becomes the new top value.
  Example: A plays +2, B plays +4, C plays +4 together with x2 -> the next player draws `2 + 4 + 8 = 14`.
- **Alone** (no + card attached): the **current top value is added again** - in effect this doubles the
  most recent + card. The top value is unchanged.
  Example: A plays +2, B plays +4, C plays x2 -> the next player draws `2 + 4 + 4 = 10`.

x2 is a black card, so (like any black card) it **cannot be your last card** - you cannot finish on it.

### ➗ /2

- Only playable on an active stack.
- Halves the running total (rounded down); the player who plays /2 draws the result and the stack clears.
- Example: A plays +2, B plays +4, C plays /2 -> C draws `6 / 2 = 3`.

---

## 8. Colored special cards

### 🔁 Play again

- You immediately take **another turn**.
- Your next card must be one of: a card of the **play-again card's color**, **another Play again** (any
  color), or a **black** card. If you cannot or do not want to continue, drawing one card ends the chain.

### 🈲 Skip

- The next player **loses their turn**.

### 🔻 Minus (-#)

- Optional: after playing it, **choose which of your cards of the same color** as this card to discard -
  none, some, or all of them. Useful for dumping a flooded color in one move.
- A minus is a **colored** card, so you may dump down to an **empty hand to win**. (A *recycled* minus
  is black and cannot empty your hand - see Recycle.)

---

## 9. Black (colorless) cards

Black cards can be played on any color. The draw / x2 / /2 cards are covered in Section 7. The rest:

### 🔁 Reverse +4 / +10

- **Reverses the direction of play**, then opens a **+4 / +10 draw stack aimed at the previous player**
  (who becomes the next to act). The active color is **unchanged** (reverse does not pick a color).
- It opens a **black** stack, so that player answers it like any black draw stack: draw the total,
  Shield, Counter, /2, or stack a **black** +draw of equal-or-higher value (a colored +draw cannot stack
  on it). Responding to it is their turn.
- Reverse opens a stack but cannot itself be played onto an existing one (no flipping mid-stack).

### 💥 +4T (Duel)

- Choose an opponent and **pick the active color**. The two of you enter a private **1v1 duel** that
  starts with a **+4** stack aimed at your target.
- The duel's +4 is a **black** stack, so the two duelists trade stack responses - draw, stack a
  **black** +draw (equal-or-higher), x2, /2, Shield, Counter - until one of them **draws the stack** or
  **plays /2**, which ends the duel. Shield / Counter just pass the stack to the other duelist.
- When the duel ends, normal play resumes from the player **after the challenger**, in the chosen color.

### 💣 ++4 (Bomb)

- Can only be played on a **number** card. Pick the active color.
- **Every other active player**, in turn order, must either **accept** (draw 4) or play a **Shield /
  Counter** to bounce it (which sends 4 back to you - the bomber - per bounce).
- A player down to their **last card cannot** Shield / Counter the bomb; they must accept.
- After everyone has responded, you draw the total bounced back at you, the color is set to your choice,
  and play continues from the player after you.

### 🔄 Recycle

- Repeats the **effect of the card directly beneath it** on the discard pile (including special effects).
  If it copies a **+draw**, it opens a fresh draw stack; if it copies a **minus**, you choose which
  cards (of the copied minus's color) to dump - but you cannot empty your hand, since recycle is black.
- If that card needs a color, target, or gift card, you supply those when you recycle.
- You **can** recycle onto another Recycle: it is treated as the card that Recycle copied, so it
  **sees through** the recycle(s) to the nearest real card beneath and repeats that. You still cannot
  recycle the opening card (there is nothing real to copy).

### 👁 Eye

- Choose an opponent and **secretly view their entire hand** (shown only to you).

### 🔄 Swap hand

- Choose an opponent and **exchange your whole hand** with theirs.

### 🥷 Steal

- Choose an opponent and take **one random card** from their hand (you do not see it first).

### 🎁 Gift

- Choose an opponent and **give them one card** from your hand.

### 🃏 Wild

- **Pick the active color.** The next player must follow it (or play black).

### 📥 Draw-until-color

- Pick a color and aim the threat at the next player. They must answer it on their turn:
  - **Bounce it.** Play your own **draw-until-color** (pick a new color) or a **recycle** (which copies the
    draw-until-color on top, you pick a new color) to pass the threat on to the next player. It chains around
    the table this way until someone takes it.
  - **Take it.** Otherwise you **keep drawing until you draw a card of the chosen color**, then you are
    **skipped**. (You also take it automatically if you hold no draw-until-color or recycle.)
- You cannot bounce with your last card (draw-until-color and recycle are black, and you cannot finish
  on a black card), so you must take it.

---

## 10. Defensive cards

### 🛡 Shield

- Only playable against an active draw stack (including a Bomb).
- Passes the **entire stack to the next player**, unchanged.
- Cannot be your last card.

### 🌀 Counter

- Only playable against an active draw stack (including a Bomb).
- **Bounces the entire stack back to the previous player.**
- Cannot be your last card.

---

## 11. Finishing, winning, and elimination

- **Win** by emptying your hand, or by being the last active player when everyone else is out.
- **You cannot finish on a black card.** A play that would empty your hand on a black (colorless) card is
  illegal - this covers **every** black card: Wild, a black +draw, x2, /2, +4T Duel, ++4 Bomb, Recycle,
  Draw-until-color, Eye / Swap / Steal, Shield, Counter, and Gift. A Gift also sheds the gifted card, so
  it cannot be your second-to-last card either, and a recycled minus cannot dump your hand to zero. End
  the game on a **colored** card (number, colored +draw, Play again, Skip, or Minus).
- **Hand overload.** If your hand ever grows past **30 cards** (from drawing a stack, Steal, Gift, Bomb,
  or Draw-until-color), you are **eliminated** and become a spectator.

---

## 12. Other rules

- **Illegal plays** are simply rejected; the game state does not change and there is no penalty. Play a
  legal card or draw instead.
- **Running out of draw cards.** When the draw pile is empty, all discarded cards except the one on top
  are shuffled back into a new draw pile.
- **Turn timer and disconnects.** Each turn has a time limit (about **30 seconds**). If you run out of
  time or disconnect, the server plays the safe default for you: absorb a pending draw stack, take a
  draw-until-color threat, accept a bomb, or otherwise pass the turn with no penalty. A player who stays
  disconnected past a **30-second** grace period becomes a spectator; reconnecting in time restores you.
- **No playable card.** If it is your turn and nothing in your hand is legal, the game draws for you
  automatically (you do not have to hunt for the draw button).

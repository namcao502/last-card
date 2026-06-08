'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/lib/auth';
import { STRINGS } from '@/lib/constants';

export function SiteHeader() {
  const { user, signInGoogle, signOutUser } = useAuth();
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-wide">
        <span className="inline-flex h-8 items-center justify-center rounded-md border-2 border-white bg-lc-red px-1.5 text-xs font-black text-white">LC</span>
        LAST CARD
      </Link>
      <nav className="flex items-center gap-3 text-sm font-semibold text-muted-foreground sm:gap-5">
        <Link href="/how-to-play" className="hidden hover:text-foreground sm:inline">{STRINGS.header.howToPlay}</Link>
        <Link href="/rules" className="hidden hover:text-foreground sm:inline">{STRINGS.header.houseRules}</Link>
        <Link href="/about" className="hidden hover:text-foreground sm:inline">{STRINGS.header.about}</Link>
        <ThemeToggle />
        {user ? (
          <>
            <span className="hidden text-foreground sm:inline">{user.displayName ?? STRINGS.createJoin.nicknamePlaceholder}</span>
            <Button variant="outline" size="sm" onClick={() => { signOutUser().catch(() => {}); }}>
              {STRINGS.header.signOut}
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => { signInGoogle().catch(() => {}); }}>
            {STRINGS.header.signIn}
          </Button>
        )}
      </nav>
    </header>
  );
}

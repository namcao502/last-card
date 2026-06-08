'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import { STRINGS } from '@/lib/constants';

export function SignInGate() {
  const { signInGoogle } = useAuth();
  return (
    <div className="mx-auto w-full max-w-md space-y-6 px-6 py-16 text-center">
      <h1 className="text-2xl font-black">{STRINGS.signInGate.title}</h1>
      <p className="text-muted-foreground">{STRINGS.signInGate.subtitle}</p>
      <Button
        onClick={() => { signInGoogle().catch(() => {}); }}
        className="w-full bg-lc-yellow text-lc-ink hover:bg-lc-yellow/90"
      >
        {STRINGS.signInGate.cta}
      </Button>
      <Link href="/" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
        {STRINGS.common.backToHome}
      </Link>
    </div>
  );
}

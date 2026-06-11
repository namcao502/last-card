import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { PlayClient } from '@/components/lobby/PlayClient';

// Create / browse / join now happen in popups on the home page. /play is only the room
// destination (lobby + game); any non-room request is sent to the matching home dialog.
export default async function PlayPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  if (!sp.room) {
    redirect(
      sp.browse !== undefined ? '/?browse'
        : sp.join !== undefined ? '/?join'
        : sp.create !== undefined ? '/?create'
        : '/',
    );
  }

  return (
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading...</div>}>
      <PlayClient />
    </Suspense>
  );
}

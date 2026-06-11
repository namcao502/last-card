import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Last Card',
    short_name: 'Last Card',
    description: 'A fast, real-time multiplayer card game where you race to empty your hand.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#15161c',
    theme_color: '#15161c',
    categories: ['games', 'entertainment'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

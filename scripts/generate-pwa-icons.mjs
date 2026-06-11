// Generates every app icon from one brand "card fan" SVG (no font dependency):
//   public/icon-192.png, icon-512.png, icon-maskable.png   (PWA manifest)
//   app/apple-icon.png                                      (iOS home screen)
//   app/icon.svg                                            (modern crisp favicon)
//   app/favicon.ico                                         (legacy / Safari favicon, 16/32/48)
// Run: node scripts/generate-pwa-icons.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Dark brand ground with a three-card fan: blue + red flanking a prominent brand-yellow card on top
// (white borders). Content sits inside the maskable safe zone, so it doubles as a maskable icon.
const card = (rot, y, fill) =>
  `<g transform="rotate(${rot} 256 412)"><rect x="190" y="${y}" width="132" height="${412 - y}" rx="22" fill="${fill}"/></g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#15161c"/>
  <g stroke="#ffffff" stroke-width="14" stroke-linejoin="round">
    ${card(-24, 206, '#2b6cb0')}
    ${card(24, 206, '#e63946')}
    ${card(0, 196, '#f4c430')}
  </g>
</svg>`;

const buf = Buffer.from(svg);
const pngAt = (size) => sharp(buf).resize(size, size).png().toBuffer();

// --- PNG icons ---
const pngTargets = [
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
  ['public/icon-maskable.png', 512],
  ['app/apple-icon.png', 180],
];
for (const [file, size] of pngTargets) {
  await sharp(buf).resize(size, size).png().toFile(file);
  console.log('wrote', file, `${size}x${size}`);
}

// --- Modern SVG favicon (scales crisply in current browsers) ---
await writeFile('app/icon.svg', svg);
console.log('wrote app/icon.svg');

// --- Legacy favicon.ico (16/32/48, PNG-in-ICO) for Safari / older browsers ---
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(async (s) => ({ size: s, data: await pngAt(s) })));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
const dir = Buffer.alloc(images.length * 16);
let offset = 6 + dir.length;
images.forEach((img, i) => {
  const e = i * 16;
  dir.writeUInt8(img.size, e + 0); // width
  dir.writeUInt8(img.size, e + 1); // height
  dir.writeUInt8(0, e + 2);        // palette colors
  dir.writeUInt8(0, e + 3);        // reserved
  dir.writeUInt16LE(1, e + 4);     // color planes
  dir.writeUInt16LE(32, e + 6);    // bits per pixel
  dir.writeUInt32LE(img.data.length, e + 8);
  dir.writeUInt32LE(offset, e + 12);
  offset += img.data.length;
});
await writeFile('app/favicon.ico', Buffer.concat([header, dir, ...images.map((i) => i.data)]));
console.log('wrote app/favicon.ico', sizes.join('/'));

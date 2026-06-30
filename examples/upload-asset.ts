#!/usr/bin/env -S npm run tsn -T
// Upload a file to FLORA in a single call.
//
// `assets.upload` picks the optimal path automatically:
//   - a public URL is fetched server-side,
//   - a local file ≤ 4 MB is sent as direct bytes in one request,
//   - a larger local file reserves a signed URL, streams the bytes, and completes,
// then polls until the asset is ready.

import FLORA from '@flora-ai/flora';

const client = new FLORA();

async function main() {
  const workspace_id = process.env['FLORA_WORKSPACE_ID'] ?? 'ws_abc123';

  // From a local file path (Node.js):
  const asset = await client.assets.upload('./hero.png', { workspace_id });
  console.log('ready asset:', asset.asset_id, asset.url);

  // From a Buffer / Blob (provide a file_name so it lands nicely):
  // await client.assets.upload(Buffer.from('...'), { workspace_id, file_name: 'note.txt' });

  // From a public URL (fetched server-side, no local bytes):
  // await client.assets.upload('https://example.com/image.png', { workspace_id });
}

main();

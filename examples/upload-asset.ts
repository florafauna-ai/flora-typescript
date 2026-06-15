#!/usr/bin/env -S npm run tsn -T
// Upload a local file to FLORA in a single call.
//
// `assets.upload` detects the input (a filesystem path, Blob, Buffer, stream, or
// File), reserves a signed upload URL, pushes the bytes, marks the upload
// complete, and polls until the asset is ready — collapsing the whole
// reserve -> PUT -> complete -> poll dance into one line.

import FLORA from '@flora-ai/flora';

const client = new FLORA();

async function main() {
  const workspace_id = process.env['FLORA_WORKSPACE_ID'] ?? 'ws_abc123';

  // From a local file path (Node.js):
  const asset = await client.assets.upload('./hero.png', { workspace_id });
  console.log('ready asset:', asset.asset_id, asset.url);

  // From a Buffer / Blob works too — provide a file_name so it lands nicely:
  // const asset = await client.assets.upload(Buffer.from('...'), {
  //   workspace_id,
  //   file_name: 'note.txt',
  //   content_type: 'text/plain',
  // });

  // From an allowlisted URL — the API fetches it server-side (no local bytes):
  // const asset = await client.assets.upload('https://media.flora.ai/example.png', {
  //   workspace_id,
  // });
}

main();

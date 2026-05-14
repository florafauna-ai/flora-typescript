import { expect, test } from '@playwright/test';
import { createLiveFloraClient, expectAPIError } from '../helpers/live-flora-api';

test.describe('assets resource @resource:assets', () => {
  test('lists assets from the live Flora API', async () => {
    const client = createLiveFloraClient();
    const page = await client.assets.list({ limit: 1 });

    expect(Array.isArray(page.assets)).toBe(true);
    for (const asset of page.assets) {
      expect(asset.asset_id).toBeTruthy();
    }
  });

  test('retrieves an asset when the live workspace has one', async () => {
    const client = createLiveFloraClient();
    const page = await client.assets.list({ limit: 1 });
    const assetID = page.assets[0]?.asset_id;

    test.skip(!assetID, 'No assets are available to retrieve for this API key');

    const asset = await client.assets.retrieve(assetID!);
    expect(asset.asset_id).toBe(assetID);
  });

  test('rejects invalid asset mutations on the live Flora API', async () => {
    const client = createLiveFloraClient();

    await expectAPIError(client.assets.create({} as never), [400, 422]);
    await expectAPIError(client.assets.complete('asset_checkly_missing'), [404, 422]);
    await expectAPIError(client.assets.retry('asset_checkly_missing'), [404, 422]);
  });
});

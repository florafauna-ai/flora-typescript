import { test } from '@playwright/test';
import { createLiveFloraClient, expectAPIError } from '../helpers/live-flora-api';

test.describe('runs resource @resource:runs', () => {
  test('rejects invalid generation run requests on the live Flora API', async () => {
    const client = createLiveFloraClient();

    await expectAPIError(client.runs.startGeneration({} as never), [400, 422]);
  });

  test('rejects invalid technique run requests on the live Flora API', async () => {
    const client = createLiveFloraClient();

    await expectAPIError(client.runs.startTechnique({} as never), [400, 422]);
  });
});

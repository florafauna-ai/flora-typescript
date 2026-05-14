import { test } from '@playwright/test';
import { createLiveFloraClient, expectAPIError } from '../helpers/live-flora-api';

test.describe('feedback resource @resource:feedback', () => {
  test('rejects invalid feedback requests on the live Flora API', async () => {
    const client = createLiveFloraClient();

    await expectAPIError(client.feedback.record({} as never), [400, 422]);
  });
});

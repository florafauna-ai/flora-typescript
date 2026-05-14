import { expect, test } from '@playwright/test';
import { createLiveFloraClient } from '../helpers/live-flora-api';

test.describe('models resource @resource:models', () => {
  test('lists image model catalog entries from the live Flora API', async () => {
    const client = createLiveFloraClient();
    const response = await client.models.list({ type: 'image' });

    expect(response.models.length).toBeGreaterThan(0);
    for (const model of response.models) {
      expect(model.model_id).toEqual(expect.any(String));
      expect(model.name).toEqual(expect.any(String));
      expect(model.type).toBe('image');
    }
  });

  test('lists text model catalog entries from the live Flora API', async () => {
    const client = createLiveFloraClient();
    const response = await client.models.list({ type: 'text' });

    for (const model of response.models) {
      expect(model.model_id).toEqual(expect.any(String));
      expect(model.name).toEqual(expect.any(String));
      expect(model.type).toBe('text');
    }
  });
});

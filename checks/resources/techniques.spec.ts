import { expect, test } from '@playwright/test';
import type { APIError } from '../../src/core/error';
import type { RunCreateParams } from '../../src/resources/techniques/runs';
import {
  createLiveFloraClient,
  expectSuccessOrClientError,
  getWorkspaceID,
  sleep,
  uploadAssetFromURL,
} from '../helpers/live-flora-api';

test.describe('techniques resource @resource:techniques', () => {
  const cctvTechniqueID = 'cctv-cam';
  const cctvInputImageURL =
    'https://pub-a89b00cd5692498e98a80142412cad13.r2.dev/FLORA%20Logoform%20Black.png';

  test('retrieves the cctv-cam technique from the live Flora API', async () => {
    const client = createLiveFloraClient();
    const retrieved = await expectSuccessOrClientError(client.techniques.retrieve(cctvTechniqueID));

    if (!retrieved) {
      test.skip(true, 'The cctv-cam technique is not accessible to this API key');
      return;
    }

    expect(retrieved.technique_id).toEqual(expect.any(String));
    expect(retrieved.name).toEqual(expect.any(String));
    expect(Array.isArray(retrieved.inputs)).toBe(true);
    expect(Array.isArray(retrieved.outputs)).toBe(true);
  });

  test('uploads an asset and runs it through the cctv-cam technique', async () => {
    test.setTimeout(180_000);

    const client = createLiveFloraClient();
    const workspaceID = await getWorkspaceID(client);
    const technique = await expectSuccessOrClientError(client.techniques.retrieve(cctvTechniqueID));

    if (!technique) {
      test.skip(true, 'The cctv-cam technique is not accessible to this API key');
      return;
    }

    const imageInput = technique.inputs.find((input) => input.type === 'imageUrl');
    test.skip(!imageInput, 'The cctv-cam technique does not expose an image input');

    const asset = await uploadAssetFromURL(client, workspaceID, cctvInputImageURL);
    console.log(`[checkly] Uploaded cctv-cam input asset: ${asset.asset_id} (${asset.url})`);

    const inputs: RunCreateParams.Input[] = [];
    for (const input of technique.inputs) {
      if (input.type === 'imageUrl') {
        inputs.push({ id: input.id, type: input.type, value: asset.url! });
      }

      if (input.type === 'text') {
        inputs.push({ id: input.id, type: input.type, value: 'Checkly CCTV smoke test' });
      }
    }

    const run = await client.techniques.runs.create(cctvTechniqueID, {
      mode: 'async',
      inputs,
    });

    console.log(`[checkly] Started cctv-cam technique run: ${run.runId}`);

    const completedRun = await pollTechniqueRun(client, cctvTechniqueID, run.runId);
    expect(completedRun.status).toBe('completed');
    expect(completedRun.outputs?.length).toBeGreaterThan(0);
    for (const output of completedRun.outputs ?? []) {
      expect(output.outputId).toEqual(expect.any(String));
      expect(output.url).toEqual(expect.any(String));
    }
  });
});

const pollTechniqueRun = async (
  client: ReturnType<typeof createLiveFloraClient>,
  techniqueID: string,
  runID: string,
) => {
  const deadline = Date.now() + 150_000;
  let latest;

  try {
    latest = await client.techniques.runs.retrieve(runID, { techniqueId: techniqueID });
  } catch (error) {
    throw new Error(
      `Could not poll cctv-cam technique run ${runID}: ${(error as APIError).status ?? 'unknown status'} ${
        (error as Error).message
      }`,
    );
  }

  while (Date.now() < deadline) {
    console.log(`[checkly] cctv-cam run ${runID} status: ${latest.status} (${latest.progress}%)`);

    if (latest.status === 'completed') {
      return latest;
    }

    if (latest.status === 'failed') {
      throw new Error(
        `cctv-cam technique run ${runID} failed: ${latest.errorCode ?? 'unknown'} ${
          latest.errorMessage ?? ''
        } ${JSON.stringify(latest.outputs ?? [])}`.trim(),
      );
    }

    await sleep(5_000);
    latest = await client.techniques.runs.retrieve(runID, { techniqueId: techniqueID });
  }

  throw new Error(`Timed out waiting for cctv-cam technique run ${runID}; latest status: ${latest.status}`);
};

import { expect } from '@playwright/test';
import type { APIError } from '../../src/core/error';
import Flora from '../../src/index';
import type { AssetRetrieveResponse } from '../../src/resources/assets';
import type { WorkspaceListResponse } from '../../src/resources/workspaces';

type ExpectedStatus = number | number[];
type Workspace = WorkspaceListResponse.Workspace;

const expectedStatuses = (status: ExpectedStatus) => (Array.isArray(status) ? status : [status]);
const loggedWorkspaceIDs = new Set<string>();

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} must be set to run the live Flora API smoke checks`);
  }
  return value;
};

export const createLiveFloraClient = () =>
  new Flora({
    apiKey: requireEnv('FLORA_API_KEY'),
    baseURL: process.env.FLORA_BASE_URL,
    maxRetries: 1,
    timeout: 20_000,
  });

export const expectAPIError = async (request: Promise<unknown>, status: ExpectedStatus) => {
  const statuses = expectedStatuses(status);
  try {
    await request;
  } catch (error) {
    expect(error).toBeInstanceOf(Flora.APIError);
    expect(statuses).toContain((error as APIError).status);
    return;
  }

  throw new Error(`Expected Flora API request to fail with status ${statuses.join(' or ')}`);
};

export const expectClientError = async (request: Promise<unknown>) => {
  try {
    await request;
  } catch (error) {
    expect(error).toBeInstanceOf(Flora.APIError);
    expect((error as APIError).status).toBeGreaterThanOrEqual(400);
    expect((error as APIError).status).toBeLessThan(500);
    return;
  }

  throw new Error('Expected Flora API request to fail with a 4xx client error');
};

export const expectSuccessOrClientError = async <Result>(request: Promise<Result>) => {
  try {
    return await request;
  } catch (error) {
    expect(error).toBeInstanceOf(Flora.APIError);
    expect((error as APIError).status).toBeGreaterThanOrEqual(400);
    expect((error as APIError).status).toBeLessThan(500);
    return undefined;
  }
};

export const getWorkspace = async (client: Flora): Promise<Workspace> => {
  const workspaces = await client.workspaces.list();
  expect(workspaces.workspaces.length).toBeGreaterThan(0);
  const configuredWorkspaceID = process.env.FLORA_WORKSPACE_ID;
  const workspace =
    workspaces.workspaces.find((candidate) => candidate.workspace_id === configuredWorkspaceID) ??
    workspaces.workspaces[0];
  expect(workspace?.workspace_id).toBeTruthy();

  if (workspace && !loggedWorkspaceIDs.has(workspace.workspace_id)) {
    loggedWorkspaceIDs.add(workspace.workspace_id);
    console.log(`[checkly] Using Flora workspace: ${workspace.name} (${workspace.workspace_id})`);
  }

  return workspace!;
};

export const getWorkspaceID = async (client: Flora) => {
  const workspace = await getWorkspace(client);
  return workspace.workspace_id;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadAssetFromURL = async (client: Flora, workspaceID: string, sourceURL: string) => {
  const sourceResponse = await fetch(sourceURL);
  expect(sourceResponse.ok).toBe(true);

  const contentType = sourceResponse.headers.get('content-type') ?? 'application/octet-stream';
  const fileName = sourceURLFileName(sourceURL);
  const fileBytes = await sourceResponse.arrayBuffer();

  const reservation = await client.assets.create({
    source: 'signed-url',
    workspace_id: workspaceID,
    content_type: contentType,
    file_name: fileName,
  });

  expect(reservation.asset_id).toEqual(expect.any(String));
  expect(reservation.upload).toBeTruthy();

  const upload = reservation.upload!;
  const body = new FormData();
  for (const [key, value] of Object.entries(upload.formFields)) {
    body.append(key, value);
  }
  body.append(upload.fileField, new Blob([fileBytes], { type: contentType }), fileName);

  const uploadResponse = await fetch(upload.url, { method: upload.method, body });
  expect(uploadResponse.ok).toBe(true);

  await client.assets.complete(reservation.asset_id);
  return pollAssetReady(client, reservation.asset_id);
};

const sourceURLFileName = (sourceURL: string) => {
  const pathname = new URL(sourceURL).pathname;
  const fileName = decodeURIComponent(pathname.split('/').pop() ?? '');
  return fileName || `checkly-upload-${Date.now()}`;
};

export const pollAssetReady = async (
  client: Flora,
  assetID: string,
  { timeoutMs = 60_000, intervalMs = 2_000 } = {},
): Promise<AssetRetrieveResponse> => {
  const deadline = Date.now() + timeoutMs;
  let latest: AssetRetrieveResponse | undefined;

  while (Date.now() < deadline) {
    latest = await client.assets.retrieve(assetID);
    if (latest.status === 'ready') {
      expect(latest.url).toEqual(expect.any(String));
      return latest;
    }

    expect(latest.status).not.toBe('failed');
    await sleep(intervalMs);
  }

  throw new Error(`Timed out waiting for asset ${assetID} to become ready; latest status: ${latest?.status}`);
};

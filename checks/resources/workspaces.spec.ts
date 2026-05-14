import { expect, test } from '@playwright/test';
import { createLiveFloraClient, getWorkspace } from '../helpers/live-flora-api';

test.describe('workspaces resource @resource:workspaces', () => {
  test('lists workspaces from the live Flora API', async () => {
    const client = createLiveFloraClient();
    const response = await client.workspaces.list();

    expect(response.workspaces.length).toBeGreaterThan(0);
    expect(response.workspaces[0]?.workspace_id).toEqual(expect.any(String));
    expect(response.workspaces[0]?.name).toEqual(expect.any(String));
  });

  test('prints the selected live workspace', async () => {
    const client = createLiveFloraClient();
    const workspace = await getWorkspace(client);

    expect(workspace.workspace_id).toEqual(expect.any(String));
    expect(workspace.name).toEqual(expect.any(String));
  });
});

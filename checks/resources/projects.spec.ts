import { expect, test } from '@playwright/test';
import { createLiveFloraClient, getWorkspaceID } from '../helpers/live-flora-api';

test.describe('projects resource @resource:projects', () => {
  test('lists projects from the live Flora API', async () => {
    const client = createLiveFloraClient();
    const workspaceID = await getWorkspaceID(client);
    const page = await client.projects.list({ limit: 1, workspace_id: workspaceID });

    expect(Array.isArray(page.projects)).toBe(true);
    for (const project of page.projects) {
      expect(project.workspace_id).toBe(workspaceID);
    }
  });

  test('retrieves a project and lists nodes when the live workspace has one', async () => {
    const client = createLiveFloraClient();
    const workspaceID = await getWorkspaceID(client);
    const page = await client.projects.list({ limit: 1, workspace_id: workspaceID });
    const projectID = page.projects[0]?.project_id;

    test.skip(!projectID, 'No projects are available to retrieve for this API key');

    const project = await client.projects.retrieve(projectID!);
    expect(project.project_id).toBe(projectID);
    expect(project.workspace_id).toBe(workspaceID);

    const nodes = await client.projects.listNodes(projectID!, { limit: 1 });
    expect(Array.isArray(nodes.nodes)).toBe(true);
  });
});

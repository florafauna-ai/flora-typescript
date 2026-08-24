# Techniques

Types:

- <code><a href="./src/resources/techniques/techniques.ts">TechniqueRetrieveResponse</a></code>
- <code><a href="./src/resources/techniques/techniques.ts">TechniqueListResponse</a></code>

Methods:

- <code title="get /techniques/{techniqueId}">client.techniques.<a href="./src/resources/techniques/techniques.ts">retrieve</a>(techniqueID) -> TechniqueRetrieveResponse</code>
- <code title="get /techniques">client.techniques.<a href="./src/resources/techniques/techniques.ts">list</a>({ ...params }) -> TechniqueListResponsesTechniquesCursorPage</code>

## Runs

Types:

- <code><a href="./src/resources/techniques/runs.ts">RunCreateResponse</a></code>
- <code><a href="./src/resources/techniques/runs.ts">RunRetrieveResponse</a></code>
- <code><a href="./src/resources/techniques/runs.ts">RunListResponse</a></code>

Methods:

- <code title="post /techniques/{techniqueId}/runs">client.techniques.runs.<a href="./src/resources/techniques/runs.ts">create</a>(techniqueID, { ...params }) -> RunCreateResponse</code>
- <code title="get /techniques/{techniqueId}/runs/{runId}">client.techniques.runs.<a href="./src/resources/techniques/runs.ts">retrieve</a>(runID, { ...params }) -> RunRetrieveResponse</code>
- <code title="get /technique-runs">client.techniques.runs.<a href="./src/resources/techniques/runs.ts">list</a>({ ...params }) -> RunListResponsesTechniqueRunsCursorPage</code>

# Assets

Types:

- <code><a href="./src/resources/assets.ts">AssetCreateResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetRetrieveResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetListResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetCompleteResponse</a></code>
- <code><a href="./src/resources/assets.ts">AssetRetryResponse</a></code>

Methods:

- <code title="post /assets">client.assets.<a href="./src/resources/assets.ts">create</a>({ ...params }) -> AssetCreateResponse</code>
- <code title="get /assets/{assetId}">client.assets.<a href="./src/resources/assets.ts">retrieve</a>(assetID) -> AssetRetrieveResponse</code>
- <code title="get /assets">client.assets.<a href="./src/resources/assets.ts">list</a>({ ...params }) -> AssetListResponsesAssetsCursorPage</code>
- <code title="post /assets/{assetId}/complete">client.assets.<a href="./src/resources/assets.ts">complete</a>(assetID) -> AssetCompleteResponse</code>
- <code title="post /assets/{assetId}/retry">client.assets.<a href="./src/resources/assets.ts">retry</a>(assetID) -> AssetRetryResponse</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /workspaces">client.workspaces.<a href="./src/resources/workspaces/workspaces.ts">list</a>() -> WorkspaceListResponse</code>

## Projects

Types:

- <code><a href="./src/resources/workspaces/projects/projects.ts">ProjectCreateResponse</a></code>
- <code><a href="./src/resources/workspaces/projects/projects.ts">ProjectGraphResponse</a></code>
- <code><a href="./src/resources/workspaces/projects/projects.ts">ProjectRunNodesResponse</a></code>

Methods:

- <code title="post /workspaces/{workspaceId}/projects">client.workspaces.projects.<a href="./src/resources/workspaces/projects/projects.ts">create</a>(workspaceID, { ...params }) -> ProjectCreateResponse</code>
- <code title="get /workspaces/{workspaceId}/projects/{projectId}/graph">client.workspaces.projects.<a href="./src/resources/workspaces/projects/projects.ts">graph</a>(projectID, { ...params }) -> ProjectGraphResponse</code>
- <code title="post /workspaces/{workspaceId}/projects/{projectId}/nodes/run">client.workspaces.projects.<a href="./src/resources/workspaces/projects/projects.ts">runNodes</a>(projectID, { ...params }) -> ProjectRunNodesResponse</code>

### Canvas

Types:

- <code><a href="./src/resources/workspaces/projects/canvas.ts">CanvasApplyChangesetResponse</a></code>
- <code><a href="./src/resources/workspaces/projects/canvas.ts">CanvasReplaceDefinitionResponse</a></code>
- <code><a href="./src/resources/workspaces/projects/canvas.ts">CanvasRetrieveDefinitionResponse</a></code>

Methods:

- <code title="post /workspaces/{workspaceId}/projects/{projectId}/canvas/changeset">client.workspaces.projects.canvas.<a href="./src/resources/workspaces/projects/canvas.ts">applyChangeset</a>(projectID, { ...params }) -> CanvasApplyChangesetResponse</code>
- <code title="put /workspaces/{workspaceId}/projects/{projectId}/canvas/definition">client.workspaces.projects.canvas.<a href="./src/resources/workspaces/projects/canvas.ts">replaceDefinition</a>(projectID, { ...params }) -> CanvasReplaceDefinitionResponse</code>
- <code title="get /workspaces/{workspaceId}/projects/{projectId}/canvas/definition">client.workspaces.projects.canvas.<a href="./src/resources/workspaces/projects/canvas.ts">retrieveDefinition</a>(projectID, { ...params }) -> CanvasRetrieveDefinitionResponse</code>

## Folders

Types:

- <code><a href="./src/resources/workspaces/folders.ts">FolderCreateProjectResponse</a></code>

Methods:

- <code title="post /workspaces/{workspaceId}/folders/{folderId}/projects">client.workspaces.folders.<a href="./src/resources/workspaces/folders.ts">createProject</a>(folderID, { ...params }) -> FolderCreateProjectResponse</code>

## Library

### Folders

Types:

- <code><a href="./src/resources/workspaces/library/folders.ts">FolderCreateResponse</a></code>
- <code><a href="./src/resources/workspaces/library/folders.ts">FolderDeleteResponse</a></code>
- <code><a href="./src/resources/workspaces/library/folders.ts">FolderAddItemResponse</a></code>

Methods:

- <code title="post /workspaces/{workspaceId}/library/folders">client.workspaces.library.folders.<a href="./src/resources/workspaces/library/folders.ts">create</a>(workspaceID, { ...params }) -> FolderCreateResponse</code>
- <code title="delete /workspaces/{workspaceId}/library/folders/{folderId}">client.workspaces.library.folders.<a href="./src/resources/workspaces/library/folders.ts">delete</a>(folderID, { ...params }) -> FolderDeleteResponse</code>
- <code title="post /workspaces/{workspaceId}/library/folders/{folderId}/items">client.workspaces.library.folders.<a href="./src/resources/workspaces/library/folders.ts">addItem</a>(folderID, { ...params }) -> FolderAddItemResponse</code>

# Projects

Types:

- <code><a href="./src/resources/projects/projects.ts">ProjectCreateResponse</a></code>
- <code><a href="./src/resources/projects/projects.ts">ProjectRetrieveResponse</a></code>
- <code><a href="./src/resources/projects/projects.ts">ProjectListResponse</a></code>
- <code><a href="./src/resources/projects/projects.ts">ProjectListNodesResponse</a></code>

Methods:

- <code title="post /projects">client.projects.<a href="./src/resources/projects/projects.ts">create</a>({ ...params }) -> ProjectCreateResponse</code>
- <code title="get /projects/{projectId}">client.projects.<a href="./src/resources/projects/projects.ts">retrieve</a>(projectID) -> ProjectRetrieveResponse</code>
- <code title="get /projects">client.projects.<a href="./src/resources/projects/projects.ts">list</a>({ ...params }) -> ProjectListResponsesProjectsCursorPage</code>
- <code title="get /projects/{projectId}/nodes">client.projects.<a href="./src/resources/projects/projects.ts">listNodes</a>(projectID, { ...params }) -> ProjectListNodesResponsesCanvasNodesCursorPage</code>

## Assets

Types:

- <code><a href="./src/resources/projects/assets.ts">AssetAttachAssetResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/assets/{assetId}/attach">client.projects.assets.<a href="./src/resources/projects/assets.ts">attachAsset</a>(assetID, { ...params }) -> AssetAttachAssetResponse</code>

## Canvas

Types:

- <code><a href="./src/resources/projects/canvas.ts">CanvasRetrieveResponse</a></code>
- <code><a href="./src/resources/projects/canvas.ts">CanvasUpdateResponse</a></code>

Methods:

- <code title="get /projects/{projectId}/canvas">client.projects.canvas.<a href="./src/resources/projects/canvas.ts">retrieve</a>(projectID) -> CanvasRetrieveResponse</code>
- <code title="patch /projects/{projectId}/canvas">client.projects.canvas.<a href="./src/resources/projects/canvas.ts">update</a>(projectID, { ...params }) -> CanvasUpdateResponse</code>

## Actions

Types:

- <code><a href="./src/resources/projects/actions.ts">ActionCreateResponse</a></code>
- <code><a href="./src/resources/projects/actions.ts">ActionRunResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/actions">client.projects.actions.<a href="./src/resources/projects/actions.ts">create</a>(projectID, { ...params }) -> ActionCreateResponse</code>
- <code title="post /projects/{projectId}/actions/{nodeId}/run">client.projects.actions.<a href="./src/resources/projects/actions.ts">run</a>(nodeID, { ...params }) -> ActionRunResponse</code>

# Actions

Types:

- <code><a href="./src/resources/actions.ts">ActionRetrieveResponse</a></code>
- <code><a href="./src/resources/actions.ts">ActionListResponse</a></code>
- <code><a href="./src/resources/actions.ts">ActionRunResponse</a></code>

Methods:

- <code title="get /actions/{actionId}">client.actions.<a href="./src/resources/actions.ts">retrieve</a>(actionID) -> ActionRetrieveResponse</code>
- <code title="get /actions">client.actions.<a href="./src/resources/actions.ts">list</a>() -> ActionListResponse</code>
- <code title="post /runs/action">client.actions.<a href="./src/resources/actions.ts">run</a>({ ...params }) -> ActionRunResponse</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelListResponse</a></code>

Methods:

- <code title="get /models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> ModelListResponse</code>

# Generations

Types:

- <code><a href="./src/resources/generations.ts">GenerationCreateResponse</a></code>
- <code><a href="./src/resources/generations.ts">GenerationRetrieveResponse</a></code>
- <code><a href="./src/resources/generations.ts">GenerationListResponse</a></code>

Methods:

- <code title="post /generate">client.generations.<a href="./src/resources/generations.ts">create</a>({ ...params }) -> GenerationCreateResponse</code>
- <code title="get /runs/{runId}">client.generations.<a href="./src/resources/generations.ts">retrieve</a>(runID) -> GenerationRetrieveResponse</code>
- <code title="get /generations">client.generations.<a href="./src/resources/generations.ts">list</a>({ ...params }) -> GenerationListResponsesGenerationsCursorPage</code>

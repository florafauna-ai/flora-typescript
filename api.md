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

Methods:

- <code title="post /techniques/{techniqueId}/runs">client.techniques.runs.<a href="./src/resources/techniques/runs.ts">create</a>(techniqueID) -> RunCreateResponse</code>
- <code title="get /techniques/{techniqueId}/runs/{runId}">client.techniques.runs.<a href="./src/resources/techniques/runs.ts">retrieve</a>(runID, { ...params }) -> RunRetrieveResponse</code>

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

- <code><a href="./src/resources/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>() -> WorkspaceListResponse</code>

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

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelListResponse</a></code>

Methods:

- <code title="get /models">client.models.<a href="./src/resources/models.ts">list</a>({ ...params }) -> ModelListResponse</code>

# Runs

Types:

- <code><a href="./src/resources/runs.ts">RunStartGenerationResponse</a></code>
- <code><a href="./src/resources/runs.ts">RunStartTechniqueResponse</a></code>

Methods:

- <code title="post /runs/generation">client.runs.<a href="./src/resources/runs.ts">startGeneration</a>({ ...params }) -> RunStartGenerationResponse</code>
- <code title="post /runs/technique">client.runs.<a href="./src/resources/runs.ts">startTechnique</a>({ ...params }) -> RunStartTechniqueResponse</code>

# Feedback

Types:

- <code><a href="./src/resources/feedback.ts">FeedbackRecordResponse</a></code>

Methods:

- <code title="post /feedback">client.feedback.<a href="./src/resources/feedback.ts">record</a>({ ...params }) -> FeedbackRecordResponse</code>

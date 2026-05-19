// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/techniques/{techniqueId}',
    httpMethod: 'get',
    summary: 'Get a technique',
    description:
      'Returns the public definition for one technique, including its input and output schema used to start runs.',
    stainlessPath: '(resource) techniques > (method) retrieve',
    qualified: 'client.techniques.retrieve',
    params: ['techniqueId: string;'],
    response:
      "{ inputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; name: string; outputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; run_cost: number; technique_id: string; description?: string; }",
    markdown:
      "## retrieve\n\n`client.techniques.retrieve(techniqueId: string): { inputs: object[]; name: string; outputs: object[]; run_cost: number; technique_id: string; description?: string; }`\n\n**get** `/techniques/{techniqueId}`\n\nReturns the public definition for one technique, including its input and output schema used to start runs.\n\n### Parameters\n\n- `techniqueId: string`\n  Technique identifier or slug\n\n### Returns\n\n- `{ inputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; name: string; outputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; run_cost: number; technique_id: string; description?: string; }`\n\n  - `inputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]`\n  - `name: string`\n  - `outputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]`\n  - `run_cost: number`\n  - `technique_id: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst technique = await client.techniques.retrieve('art-directors-critique');\n\nconsole.log(technique);\n```",
    perLanguage: {
      typescript: {
        method: 'client.techniques.retrieve',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst technique = await client.techniques.retrieve('art-directors-critique');\n\nconsole.log(technique.technique_id);",
      },
      go: {
        method: 'client.Techniques.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttechnique, err := client.Techniques.Get(context.TODO(), "art-directors-critique")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", technique.TechniqueID)\n}\n',
      },
      cli: {
        method: 'techniques retrieve',
        example:
          "flora techniques retrieve \\\n  --api-key 'My API Key' \\\n  --technique-id art-directors-critique",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/techniques/$TECHNIQUE_ID \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/techniques',
    httpMethod: 'get',
    summary: 'List techniques',
    description:
      'Returns reusable FLORA techniques visible to the authenticated public API key. Use workspace_id, query, cursor, and limit to filter the catalog.',
    stainlessPath: '(resource) techniques > (method) list',
    qualified: 'client.techniques.list',
    params: ['cursor?: string;', 'limit?: number;', 'query?: string;', 'workspace_id?: string;'],
    response:
      "{ inputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; name: string; outputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; run_cost: number; technique_id: string; description?: string; }",
    markdown:
      "## list\n\n`client.techniques.list(cursor?: string, limit?: number, query?: string, workspace_id?: string): { inputs: object[]; name: string; outputs: object[]; run_cost: number; technique_id: string; description?: string; }`\n\n**get** `/techniques`\n\nReturns reusable FLORA techniques visible to the authenticated public API key. Use workspace_id, query, cursor, and limit to filter the catalog.\n\n### Parameters\n\n- `cursor?: string`\n  Opaque cursor for fetching the next page\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `query?: string`\n  Search query\n\n- `workspace_id?: string`\n  Workspace identifier\n\n### Returns\n\n- `{ inputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; name: string; outputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]; run_cost: number; technique_id: string; description?: string; }`\n\n  - `inputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]`\n  - `name: string`\n  - `outputs: { id: string; name: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; description?: string; specified_aspect_ratio?: string; specified_duration?: number; }[]`\n  - `run_cost: number`\n  - `technique_id: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\n// Automatically fetches more pages as needed.\nfor await (const techniqueListResponse of client.techniques.list()) {\n  console.log(techniqueListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.techniques.list',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const techniqueListResponse of client.techniques.list()) {\n  console.log(techniqueListResponse.technique_id);\n}",
      },
      go: {
        method: 'client.Techniques.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Techniques.List(context.TODO(), flora.TechniqueListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'techniques list',
        example: "flora techniques list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/techniques \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/techniques/{techniqueId}/runs',
    httpMethod: 'post',
    summary: 'Start a technique run',
    description:
      'Starts a run for a specific technique using the backward-compatible nested route. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) techniques.runs > (method) create',
    qualified: 'client.techniques.runs.create',
    params: [
      'techniqueId: string;',
      "inputs: { id: string; type: 'text' | 'imageUrl' | 'videoUrl'; value: string; }[];",
      "mode: 'async' | 'stream';",
      'callback_url?: string;',
      'idempotency_key?: string;',
    ],
    response:
      "{ created_at: number; progress: number; run_id: string; status: 'pending' | 'running' | 'completed' | 'failed'; charged_cost?: number; completed_at?: number; error_code?: string; error_message?: string; outputs?: { output_id: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; url: string; }[]; poll_url?: string; started_at?: number; }",
    markdown:
      "## create\n\n`client.techniques.runs.create(techniqueId: string, inputs: { id: string; type: 'text' | 'imageUrl' | 'videoUrl'; value: string; }[], mode: 'async' | 'stream', callback_url?: string, idempotency_key?: string): { created_at: number; progress: number; run_id: string; status: 'pending' | 'running' | 'completed' | 'failed'; charged_cost?: number; completed_at?: number; error_code?: string; error_message?: string; outputs?: object[]; poll_url?: string; started_at?: number; }`\n\n**post** `/techniques/{techniqueId}/runs`\n\nStarts a run for a specific technique using the backward-compatible nested route. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `techniqueId: string`\n  Technique identifier or slug\n\n- `inputs: { id: string; type: 'text' | 'imageUrl' | 'videoUrl'; value: string; }[]`\n  Technique inputs\n\n- `mode: 'async' | 'stream'`\n  Technique run execution mode\n\n- `callback_url?: string`\n  HTTPS callback URL for asynchronous run completion notifications\n\n- `idempotency_key?: string`\n  Idempotency key for safely retrying requests\n\n### Returns\n\n- `{ created_at: number; progress: number; run_id: string; status: 'pending' | 'running' | 'completed' | 'failed'; charged_cost?: number; completed_at?: number; error_code?: string; error_message?: string; outputs?: { output_id: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; url: string; }[]; poll_url?: string; started_at?: number; }`\n\n  - `created_at: number`\n  - `progress: number`\n  - `run_id: string`\n  - `status: 'pending' | 'running' | 'completed' | 'failed'`\n  - `charged_cost?: number`\n  - `completed_at?: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `outputs?: { output_id: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; url: string; }[]`\n  - `poll_url?: string`\n  - `started_at?: number`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst run = await client.techniques.runs.create('art-directors-critique', { inputs: [{\n  id: 'id',\n  type: 'text',\n  value: 'value',\n}], mode: 'async' });\n\nconsole.log(run);\n```",
    perLanguage: {
      typescript: {
        method: 'client.techniques.runs.create',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.techniques.runs.create('art-directors-critique', {\n  inputs: [\n    {\n      id: 'id',\n      type: 'text',\n      value: 'value',\n    },\n  ],\n  mode: 'async',\n});\n\nconsole.log(run.run_id);",
      },
      go: {
        method: 'client.Techniques.Runs.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\trun, err := client.Techniques.Runs.New(\n\t\tcontext.TODO(),\n\t\t"art-directors-critique",\n\t\tflora.TechniqueRunNewParams{\n\t\t\tInputs: []flora.TechniqueRunNewParamsInput{{\n\t\t\t\tID:    "id",\n\t\t\t\tType:  "text",\n\t\t\t\tValue: "value",\n\t\t\t}},\n\t\t\tMode: flora.TechniqueRunNewParamsModeAsync,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", run.RunID)\n}\n',
      },
      cli: {
        method: 'runs create',
        example:
          "flora techniques:runs create \\\n  --api-key 'My API Key' \\\n  --technique-id art-directors-critique \\\n  --input '{id: id, type: text, value: value}' \\\n  --mode async",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/techniques/$TECHNIQUE_ID/runs \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $FLORA_API_KEY" \\\n    -d \'{\n          "inputs": [\n            {\n              "id": "id",\n              "type": "text",\n              "value": "value"\n            }\n          ],\n          "mode": "async"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/techniques/{techniqueId}/runs/{runId}',
    httpMethod: 'get',
    summary: 'Get a technique run',
    description:
      'Returns status, progress, outputs, and error details for a technique run when it is accessible to the authenticated public API key.',
    stainlessPath: '(resource) techniques.runs > (method) retrieve',
    qualified: 'client.techniques.runs.retrieve',
    params: ['techniqueId: string;', 'runId: string;'],
    response:
      "{ created_at: number; progress: number; run_id: string; status: 'pending' | 'running' | 'completed' | 'failed'; charged_cost?: number; completed_at?: number; error_code?: string; error_message?: string; outputs?: { output_id: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; url: string; }[]; poll_url?: string; started_at?: number; }",
    markdown:
      "## retrieve\n\n`client.techniques.runs.retrieve(techniqueId: string, runId: string): { created_at: number; progress: number; run_id: string; status: 'pending' | 'running' | 'completed' | 'failed'; charged_cost?: number; completed_at?: number; error_code?: string; error_message?: string; outputs?: object[]; poll_url?: string; started_at?: number; }`\n\n**get** `/techniques/{techniqueId}/runs/{runId}`\n\nReturns status, progress, outputs, and error details for a technique run when it is accessible to the authenticated public API key.\n\n### Parameters\n\n- `techniqueId: string`\n  Technique identifier or slug\n\n- `runId: string`\n  Run identifier\n\n### Returns\n\n- `{ created_at: number; progress: number; run_id: string; status: 'pending' | 'running' | 'completed' | 'failed'; charged_cost?: number; completed_at?: number; error_code?: string; error_message?: string; outputs?: { output_id: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; url: string; }[]; poll_url?: string; started_at?: number; }`\n\n  - `created_at: number`\n  - `progress: number`\n  - `run_id: string`\n  - `status: 'pending' | 'running' | 'completed' | 'failed'`\n  - `charged_cost?: number`\n  - `completed_at?: number`\n  - `error_code?: string`\n  - `error_message?: string`\n  - `outputs?: { output_id: string; type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl'; url: string; }[]`\n  - `poll_url?: string`\n  - `started_at?: number`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst run = await client.techniques.runs.retrieve('run_abc123', { techniqueId: 'art-directors-critique' });\n\nconsole.log(run);\n```",
    perLanguage: {
      typescript: {
        method: 'client.techniques.runs.retrieve',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.techniques.runs.retrieve('run_abc123', {\n  techniqueId: 'art-directors-critique',\n});\n\nconsole.log(run.run_id);",
      },
      go: {
        method: 'client.Techniques.Runs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\trun, err := client.Techniques.Runs.Get(\n\t\tcontext.TODO(),\n\t\t"run_abc123",\n\t\tflora.TechniqueRunGetParams{\n\t\t\tTechniqueID: "art-directors-critique",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", run.RunID)\n}\n',
      },
      cli: {
        method: 'runs retrieve',
        example:
          "flora techniques:runs retrieve \\\n  --api-key 'My API Key' \\\n  --technique-id art-directors-critique \\\n  --run-id run_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/techniques/$TECHNIQUE_ID/runs/$RUN_ID \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/assets',
    httpMethod: 'post',
    summary: 'Create an asset upload',
    description:
      'Creates an asset from an allowlisted source URL or reserves a signed upload URL. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) assets > (method) create',
    qualified: 'client.assets.create',
    params: [
      'source: string;',
      'workspace_id: string;',
      'content_type?: string;',
      'file_name?: string;',
      'folder?: string;',
    ],
    response:
      "{ asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; uploaded_via: 'url' | 'signed_url'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }; upload_url?: string; }",
    markdown:
      "## create\n\n`client.assets.create(source: string, workspace_id: string, content_type?: string, file_name?: string, folder?: string): { asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; uploaded_via: 'url' | 'signed_url'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; upload?: object; upload_url?: string; }`\n\n**post** `/assets`\n\nCreates an asset from an allowlisted source URL or reserves a signed upload URL. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `source: string`\n  Asset source URL or signed-url upload mode\n\n- `workspace_id: string`\n  Workspace identifier\n\n- `content_type?: string`\n  Asset content type\n\n- `file_name?: string`\n  Asset file name\n\n- `folder?: string`\n  Destination folder\n\n### Returns\n\n- `{ asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; uploaded_via: 'url' | 'signed_url'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }; upload_url?: string; }`\n\n  - `asset_id: string`\n  - `status: 'pending_upload' | 'ready' | 'failed'`\n  - `uploaded_via: 'url' | 'signed_url'`\n  - `url: string`\n  - `visibility: 'workspace'`\n  - `workspace_id: string`\n  - `expires_at?: string`\n  - `upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst asset = await client.assets.create({ source: 'signed-url', workspace_id: 'ws_abc123' });\n\nconsole.log(asset);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.create',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst asset = await client.assets.create({ source: 'signed-url', workspace_id: 'ws_abc123' });\n\nconsole.log(asset.asset_id);",
      },
      go: {
        method: 'client.Assets.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tasset, err := client.Assets.New(context.TODO(), flora.AssetNewParams{\n\t\tSource:      "signed-url",\n\t\tWorkspaceID: "ws_abc123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", asset.AssetID)\n}\n',
      },
      cli: {
        method: 'assets create',
        example:
          "flora assets create \\\n  --api-key 'My API Key' \\\n  --source signed-url \\\n  --workspace-id ws_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/assets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $FLORA_API_KEY" \\\n    -d \'{\n          "source": "signed-url",\n          "workspace_id": "ws_abc123",\n          "content_type": "image/png",\n          "file_name": "hero.png",\n          "folder": "campaign-assets"\n        }\'',
      },
    },
  },
  {
    name: 'complete',
    endpoint: '/assets/{assetId}/complete',
    httpMethod: 'post',
    summary: 'Complete a signed asset upload',
    description:
      'Marks a signed asset upload as complete after the file has been uploaded. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) assets > (method) complete',
    qualified: 'client.assets.complete',
    params: ['assetId: string;'],
    response:
      "{ asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; failure_message?: string; upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }; upload_url?: string; }",
    markdown:
      "## complete\n\n`client.assets.complete(assetId: string): { asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; failure_message?: string; upload?: object; upload_url?: string; }`\n\n**post** `/assets/{assetId}/complete`\n\nMarks a signed asset upload as complete after the file has been uploaded. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `assetId: string`\n  Asset identifier\n\n### Returns\n\n- `{ asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; failure_message?: string; upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }; upload_url?: string; }`\n\n  - `asset_id: string`\n  - `status: 'pending_upload' | 'ready' | 'failed'`\n  - `url: string`\n  - `visibility: 'workspace'`\n  - `workspace_id: string`\n  - `expires_at?: string`\n  - `failure_message?: string`\n  - `upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst response = await client.assets.complete('asset_abc123');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.complete',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.complete('asset_abc123');\n\nconsole.log(response.asset_id);",
      },
      go: {
        method: 'client.Assets.Complete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Assets.Complete(context.TODO(), "asset_abc123")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AssetID)\n}\n',
      },
      cli: {
        method: 'assets complete',
        example: "flora assets complete \\\n  --api-key 'My API Key' \\\n  --asset-id asset_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/assets/$ASSET_ID/complete \\\n    -X POST \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'retry',
    endpoint: '/assets/{assetId}/retry',
    httpMethod: 'post',
    summary: 'Retry a signed asset upload',
    description:
      'Creates a fresh signed upload reservation for a failed or expired asset upload. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) assets > (method) retry',
    qualified: 'client.assets.retry',
    params: ['assetId: string;'],
    response:
      "{ asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; failure_message?: string; upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }; upload_url?: string; }",
    markdown:
      "## retry\n\n`client.assets.retry(assetId: string): { asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; failure_message?: string; upload?: object; upload_url?: string; }`\n\n**post** `/assets/{assetId}/retry`\n\nCreates a fresh signed upload reservation for a failed or expired asset upload. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `assetId: string`\n  Asset identifier\n\n### Returns\n\n- `{ asset_id: string; status: 'pending_upload' | 'ready' | 'failed'; url: string; visibility: 'workspace'; workspace_id: string; expires_at?: string; failure_message?: string; upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }; upload_url?: string; }`\n\n  - `asset_id: string`\n  - `status: 'pending_upload' | 'ready' | 'failed'`\n  - `url: string`\n  - `visibility: 'workspace'`\n  - `workspace_id: string`\n  - `expires_at?: string`\n  - `failure_message?: string`\n  - `upload?: { content_type: 'multipart/form-data'; file_field: 'file'; form_fields: object; method: 'POST'; url: string; }`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst response = await client.assets.retry('asset_abc123');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.retry',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.assets.retry('asset_abc123');\n\nconsole.log(response.asset_id);",
      },
      go: {
        method: 'client.Assets.Retry',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Assets.Retry(context.TODO(), "asset_abc123")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AssetID)\n}\n',
      },
      cli: {
        method: 'assets retry',
        example: "flora assets retry \\\n  --api-key 'My API Key' \\\n  --asset-id asset_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/assets/$ASSET_ID/retry \\\n    -X POST \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/assets',
    httpMethod: 'get',
    summary: 'List assets',
    description:
      'Returns assets visible to the authenticated public API key. Filter by workspace, project canvas, search query, cursor, and limit without exposing raw file bytes or internal graph data.',
    stainlessPath: '(resource) assets > (method) list',
    qualified: 'client.assets.list',
    params: [
      'cursor?: string;',
      'limit?: number;',
      'project_id?: string;',
      'query?: string;',
      'workspace_id?: string;',
    ],
    response:
      "{ asset_id: string; content_type: string; created_at: number; description: string; height: number; name: string; size_bytes: number; status: 'pending_upload' | 'ready' | 'failed'; upload_content_type: string; uploaded_via: string; url: string; width: number; workspace_id: string; node_id?: string; project_id?: string; }",
    markdown:
      "## list\n\n`client.assets.list(cursor?: string, limit?: number, project_id?: string, query?: string, workspace_id?: string): { asset_id: string; content_type: string; created_at: number; description: string; height: number; name: string; size_bytes: number; status: 'pending_upload' | 'ready' | 'failed'; upload_content_type: string; uploaded_via: string; url: string; width: number; workspace_id: string; node_id?: string; project_id?: string; }`\n\n**get** `/assets`\n\nReturns assets visible to the authenticated public API key. Filter by workspace, project canvas, search query, cursor, and limit without exposing raw file bytes or internal graph data.\n\n### Parameters\n\n- `cursor?: string`\n  Opaque cursor for fetching the next page\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `project_id?: string`\n  Project identifier\n\n- `query?: string`\n  Search query\n\n- `workspace_id?: string`\n  Workspace identifier\n\n### Returns\n\n- `{ asset_id: string; content_type: string; created_at: number; description: string; height: number; name: string; size_bytes: number; status: 'pending_upload' | 'ready' | 'failed'; upload_content_type: string; uploaded_via: string; url: string; width: number; workspace_id: string; node_id?: string; project_id?: string; }`\n\n  - `asset_id: string`\n  - `content_type: string`\n  - `created_at: number`\n  - `description: string`\n  - `height: number`\n  - `name: string`\n  - `size_bytes: number`\n  - `status: 'pending_upload' | 'ready' | 'failed'`\n  - `upload_content_type: string`\n  - `uploaded_via: string`\n  - `url: string`\n  - `width: number`\n  - `workspace_id: string`\n  - `node_id?: string`\n  - `project_id?: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\n// Automatically fetches more pages as needed.\nfor await (const assetListResponse of client.assets.list()) {\n  console.log(assetListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.list',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const assetListResponse of client.assets.list()) {\n  console.log(assetListResponse.asset_id);\n}",
      },
      go: {
        method: 'client.Assets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Assets.List(context.TODO(), flora.AssetListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'assets list',
        example: "flora assets list \\\n  --api-key 'My API Key'",
      },
      http: {
        example: 'curl https://app.flora.ai/api/v1/assets \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/assets/{assetId}',
    httpMethod: 'get',
    summary: 'Get an asset',
    description:
      'Returns metadata for one asset when it is accessible to the authenticated public API key. Missing and inaccessible assets both return 404.',
    stainlessPath: '(resource) assets > (method) retrieve',
    qualified: 'client.assets.retrieve',
    params: ['assetId: string;'],
    response:
      "{ asset_id: string; content_type: string; created_at: string; description: string; failure_message: string; height: number; name: string; size_bytes: number; status: 'pending_upload' | 'ready' | 'failed'; upload_content_type: string; uploaded_via: string; url: string; width: number; workspace_id: string; }",
    markdown:
      "## retrieve\n\n`client.assets.retrieve(assetId: string): { asset_id: string; content_type: string; created_at: string; description: string; failure_message: string; height: number; name: string; size_bytes: number; status: 'pending_upload' | 'ready' | 'failed'; upload_content_type: string; uploaded_via: string; url: string; width: number; workspace_id: string; }`\n\n**get** `/assets/{assetId}`\n\nReturns metadata for one asset when it is accessible to the authenticated public API key. Missing and inaccessible assets both return 404.\n\n### Parameters\n\n- `assetId: string`\n  Asset identifier\n\n### Returns\n\n- `{ asset_id: string; content_type: string; created_at: string; description: string; failure_message: string; height: number; name: string; size_bytes: number; status: 'pending_upload' | 'ready' | 'failed'; upload_content_type: string; uploaded_via: string; url: string; width: number; workspace_id: string; }`\n\n  - `asset_id: string`\n  - `content_type: string`\n  - `created_at: string`\n  - `description: string`\n  - `failure_message: string`\n  - `height: number`\n  - `name: string`\n  - `size_bytes: number`\n  - `status: 'pending_upload' | 'ready' | 'failed'`\n  - `upload_content_type: string`\n  - `uploaded_via: string`\n  - `url: string`\n  - `width: number`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst asset = await client.assets.retrieve('asset_abc123');\n\nconsole.log(asset);\n```",
    perLanguage: {
      typescript: {
        method: 'client.assets.retrieve',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst asset = await client.assets.retrieve('asset_abc123');\n\nconsole.log(asset.asset_id);",
      },
      go: {
        method: 'client.Assets.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tasset, err := client.Assets.Get(context.TODO(), "asset_abc123")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", asset.AssetID)\n}\n',
      },
      cli: {
        method: 'assets retrieve',
        example: "flora assets retrieve \\\n  --api-key 'My API Key' \\\n  --asset-id asset_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/assets/$ASSET_ID \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/workspaces',
    httpMethod: 'get',
    summary: 'List accessible workspaces',
    description:
      "Returns the workspaces available to the authenticated public API key, including each workspace's public ID, name, creation timestamp, and caller role.",
    stainlessPath: '(resource) workspaces > (method) list',
    qualified: 'client.workspaces.list',
    response: '{ workspaces: { created_at: number; name: string; role: string; workspace_id: string; }[]; }',
    markdown:
      "## list\n\n`client.workspaces.list(): { workspaces: object[]; }`\n\n**get** `/workspaces`\n\nReturns the workspaces available to the authenticated public API key, including each workspace's public ID, name, creation timestamp, and caller role.\n\n### Returns\n\n- `{ workspaces: { created_at: number; name: string; role: string; workspace_id: string; }[]; }`\n\n  - `workspaces: { created_at: number; name: string; role: string; workspace_id: string; }[]`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst workspaces = await client.workspaces.list();\n\nconsole.log(workspaces);\n```",
    perLanguage: {
      typescript: {
        method: 'client.workspaces.list',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaces = await client.workspaces.list();\n\nconsole.log(workspaces.workspaces);",
      },
      go: {
        method: 'client.Workspaces.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkspaces, err := client.Workspaces.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workspaces.Workspaces)\n}\n',
      },
      cli: {
        method: 'workspaces list',
        example: "flora workspaces list \\\n  --api-key 'My API Key'",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/workspaces \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/projects',
    httpMethod: 'get',
    summary: 'List workspace projects',
    description:
      'Returns projects in the requested workspace that are accessible to the authenticated public API key, ordered by recent activity.',
    stainlessPath: '(resource) projects > (method) list',
    qualified: 'client.projects.list',
    params: ['workspace_id: string;', 'cursor?: string;', 'limit?: number;', 'query?: string;'],
    response:
      '{ created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }',
    markdown:
      "## list\n\n`client.projects.list(workspace_id: string, cursor?: string, limit?: number, query?: string): { created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }`\n\n**get** `/projects`\n\nReturns projects in the requested workspace that are accessible to the authenticated public API key, ordered by recent activity.\n\n### Parameters\n\n- `workspace_id: string`\n  Workspace identifier\n\n- `cursor?: string`\n  Opaque cursor for fetching the next page\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `query?: string`\n  Search query\n\n### Returns\n\n- `{ created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }`\n\n  - `created_at: number`\n  - `last_modified: number`\n  - `name: string`\n  - `origin: string`\n  - `project_id: string`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\n// Automatically fetches more pages as needed.\nfor await (const projectListResponse of client.projects.list({ workspace_id: 'ws_abc123' })) {\n  console.log(projectListResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.projects.list',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const projectListResponse of client.projects.list({ workspace_id: 'ws_abc123' })) {\n  console.log(projectListResponse.project_id);\n}",
      },
      go: {
        method: 'client.Projects.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Projects.List(context.TODO(), flora.ProjectListParams{\n\t\tWorkspaceID: "ws_abc123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'projects list',
        example: "flora projects list \\\n  --api-key 'My API Key' \\\n  --workspace-id ws_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/projects \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/projects',
    httpMethod: 'post',
    summary: 'Create a project',
    description:
      'Creates a new FLORA project in the requested workspace. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) projects > (method) create',
    qualified: 'client.projects.create',
    params: ['name: string;', 'workspace_id: string;'],
    response:
      '{ created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }',
    markdown:
      "## create\n\n`client.projects.create(name: string, workspace_id: string): { created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }`\n\n**post** `/projects`\n\nCreates a new FLORA project in the requested workspace. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `name: string`\n  Project name\n\n- `workspace_id: string`\n  Workspace identifier\n\n### Returns\n\n- `{ created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }`\n\n  - `created_at: number`\n  - `last_modified: number`\n  - `name: string`\n  - `origin: string`\n  - `project_id: string`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst project = await client.projects.create({ name: 'Spring Campaign', workspace_id: 'ws_abc123' });\n\nconsole.log(project);\n```",
    perLanguage: {
      typescript: {
        method: 'client.projects.create',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst project = await client.projects.create({\n  name: 'Spring Campaign',\n  workspace_id: 'ws_abc123',\n});\n\nconsole.log(project.project_id);",
      },
      go: {
        method: 'client.Projects.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tproject, err := client.Projects.New(context.TODO(), flora.ProjectNewParams{\n\t\tName:        "Spring Campaign",\n\t\tWorkspaceID: "ws_abc123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", project.ProjectID)\n}\n',
      },
      cli: {
        method: 'projects create',
        example:
          "flora projects create \\\n  --api-key 'My API Key' \\\n  --name 'Spring Campaign' \\\n  --workspace-id ws_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/projects \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $FLORA_API_KEY" \\\n    -d \'{\n          "name": "Spring Campaign",\n          "workspace_id": "ws_abc123"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/projects/{projectId}',
    httpMethod: 'get',
    summary: 'Get a project',
    description:
      'Returns metadata for a single project when it is accessible to the authenticated public API key. Missing and inaccessible projects both return 404.',
    stainlessPath: '(resource) projects > (method) retrieve',
    qualified: 'client.projects.retrieve',
    params: ['projectId: string;'],
    response:
      '{ created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }',
    markdown:
      "## retrieve\n\n`client.projects.retrieve(projectId: string): { created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }`\n\n**get** `/projects/{projectId}`\n\nReturns metadata for a single project when it is accessible to the authenticated public API key. Missing and inaccessible projects both return 404.\n\n### Parameters\n\n- `projectId: string`\n  Project identifier\n\n### Returns\n\n- `{ created_at: number; last_modified: number; name: string; origin: string; project_id: string; workspace_id: string; }`\n\n  - `created_at: number`\n  - `last_modified: number`\n  - `name: string`\n  - `origin: string`\n  - `project_id: string`\n  - `workspace_id: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst project = await client.projects.retrieve('prj_abc123');\n\nconsole.log(project);\n```",
    perLanguage: {
      typescript: {
        method: 'client.projects.retrieve',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst project = await client.projects.retrieve('prj_abc123');\n\nconsole.log(project.project_id);",
      },
      go: {
        method: 'client.Projects.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tproject, err := client.Projects.Get(context.TODO(), "prj_abc123")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", project.ProjectID)\n}\n',
      },
      cli: {
        method: 'projects retrieve',
        example: "flora projects retrieve \\\n  --api-key 'My API Key' \\\n  --project-id prj_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/projects/$PROJECT_ID \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'list_nodes',
    endpoint: '/projects/{projectId}/nodes',
    httpMethod: 'get',
    summary: 'List project canvas nodes',
    description:
      'Returns sanitized visible media nodes on a project canvas. The response omits raw graph documents, Liveblocks internals, raw Convex IDs, and unbounded node data blobs.',
    stainlessPath: '(resource) projects > (method) list_nodes',
    qualified: 'client.projects.listNodes',
    params: ['projectId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ node_id: string; type: 'image' | 'video' | 'audio' | 'text'; asset_id?: string; height?: number; label?: string; url?: string; width?: number; }",
    markdown:
      "## list_nodes\n\n`client.projects.listNodes(projectId: string, cursor?: string, limit?: number): { node_id: string; type: 'image' | 'video' | 'audio' | 'text'; asset_id?: string; height?: number; label?: string; url?: string; width?: number; }`\n\n**get** `/projects/{projectId}/nodes`\n\nReturns sanitized visible media nodes on a project canvas. The response omits raw graph documents, Liveblocks internals, raw Convex IDs, and unbounded node data blobs.\n\n### Parameters\n\n- `projectId: string`\n  Project identifier\n\n- `cursor?: string`\n  Opaque cursor for fetching the next page\n\n- `limit?: number`\n  Maximum number of results to return\n\n### Returns\n\n- `{ node_id: string; type: 'image' | 'video' | 'audio' | 'text'; asset_id?: string; height?: number; label?: string; url?: string; width?: number; }`\n\n  - `node_id: string`\n  - `type: 'image' | 'video' | 'audio' | 'text'`\n  - `asset_id?: string`\n  - `height?: number`\n  - `label?: string`\n  - `url?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\n// Automatically fetches more pages as needed.\nfor await (const projectListNodesResponse of client.projects.listNodes('prj_abc123')) {\n  console.log(projectListNodesResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.projects.listNodes',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const projectListNodesResponse of client.projects.listNodes('prj_abc123')) {\n  console.log(projectListNodesResponse.node_id);\n}",
      },
      go: {
        method: 'client.Projects.ListNodes',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Projects.ListNodes(\n\t\tcontext.TODO(),\n\t\t"prj_abc123",\n\t\tflora.ProjectListNodesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      cli: {
        method: 'projects list_nodes',
        example: "flora projects list-nodes \\\n  --api-key 'My API Key' \\\n  --project-id prj_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/projects/$PROJECT_ID/nodes \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'attach_asset',
    endpoint: '/projects/{projectId}/assets/{assetId}/attach',
    httpMethod: 'post',
    summary: 'Attach an asset to a canvas',
    description:
      'Attaches an existing ready asset to a project canvas as a static media node. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) projects.assets > (method) attach_asset',
    qualified: 'client.projects.assets.attachAsset',
    params: ['projectId: string;', 'assetId: string;'],
    response: '{ asset_id: string; canvas_url: string; node_id: string; project_id: string; }',
    markdown:
      "## attach_asset\n\n`client.projects.assets.attachAsset(projectId: string, assetId: string): { asset_id: string; canvas_url: string; node_id: string; project_id: string; }`\n\n**post** `/projects/{projectId}/assets/{assetId}/attach`\n\nAttaches an existing ready asset to a project canvas as a static media node. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `projectId: string`\n  Project identifier\n\n- `assetId: string`\n  Asset identifier\n\n### Returns\n\n- `{ asset_id: string; canvas_url: string; node_id: string; project_id: string; }`\n\n  - `asset_id: string`\n  - `canvas_url: string`\n  - `node_id: string`\n  - `project_id: string`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst response = await client.projects.assets.attachAsset('asset_abc123', { projectId: 'prj_abc123' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.projects.assets.attachAsset',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.projects.assets.attachAsset('asset_abc123', {\n  projectId: 'prj_abc123',\n});\n\nconsole.log(response.asset_id);",
      },
      go: {
        method: 'client.Projects.Assets.AttachAsset',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Projects.Assets.AttachAsset(\n\t\tcontext.TODO(),\n\t\t"asset_abc123",\n\t\tflora.ProjectAssetAttachAssetParams{\n\t\t\tProjectID: "prj_abc123",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.AssetID)\n}\n',
      },
      cli: {
        method: 'assets attach_asset',
        example:
          "flora projects:assets attach-asset \\\n  --api-key 'My API Key' \\\n  --project-id prj_abc123 \\\n  --asset-id asset_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/projects/$PROJECT_ID/assets/$ASSET_ID/attach \\\n    -X POST \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/models',
    httpMethod: 'get',
    summary: 'List available models',
    description:
      'Returns the public model catalog visible to API clients. Use the optional type filter to narrow results to image, video, audio, or text models.',
    stainlessPath: '(resource) models > (method) list',
    qualified: 'client.models.list',
    params: ["type?: 'image' | 'video' | 'audio' | 'text';"],
    response:
      "{ models: { capabilities: string[]; estimated_credits: number; estimated_seconds: number; model_id: string; name: string; params: { name: string; required: boolean; type: 'string' | 'string[]' | 'bool' | 'int' | 'int?' | 'seed' | 'float' | 'dict'; default?: object; description?: string; label?: string; max?: number; min?: number; options?: object[]; properties?: object; }[]; provider: string; type: 'image' | 'video' | 'audio' | 'text'; beta?: boolean; }[]; }",
    markdown:
      "## list\n\n`client.models.list(type?: 'image' | 'video' | 'audio' | 'text'): { models: object[]; }`\n\n**get** `/models`\n\nReturns the public model catalog visible to API clients. Use the optional type filter to narrow results to image, video, audio, or text models.\n\n### Parameters\n\n- `type?: 'image' | 'video' | 'audio' | 'text'`\n  Model type\n\n### Returns\n\n- `{ models: { capabilities: string[]; estimated_credits: number; estimated_seconds: number; model_id: string; name: string; params: { name: string; required: boolean; type: 'string' | 'string[]' | 'bool' | 'int' | 'int?' | 'seed' | 'float' | 'dict'; default?: object; description?: string; label?: string; max?: number; min?: number; options?: object[]; properties?: object; }[]; provider: string; type: 'image' | 'video' | 'audio' | 'text'; beta?: boolean; }[]; }`\n\n  - `models: { capabilities: string[]; estimated_credits: number; estimated_seconds: number; model_id: string; name: string; params: { name: string; required: boolean; type: 'string' | 'string[]' | 'bool' | 'int' | 'int?' | 'seed' | 'float' | 'dict'; default?: object; description?: string; label?: string; max?: number; min?: number; options?: { label: string; value: string; description?: string; }[]; properties?: object; }[]; provider: string; type: 'image' | 'video' | 'audio' | 'text'; beta?: boolean; }[]`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst models = await client.models.list();\n\nconsole.log(models);\n```",
    perLanguage: {
      typescript: {
        method: 'client.models.list',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst models = await client.models.list();\n\nconsole.log(models.models);",
      },
      go: {
        method: 'client.Models.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmodels, err := client.Models.List(context.TODO(), flora.ModelListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", models.Models)\n}\n',
      },
      cli: {
        method: 'models list',
        example: "flora models list \\\n  --api-key 'My API Key'",
      },
      http: {
        example: 'curl https://app.flora.ai/api/v1/models \\\n    -H "Authorization: Bearer $FLORA_API_KEY"',
      },
    },
  },
  {
    name: 'start_generation',
    endpoint: '/runs/generation',
    httpMethod: 'post',
    summary: 'Start a generation run',
    description:
      'Starts a model generation run in a project canvas using a prompt, workspace, project, optional model, and optional model parameters. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) runs > (method) start_generation',
    qualified: 'client.runs.startGeneration',
    params: [
      'project_id: string;',
      'prompt: string;',
      "type: 'image' | 'video' | 'audio' | 'text';",
      'workspace_id: string;',
      'model?: string;',
      'params?: object;',
    ],
    response:
      "{ charged_cost: number; estimated_seconds: number; run_id: string; type: 'generation' | 'technique' | 'action'; action?: { action_id: string; }; model?: { model_id: string; }; poll_url?: string; project_id?: string; technique?: { name: string; technique_id: string; }; }",
    markdown:
      "## start_generation\n\n`client.runs.startGeneration(project_id: string, prompt: string, type: 'image' | 'video' | 'audio' | 'text', workspace_id: string, model?: string, params?: object): { charged_cost: number; estimated_seconds: number; run_id: string; type: 'generation' | 'technique' | 'action'; action?: object; model?: object; poll_url?: string; project_id?: string; technique?: object; }`\n\n**post** `/runs/generation`\n\nStarts a model generation run in a project canvas using a prompt, workspace, project, optional model, and optional model parameters. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `project_id: string`\n  Project identifier\n\n- `prompt: string`\n  Generation prompt\n\n- `type: 'image' | 'video' | 'audio' | 'text'`\n  Generation type\n\n- `workspace_id: string`\n  Workspace identifier\n\n- `model?: string`\n  Model endpoint ID\n\n- `params?: object`\n  Model parameters\n\n### Returns\n\n- `{ charged_cost: number; estimated_seconds: number; run_id: string; type: 'generation' | 'technique' | 'action'; action?: { action_id: string; }; model?: { model_id: string; }; poll_url?: string; project_id?: string; technique?: { name: string; technique_id: string; }; }`\n\n  - `charged_cost: number`\n  - `estimated_seconds: number`\n  - `run_id: string`\n  - `type: 'generation' | 'technique' | 'action'`\n  - `action?: { action_id: string; }`\n  - `model?: { model_id: string; }`\n  - `poll_url?: string`\n  - `project_id?: string`\n  - `technique?: { name: string; technique_id: string; }`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst response = await client.runs.startGeneration({\n  project_id: 'prj_abc123',\n  prompt: 'A cinematic product photo of a ceramic mug on a sunlit table',\n  type: 'image',\n  workspace_id: 'ws_abc123',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.runs.startGeneration',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.runs.startGeneration({\n  project_id: 'prj_abc123',\n  prompt: 'A cinematic product photo of a ceramic mug on a sunlit table',\n  type: 'image',\n  workspace_id: 'ws_abc123',\n});\n\nconsole.log(response.run_id);",
      },
      go: {
        method: 'client.Runs.StartGeneration',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Runs.StartGeneration(context.TODO(), flora.RunStartGenerationParams{\n\t\tProjectID:   "prj_abc123",\n\t\tPrompt:      "A cinematic product photo of a ceramic mug on a sunlit table",\n\t\tType:        flora.RunStartGenerationParamsTypeImage,\n\t\tWorkspaceID: "ws_abc123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.RunID)\n}\n',
      },
      cli: {
        method: 'runs start_generation',
        example:
          "flora runs start-generation \\\n  --api-key 'My API Key' \\\n  --project-id prj_abc123 \\\n  --prompt 'A cinematic product photo of a ceramic mug on a sunlit table' \\\n  --type image \\\n  --workspace-id ws_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/runs/generation \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $FLORA_API_KEY" \\\n    -d \'{\n          "project_id": "prj_abc123",\n          "prompt": "A cinematic product photo of a ceramic mug on a sunlit table",\n          "type": "image",\n          "workspace_id": "ws_abc123",\n          "model": "t2i-flux-2-pro"\n        }\'',
      },
    },
  },
  {
    name: 'start_technique',
    endpoint: '/runs/technique',
    httpMethod: 'post',
    summary: 'Start a top-level technique run',
    description:
      'Starts a technique run through the normalized top-level run resource. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) runs > (method) start_technique',
    qualified: 'client.runs.startTechnique',
    params: ['inputs: object;', 'technique_id: string;', 'workspace_id: string;'],
    response:
      "{ charged_cost: number; estimated_seconds: number; run_id: string; type: 'generation' | 'technique' | 'action'; action?: { action_id: string; }; model?: { model_id: string; }; poll_url?: string; project_id?: string; technique?: { name: string; technique_id: string; }; }",
    markdown:
      "## start_technique\n\n`client.runs.startTechnique(inputs: object, technique_id: string, workspace_id: string): { charged_cost: number; estimated_seconds: number; run_id: string; type: 'generation' | 'technique' | 'action'; action?: object; model?: object; poll_url?: string; project_id?: string; technique?: object; }`\n\n**post** `/runs/technique`\n\nStarts a technique run through the normalized top-level run resource. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `inputs: object`\n  Technique inputs\n\n- `technique_id: string`\n  Technique identifier\n\n- `workspace_id: string`\n  Workspace identifier\n\n### Returns\n\n- `{ charged_cost: number; estimated_seconds: number; run_id: string; type: 'generation' | 'technique' | 'action'; action?: { action_id: string; }; model?: { model_id: string; }; poll_url?: string; project_id?: string; technique?: { name: string; technique_id: string; }; }`\n\n  - `charged_cost: number`\n  - `estimated_seconds: number`\n  - `run_id: string`\n  - `type: 'generation' | 'technique' | 'action'`\n  - `action?: { action_id: string; }`\n  - `model?: { model_id: string; }`\n  - `poll_url?: string`\n  - `project_id?: string`\n  - `technique?: { name: string; technique_id: string; }`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst response = await client.runs.startTechnique({\n  inputs: { foo: 'bar' },\n  technique_id: 'tech_abcd1234',\n  workspace_id: 'ws_abc123',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.runs.startTechnique',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.runs.startTechnique({\n  inputs: { foo: 'bar' },\n  technique_id: 'tech_abcd1234',\n  workspace_id: 'ws_abc123',\n});\n\nconsole.log(response.run_id);",
      },
      go: {
        method: 'client.Runs.StartTechnique',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Runs.StartTechnique(context.TODO(), flora.RunStartTechniqueParams{\n\t\tInputs: map[string]any{\n\t\t\t"foo": "bar",\n\t\t},\n\t\tTechniqueID: "tech_abcd1234",\n\t\tWorkspaceID: "ws_abc123",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.RunID)\n}\n',
      },
      cli: {
        method: 'runs start_technique',
        example:
          "flora runs start-technique \\\n  --api-key 'My API Key' \\\n  --inputs '{foo: bar}' \\\n  --technique-id tech_abcd1234 \\\n  --workspace-id ws_abc123",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/runs/technique \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $FLORA_API_KEY" \\\n    -d \'{\n          "inputs": {\n            "foo": "bar"\n          },\n          "technique_id": "tech_abcd1234",\n          "workspace_id": "ws_abc123"\n        }\'',
      },
    },
  },
  {
    name: 'record',
    endpoint: '/feedback',
    httpMethod: 'post',
    summary: 'Record product feedback',
    description:
      'Records product feedback from the authenticated user, optionally linked to a workspace, project, run, and attempted tools. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.',
    stainlessPath: '(resource) feedback > (method) record',
    qualified: 'client.feedback.record',
    params: [
      'detail: string;',
      "kind: 'feature_request' | 'bug' | 'technique_request' | 'missing_capability';",
      'summary: string;',
      'attempted_tools?: string[];',
      'project_id?: string;',
      'run_id?: string;',
      'workspace_id?: string;',
    ],
    response: '{ feedback_id: string; received_at: number; }',
    markdown:
      "## record\n\n`client.feedback.record(detail: string, kind: 'feature_request' | 'bug' | 'technique_request' | 'missing_capability', summary: string, attempted_tools?: string[], project_id?: string, run_id?: string, workspace_id?: string): { feedback_id: string; received_at: number; }`\n\n**post** `/feedback`\n\nRecords product feedback from the authenticated user, optionally linked to a workspace, project, run, and attempted tools. Mutating public API requests support an optional Idempotency-Key header for client retries; duplicate keys within two hours return idempotency_duplicate.\n\n### Parameters\n\n- `detail: string`\n  Detailed description\n\n- `kind: 'feature_request' | 'bug' | 'technique_request' | 'missing_capability'`\n  Feedback kind\n\n- `summary: string`\n  Short summary\n\n- `attempted_tools?: string[]`\n  Tools or capabilities attempted before submitting feedback\n\n- `project_id?: string`\n  Project identifier\n\n- `run_id?: string`\n  Run identifier\n\n- `workspace_id?: string`\n  Workspace identifier\n\n### Returns\n\n- `{ feedback_id: string; received_at: number; }`\n\n  - `feedback_id: string`\n  - `received_at: number`\n\n### Example\n\n```typescript\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA();\n\nconst response = await client.feedback.record({\n  detail: 'I want to export all generated campaign images at once.',\n  kind: 'feature_request',\n  summary: 'Need batch export support',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.feedback.record',
        example:
          "import FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.feedback.record({\n  detail: 'I want to export all generated campaign images at once.',\n  kind: 'feature_request',\n  summary: 'Need batch export support',\n});\n\nconsole.log(response.feedback_id);",
      },
      http: {
        example:
          'curl https://app.flora.ai/api/v1/feedback \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $FLORA_API_KEY" \\\n    -d \'{\n          "detail": "I want to export all generated campaign images at once.",\n          "kind": "feature_request",\n          "summary": "Need batch export support",\n          "project_id": "prj_abc123",\n          "run_id": "run_abc123",\n          "workspace_id": "ws_abc123"\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# FLORA CLI\n\nThe official CLI for the FLORA REST API.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/florafauna-ai/flora-cli/cmd/flora@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nflora [resource] <command> [flags...]\n~~~\n\n~~~sh\nflora workspaces list \\\n  --api-key 'My API Key'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Required | Default value |\n| -------------------- | -------- | ------------- |\n| `FLORA_API_KEY`      | no       | `null`        |\n\n### Global flags\n\n- `--api-key` (can also be set with `FLORA_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nflora <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nflora <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nflora <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nflora <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nflora <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the FLORA Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/flora-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../flora-go`.\n",
  },
  {
    language: 'go',
    content:
      '# FLORA Go API Library\n\n<a href="https://pkg.go.dev/github.com/florafauna-ai/flora-go"><img src="https://pkg.go.dev/badge/github.com/florafauna-ai/flora-go.svg" alt="Go Reference"></a>\n\nThe FLORA Go library provides convenient access to the FLORA REST API\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the FLORA MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=flora-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImZsb3JhLW1jcCJdLCJlbnYiOnsiRkxPUkFfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22flora-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22flora-mcp%22%5D%2C%22env%22%3A%7B%22FLORA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/florafauna-ai/flora-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/florafauna-ai/flora-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/florafauna-ai/flora-go"\n\t"github.com/florafauna-ai/flora-go/option"\n)\n\nfunc main() {\n\tclient := flora.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("FLORA_API_KEY")\n\t)\n\tworkspaces, err := client.Workspaces.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workspaces.Workspaces)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Workspaces.List(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/florafauna-ai/flora-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Techniques.ListAutoPaging(context.TODO(), flora.TechniqueListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\ttechniqueListResponse := iter.Current()\n\tfmt.Printf("%+v\\n", techniqueListResponse)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Techniques.List(context.TODO(), flora.TechniqueListParams{})\nfor page != nil {\n\tfor _, technique := range page.Techniques {\n\t\tfmt.Printf("%+v\\n", technique)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Workspaces.List(context.TODO())\nif err != nil {\n\tvar apierr *flora.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/workspaces": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Workspaces.List(\n\tctx,\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := flora.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Workspaces.List(context.TODO(), option.WithMaxRetries(5))\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nworkspaces, err := client.Workspaces.List(context.TODO(), option.WithResponseInto(&response))\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", workspaces)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/florafauna-ai/flora-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# FLORA TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@flora-ai/flora.svg?label=npm%20(stable))](https://npmjs.org/package/@flora-ai/flora) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@flora-ai/flora)\n\nThis library provides convenient access to the FLORA REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the FLORA MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=flora-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImZsb3JhLW1jcCJdLCJlbnYiOnsiRkxPUkFfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22flora-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22flora-mcp%22%5D%2C%22env%22%3A%7B%22FLORA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @flora-ai/flora\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaces = await client.workspaces.list();\n\nconsole.log(workspaces.workspaces);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  apiKey: process.env['FLORA_API_KEY'], // This is the default and can be omitted\n});\n\nconst workspaces: FLORA.WorkspaceListResponse = await client.workspaces.list();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst workspaces = await client.workspaces.list().catch(async (err) => {\n  if (err instanceof FLORA.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new FLORA({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.workspaces.list({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new FLORA({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.workspaces.list({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the FLORA API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllTechniqueListResponses(params) {\n  const allTechniqueListResponses = [];\n  // Automatically fetches more pages as needed.\n  for await (const techniqueListResponse of client.techniques.list()) {\n    allTechniqueListResponses.push(techniqueListResponse);\n  }\n  return allTechniqueListResponses;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.techniques.list();\nfor (const techniqueListResponse of page.techniques) {\n  console.log(techniqueListResponse);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new FLORA();\n\nconst response = await client.workspaces.list().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: workspaces, response: raw } = await client.workspaces.list().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(workspaces.workspaces);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `FLORA_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport FLORA from '@flora-ai/flora';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new FLORA({\n  logger: logger.child({ name: 'FLORA' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.workspaces.list({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport FLORA from '@flora-ai/flora';\nimport fetch from 'my-fetch';\n\nconst client = new FLORA({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport FLORA from '@flora-ai/flora';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new FLORA({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport FLORA from '@flora-ai/flora';\n\nconst client = new FLORA({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport FLORA from 'npm:@flora-ai/flora';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new FLORA({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/florafauna-ai/flora-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}

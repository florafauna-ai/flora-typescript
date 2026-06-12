// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.techniques.retrieve',
    fullyQualifiedName: 'techniques.retrieve',
    httpMethod: 'get',
    httpPath: '/techniques/{techniqueId}',
  },
  {
    clientCallName: 'client.techniques.list',
    fullyQualifiedName: 'techniques.list',
    httpMethod: 'get',
    httpPath: '/techniques',
  },
  {
    clientCallName: 'client.techniques.runs.create',
    fullyQualifiedName: 'techniques.runs.create',
    httpMethod: 'post',
    httpPath: '/techniques/{techniqueId}/runs',
  },
  {
    clientCallName: 'client.techniques.runs.list',
    fullyQualifiedName: 'techniques.runs.list',
    httpMethod: 'get',
    httpPath: '/technique-runs',
  },
  {
    clientCallName: 'client.techniques.runs.retrieve',
    fullyQualifiedName: 'techniques.runs.retrieve',
    httpMethod: 'get',
    httpPath: '/techniques/{techniqueId}/runs/{runId}',
  },
  {
    clientCallName: 'client.assets.create',
    fullyQualifiedName: 'assets.create',
    httpMethod: 'post',
    httpPath: '/assets',
  },
  {
    clientCallName: 'client.assets.complete',
    fullyQualifiedName: 'assets.complete',
    httpMethod: 'post',
    httpPath: '/assets/{assetId}/complete',
  },
  {
    clientCallName: 'client.assets.retry',
    fullyQualifiedName: 'assets.retry',
    httpMethod: 'post',
    httpPath: '/assets/{assetId}/retry',
  },
  {
    clientCallName: 'client.assets.list',
    fullyQualifiedName: 'assets.list',
    httpMethod: 'get',
    httpPath: '/assets',
  },
  {
    clientCallName: 'client.assets.retrieve',
    fullyQualifiedName: 'assets.retrieve',
    httpMethod: 'get',
    httpPath: '/assets/{assetId}',
  },
  {
    clientCallName: 'client.workspaces.list',
    fullyQualifiedName: 'workspaces.list',
    httpMethod: 'get',
    httpPath: '/workspaces',
  },
  {
    clientCallName: 'client.projects.list',
    fullyQualifiedName: 'projects.list',
    httpMethod: 'get',
    httpPath: '/projects',
  },
  {
    clientCallName: 'client.projects.create',
    fullyQualifiedName: 'projects.create',
    httpMethod: 'post',
    httpPath: '/projects',
  },
  {
    clientCallName: 'client.projects.retrieve',
    fullyQualifiedName: 'projects.retrieve',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}',
  },
  {
    clientCallName: 'client.projects.listNodes',
    fullyQualifiedName: 'projects.listNodes',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}/nodes',
  },
  {
    clientCallName: 'client.projects.assets.attachAsset',
    fullyQualifiedName: 'projects.assets.attachAsset',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/assets/{assetId}/attach',
  },
  {
    clientCallName: 'client.projects.canvas.retrieve',
    fullyQualifiedName: 'projects.canvas.retrieve',
    httpMethod: 'get',
    httpPath: '/projects/{projectId}/canvas',
  },
  {
    clientCallName: 'client.projects.canvas.update',
    fullyQualifiedName: 'projects.canvas.update',
    httpMethod: 'patch',
    httpPath: '/projects/{projectId}/canvas',
  },
  {
    clientCallName: 'client.projects.actions.create',
    fullyQualifiedName: 'projects.actions.create',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/actions',
  },
  {
    clientCallName: 'client.projects.actions.run',
    fullyQualifiedName: 'projects.actions.run',
    httpMethod: 'post',
    httpPath: '/projects/{projectId}/actions/{nodeId}/run',
  },
  {
    clientCallName: 'client.models.list',
    fullyQualifiedName: 'models.list',
    httpMethod: 'get',
    httpPath: '/models',
  },
  {
    clientCallName: 'client.runs.startGeneration',
    fullyQualifiedName: 'runs.startGeneration',
    httpMethod: 'post',
    httpPath: '/runs/generation',
  },
  {
    clientCallName: 'client.runs.startTechnique',
    fullyQualifiedName: 'runs.startTechnique',
    httpMethod: 'post',
    httpPath: '/runs/technique',
  },
  {
    clientCallName: 'client.generations.create',
    fullyQualifiedName: 'generations.create',
    httpMethod: 'post',
    httpPath: '/generate',
  },
  {
    clientCallName: 'client.generations.retrieve',
    fullyQualifiedName: 'generations.retrieve',
    httpMethod: 'get',
    httpPath: '/runs/{runId}',
  },
  {
    clientCallName: 'client.generations.list',
    fullyQualifiedName: 'generations.list',
    httpMethod: 'get',
    httpPath: '/generations',
  },
  {
    clientCallName: 'client.feedback.record',
    fullyQualifiedName: 'feedback.record',
    httpMethod: 'post',
    httpPath: '/feedback',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}

// Generated from the FLORA OpenAPI document. Do not edit.

/** Who may call an operation and which derived surfaces carry it. */
export type SurfaceAccess = {
  audience: "public" | "staff"
  release: "ga" | "preview"
  /** PostHog flag the caller must have; the API evaluates it for the caller's own identity. */
  flag?: string
  surfaces: { sdk: boolean; docs: boolean; mcp: boolean }
}

export const OPERATIONS = {
  addLibraryFolderItem: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  applyCanvasChangeset: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  arrangeCanvasNodes: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  attachCanvasAsset: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  completeAssetUpload: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  completeAssetUploads: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createActionRun: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createCanvasAction: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createCommentThread: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createGenerationRun: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createLibraryFolder: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createOrganizationUsageExport: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: false,
    },
  },
  createProject: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createProjectAgentSession: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createTechnique: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: false,
      mcp: false,
    },
  },
  createWorkspaceFolderProject: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createWorkspaceProject: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  createWorkspaceSkill: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  deleteComment: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  deleteLibraryFolder: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getAction: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getAsset: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getCanvasAction: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getCanvasDeckLayer: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getCanvasDeckSlide: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getCanvasNodeDocument: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getCommentThread: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getLora: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getOrCreateWorkspaceFolder: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getOrganizationUsage: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getOrganizationUsageExport: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: false,
    },
  },
  getProject: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getProjectCanvasDefinition: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getProjectGraph: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getProjectSharing: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getRun: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getTechnique: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getTechniqueGraph: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: false,
      mcp: false,
    },
  },
  getTechniqueRun: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getUserSkill: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getWorkspaceSkill: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  getWorkspaceUsage: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listActions: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listAssets: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listCanvasNodes: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listCommentThreads: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listGatewayModels: {
    audience: "staff",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: false,
      mcp: true,
    },
  },
  listGenerations: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listLoraTrainers: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listModels: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listProjects: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listTechniqueRuns: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listTechniques: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listUserSkills: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listWorkspaceFolders: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listWorkspaceMembers: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listWorkspaces: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  listWorkspaceSkills: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  recordFeedback: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  reopenCommentThread: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  replaceProjectCanvasDefinition: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  replyToCommentThread: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  reserveAssetUploads: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  resolveAssets: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  resolveCommentThread: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  retryAssetUpload: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  runCanvasAction: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  runCanvasNodes: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  shareProject: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  startGatewayGeneration: {
    audience: "staff",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: false,
      mcp: true,
    },
  },
  startGeneration: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  startTechniqueRun: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  trainLora: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  updateCanvasAction: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  updateProject: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  updateProjectSharing: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
  uploadAsset: {
    audience: "public",
    release: "ga",
    surfaces: {
      sdk: true,
      docs: true,
      mcp: true,
    },
  },
} as const satisfies Record<string, SurfaceAccess>

export type OperationId = keyof typeof OPERATIONS

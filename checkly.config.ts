import { defineConfig } from 'checkly';
import { Frequency } from 'checkly/constructs';
import { floraTypescriptAPIGroup } from './checks/flora-typescript-api.group.check';

const resourceSuites = ['assets', 'feedback', 'models', 'projects', 'runs', 'techniques', 'workspaces'];

export default defineConfig({
  projectName: 'Flora TypeScript API',
  logicalId: 'flora-typescript-sdk',
  repoUrl: 'https://github.com/florafauna-ai/flora-typescript',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2025.04',
    frequency: Frequency.EVERY_15M,
    locations: ['us-east-1'],
    tags: ['flora-typescript', 'sdk', 'resource-smoke'],
    playwrightConfigPath: './playwright.config.ts',
    include: ['checks/**', 'src/**', 'tsconfig.json'],
    playwrightChecks: resourceSuites.map((resource) => ({
      logicalId: `flora-typescript-${resource}-resource-suite`,
      name: `Flora TypeScript API: ${resource} resource suite`,
      pwTags: [`@resource:${resource}`],
      testCommand: 'pnpm exec playwright test',
      installCommand: 'pnpm install --frozen-lockfile',
      group: floraTypescriptAPIGroup,
      locations: ['us-east-1'],
      frequency: Frequency.EVERY_15M,
    })),
  },
  cli: {
    runLocation: 'us-east-1',
  },
});

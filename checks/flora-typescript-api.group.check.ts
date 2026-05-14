import { CheckGroupV2 } from 'checkly/constructs';

export const floraTypescriptAPIGroup = new CheckGroupV2('flora-typescript-api-resource-suites', {
  name: 'Flora TypeScript API',
  activated: true,
  muted: false,
  locations: ['us-east-1'],
  tags: ['flora-typescript', 'sdk', 'resource-smoke'],
  runParallel: true,
});

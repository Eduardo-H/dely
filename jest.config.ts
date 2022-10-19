import type { Config } from '@jest/types';

export default {
  bail: true,
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
} as Config.InitialOptions;
module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/?(*.)+(spec|test).[t]s'],
  testPathIgnorePatterns: ['/node_modules/', 'dist'], //
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/../../tsconfig.test.json'
    }
  },
  globalSetup: './jest.global-setup.js', // will be called once before all tests are executed
  globalTeardown: './jest.global-teardown.js', // will be called once after all tests are executed
};

import config from "./jest.config";
config.globalSetup = "<rootDir>/global-setup.ts"
config.globalTeardown = "<rootDir>/global-setup.ts"
config.testMatch = ["<rootDir>/__tests__/**/*.test.ts"];
export default config;

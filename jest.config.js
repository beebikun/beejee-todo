module.exports = {
  "testEnvironment": "jsdom",
  "verbose": true,
  "collectCoverage": true,

  "collectCoverageFrom": [
    "src/**/*.{js|jsx}",
    "!src/*.js",
  ],

  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  testMatch: [
    'src/**/*.test.js|e2e/*.test.js'
  ],

  testURL: 'http://localhost/'
};

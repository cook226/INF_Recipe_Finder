// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
      '^firebase/(.*)$': '<rootDir>/src/__mocks__/firebase.js',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  };
  
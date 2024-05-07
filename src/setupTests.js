// src/setupTests.js
import '@testing-library/jest-dom'; // Provides custom Jest matchers for DOM elements
import util from 'util';

// Polyfill TextEncoder/TextDecoder for testing environment
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// Optional: If using Firebase mocks or other specific setup, add them here

// Mock Firestore data structure (example)
// You can add your own mocks for other Firebase features as needed
jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'mockUser',
      email: 'test@example.com',
    },
  },
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(() => ({
          data: jest.fn(() => ({
            id: 123,
            title: 'Mock Recipe',
            image: 'mockImage.jpg',
          })),
        })),
      })),
    })),
  },
}));

// Mock axios requests
jest.mock('axios');

// Any other global mocks or setup you want to apply for your tests can be added here

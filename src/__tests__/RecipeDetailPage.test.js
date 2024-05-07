// src/__tests__/RecipeDetailPage.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetailPage from '../components/RecipeDetailPage';

jest.mock('axios');
jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'mockUser',
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

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RecipeDetailPage Component', () => {
  test('renders RecipeDetailPage correctly', () => {
    renderWithRouter(<RecipeDetailPage />);
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });
});

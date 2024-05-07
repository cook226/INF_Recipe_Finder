// src/__tests__/ProfilePage.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from '../components/ProfilePage';

jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'mockUser',
    },
  },
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => ({
          data: jest.fn(() => ({
            favorites: [],
          })),
        })),
      })),
    })),
  },
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProfilePage Component', () => {
  test('renders profile correctly', () => {
    renderWithRouter(<ProfilePage />);
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
  });
});

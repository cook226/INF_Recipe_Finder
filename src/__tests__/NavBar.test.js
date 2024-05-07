// src/__tests__/NavBar.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from '../components/NavBar';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'mockUser',
    },
  },
  db: jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('NavBar Component', () => {
  test('renders NavBar correctly', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText('Recipe Finder')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('signs out user when Logout button is clicked', async () => {
    renderWithRouter(<NavBar />);
    userEvent.click(screen.getByText('Logout'));
    expect(screen.getByText('Recipe Finder')).toBeInTheDocument();
  });
});

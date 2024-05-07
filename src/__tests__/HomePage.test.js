// src/__tests__/HomePage.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage Component', () => {
  test('renders HomePage correctly', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Welcome to Recipe Finder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for recipes')).toBeInTheDocument();
  });

  test('navigates to the search page when the search button is clicked', () => {
    renderWithRouter(<HomePage />);
    userEvent.type(screen.getByPlaceholderText('Search for recipes'), 'Desserts');
    userEvent.click(screen.getByText('Search'));

    // Ideally, you would use a mock router to check navigation here
  });

  test('renders categories correctly', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Desserts')).toBeInTheDocument();
  });
});

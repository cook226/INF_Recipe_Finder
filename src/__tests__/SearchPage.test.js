// src/__tests__/SearchPage.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import axios from 'axios';

jest.mock('axios');

const mockRecipes = [
  {
    id: 1,
    title: 'Chocolate Cake',
    image: 'https://example.com/chocolate-cake.jpg'
  },
  {
    id: 2,
    title: 'Pasta',
    image: 'https://example.com/pasta.jpg'
  }
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SearchPage Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { results: mockRecipes } });
  });

  test('renders search bar and search button', () => {
    renderWithRouter(<SearchPage />);
    expect(screen.getByPlaceholderText('Enter ingredients or category')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('displays recipes based on search query', async () => {
    renderWithRouter(<SearchPage />);
    userEvent.type(screen.getByPlaceholderText('Enter ingredients or category'), 'Desserts');
    userEvent.click(screen.getByText('Search'));

    expect(await screen.findByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  test('handles empty search results', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    renderWithRouter(<SearchPage />);
    userEvent.type(screen.getByPlaceholderText('Enter ingredients or category'), 'Non-Existent Food');
    userEvent.click(screen.getByText('Search'));

    expect(await screen.findByText('No results found.')).toBeInTheDocument();
  });
});

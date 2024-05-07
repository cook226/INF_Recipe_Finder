// src/__tests__/Login.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'test-user-id',
    },
  },
  db: jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {
  test('renders Login form correctly', () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('calls signInWithEmailAndPassword on form submission', async () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: { email: 'test@example.com' } });

    renderWithRouter(<Login />);
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Login'));

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
  });

  test('displays error message on authentication failure', async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'));

    renderWithRouter(<Login />);
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    userEvent.click(screen.getByText('Login'));

    expect(await screen.findByText('Error: Invalid credentials')).toBeInTheDocument();
  });
});

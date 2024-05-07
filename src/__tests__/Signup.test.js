// src/__tests__/Signup.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn()
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Signup Component', () => {
  test('renders Signup form correctly', () => {
    renderWithRouter(<Signup />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('calls createUserWithEmailAndPassword on form submission', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: { email: 'test@example.com' } });

    renderWithRouter(<Signup />);
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'password');
    userEvent.click(screen.getByText('Sign Up'));

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
  });

  test('displays error message if passwords do not match', async () => {
    renderWithRouter(<Signup />);
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'differentpassword');
    userEvent.click(screen.getByText('Sign Up'));

    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
  });

  test('displays error message on authentication failure', async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error('Email already in use'));

    renderWithRouter(<Signup />);
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'password');
    userEvent.click(screen.getByText('Sign Up'));

    expect(await screen.findByText('Error: Email already in use')).toBeInTheDocument();
  });
});

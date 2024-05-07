// src/__tests__/Logout.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Logout from '../components/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

jest.mock('firebase/auth', () => ({
  signOut: jest.fn()
}));

describe('Logout Component', () => {
  test('renders Logout button correctly', () => {
    render(<Logout />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls signOut when the Logout button is clicked', async () => {
    signOut.mockResolvedValueOnce();

    render(<Logout />);
    userEvent.click(screen.getByText('Logout'));

    expect(signOut).toHaveBeenCalledWith(auth);
  });
});

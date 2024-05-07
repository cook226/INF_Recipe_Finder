// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import Logout from './Logout';

const NavBar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-md">
      <h1 className="text-2xl font-bold text-blue-500">Recipe Finder</h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
        {user ? (
          <>
            <Link to="/profile" className="text-blue-500 hover:text-blue-700">Profile</Link>
            <Link to="/search" className="text-blue-500 hover:text-blue-700">Search</Link>
            <Logout />
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

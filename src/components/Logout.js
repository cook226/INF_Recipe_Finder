// src/components/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err.message);
    }
  };

  return <button className="text-blue-500 hover:text-blue-700" onClick={handleLogout}>Logout</button>;
};

export default Logout;

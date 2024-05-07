// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const errorMessages = {
  'auth/email-already-in-use': 'This email is already in use. Please use another one or login.',
  'auth/invalid-email': 'Invalid email format. Please check your email.',
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(password);
    return password.length >= 7 && hasUpperCase && hasNumberOrSpecial;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setShowModal(true);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 7 characters long, contain at least one uppercase letter, and one number or special character.'
      );
      setShowModal(true);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (err) {
      const message = errorMessages[err.code] || 'An unexpected error occurred. Please try again.';
      setError(message);
      setShowModal(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full py-2 px-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="relative mb-4">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {passwordVisible ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        <div className="relative mb-4">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {confirmPasswordVisible ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      {showModal && (
        <AlertModal
          title="Sign-Up Error"
          message={error}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Signup;

// src/components/Layout.js
import React from 'react';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-100">
    {children}
    <footer className="mt-auto bg-gray-900 text-white text-center p-4">
      <p>&copy; 2024 Recipe Finder. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="/" className="hover:underline">Privacy Policy</a>
        <a href="/" className="hover:underline">Terms of Service</a>
      </div>
    </footer>
  </div>
);

export default Layout;

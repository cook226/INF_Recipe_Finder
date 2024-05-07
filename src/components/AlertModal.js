// src/components/AlertModal.js
import React from 'react';

const AlertModal = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-sm shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;

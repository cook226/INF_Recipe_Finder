// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const searchByCategory = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to Recipe Finder</h1>
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => navigate('/search')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Search Recipes
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          View Profile
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          'Vegetarian',
          'Quick & Easy',
          'Desserts',
          'Beverages',
          'Appetizers',
          'Main Courses',
        ].map((category) => (
          <div
            key={category}
            className="bg-white p-4 border border-gray-300 rounded-md shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => searchByCategory(category)}
          >
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SPOONACULAR_API_KEY = '227cf6531f45458d89bfcd85753201c0'; // Your updated API key

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query,
            number: 6, // Adjust the number as per your requirements
            apiKey: SPOONACULAR_API_KEY,
          },
        }
      );
      setRecipes(response.data.results);
      setIngredients(query);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Error fetching recipes, please try again later.');
    }
  };

  const handleViewRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRecipes(ingredients);
    }
  };

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      searchRecipes(category);
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto my-10">
      <header className="text-center mb-6">
        <div className="flex justify-center items-center gap-4 border border-gray-300 rounded-md p-4 shadow-md">
          <input
            type="text"
            placeholder="Enter ingredients or category"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 py-2 px-4 rounded-md focus:outline-none"
          />
          <button
            onClick={() => searchRecipes(ingredients)}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </header>
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Search results for "{ingredients}"</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.length ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-4 border border-gray-300 rounded-md shadow-md">
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
                alt={recipe.title}
                className="w-full mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-sm mb-4">{recipe.summary ? `${recipe.summary.substring(0, 50)}...` : ''}</p>
              <button
                onClick={() => handleViewRecipe(recipe.id)}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">{error || 'No results found.'}</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

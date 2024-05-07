// src/components/RecipeDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { auth, db } from '../firebaseConfig';

const SPOONACULAR_API_KEY = '227cf6531f45458d89bfcd85753201c0';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRecipe = async () => {
    setIsLoading(true);

    try {
      // Fetch Recipe Details
      const recipeResponse = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
          },
        }
      );
      setRecipe(recipeResponse.data);

      // Fetch Nutrition Information
      const nutritionResponse = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
          },
        }
      );
      setNutrition(nutritionResponse.data);

      if (user) {
        checkIfFavorite();
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error.response?.data || error.message);
      setError('Error fetching recipe details, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    const favoriteRef = doc(db, `users/${user.uid}/favorites`, id);
    const docSnap = await getDoc(favoriteRef);
    setIsFavorite(docSnap.exists());
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert('You must be logged in to save favorites.');
      return;
    }

    const favoriteRef = doc(db, `users/${user.uid}/favorites`, id);

    if (isFavorite) {
      // Remove from favorites
      try {
        await deleteDoc(favoriteRef);
        alert(`${recipe.title} has been removed from your favorites.`);
        setIsFavorite(false);
      } catch (err) {
        console.error('Error removing from favorites:', err.message);
        alert('Error removing from favorites, please try again later.');
      }
    } else {
      // Add to favorites
      const favoriteData = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      };

      try {
        await setDoc(favoriteRef, favoriteData);
        alert(`${recipe.title} has been added to your favorites!`);
        setIsFavorite(true);
      } catch (err) {
        console.error('Error adding to favorites:', err.message);
        alert('Error adding to favorites, please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const formatInstructions = (instructions) => {
    if (!instructions || !Array.isArray(instructions) || instructions.length === 0) {
      return 'Instructions not available.';
    }

    return instructions[0].steps.map((step) => step.step);
  };

  const displayInfo = (label, value) => {
    if (value !== undefined && value !== -1 && value !== 'Not available') {
      return (
        <p className="flex-1 mb-2 md:mb-0 bg-gray-100 py-2 px-4 rounded-md text-center mx-2">
          <strong>{label}:</strong> {value}
        </p>
      );
    }
    return null;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const {
    servings = 'Not available',
    readyInMinutes = 'Not available',
    preparationMinutes,
    cookingMinutes,
    extendedIngredients = [],
    analyzedInstructions = [],
  } = recipe;

  const instructionList = formatInstructions(analyzedInstructions);

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full mb-6 rounded-md shadow-lg"
      />
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        {displayInfo('Servings', servings)}
        {displayInfo('Ready in Minutes', readyInMinutes)}
        {displayInfo('Preparation Time', preparationMinutes !== -1 ? preparationMinutes : 'Not available')}
        {displayInfo('Cooking Time', cookingMinutes !== -1 ? cookingMinutes : 'Not available')}
      </div>
      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg mb-6">
        {extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
      <ol className="list-decimal list-inside bg-gray-100 p-4 rounded-lg mb-6 leading-relaxed">
        {Array.isArray(instructionList) && instructionList.length > 0
          ? instructionList.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))
          : <li>Instructions not available.</li>}
      </ol>
      {nutrition && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Nutritional Information</h3>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
            <li><strong>Calories:</strong> {nutrition.calories}</li>
            <li><strong>Carbs:</strong> {nutrition.carbs}</li>
            <li><strong>Fat:</strong> {nutrition.fat}</li>
            <li><strong>Protein:</strong> {nutrition.protein}</li>
          </ul>
        </div>
      )}
      <button
        onClick={handleToggleFavorite}
        className={`w-full py-2 rounded-md text-white ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default RecipeDetailPage;

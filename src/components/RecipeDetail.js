// src/components/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: "YOUR_SPOONACULAR_API_KEY"
            }
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="main-container recipe-detail">
      {recipe ? (
        <>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <h3>Ingredients:</h3>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetail;

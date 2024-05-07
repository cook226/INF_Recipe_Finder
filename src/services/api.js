// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: "YOUR_SPOONACULAR_API_KEY"
  }
});

export const findByIngredients = (ingredients) => {
  return api.get('/recipes/findByIngredients', {
    params: { ingredients }
  });
};

export const getRecipeInformation = (id) => {
  return api.get(`/recipes/${id}/information`);
};

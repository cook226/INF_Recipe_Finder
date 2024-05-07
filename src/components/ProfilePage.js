// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  doc,
  deleteDoc
} from 'firebase/firestore';

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (user) {
      const favCollection = collection(db, 'users', user.uid, 'favorites');
      const favSnapshot = await getDocs(favCollection);
      const favList = favSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavorites(favList);
    }
  };

  const removeFavorite = async (recipeId) => {
    await deleteDoc(doc(db, 'users', user.uid, 'favorites', recipeId));
    fetchFavorites(); // Refresh favorites list
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <p className="text-center">You need to be logged in to view your profile.</p>
        <button
          onClick={() => navigate('/login')}
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex items-center justify-between mb-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.displayName || user.email}</h1>
            <p className="text-sm text-gray-600">Logged in as {user.email}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="text-center">
            <span className="block text-2xl font-bold">{favorites.length}</span>
            <span className="text-gray-600">Favorites</span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Your Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.length ? (
          favorites.map((recipe) => (
            <div key={recipe.id} className="bg-white p-4 border border-gray-300 rounded-md shadow-md">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <button
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => removeFavorite(recipe.id)}
                className="w-full mt-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

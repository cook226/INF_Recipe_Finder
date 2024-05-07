// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import ProfilePage from './components/ProfilePage';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => (
  <Router>
    <Layout>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;

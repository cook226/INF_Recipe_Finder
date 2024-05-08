Recipe Finder is a web application for finding, saving, and managing your favorite recipes. Built with React, Firebase, and the Spoonacular API, this project allows you to search for recipes, view their details, and save them to your profile.


## Features
- Search recipes based on ingredients or category
- View recipe details, including instructions and nutritional information
- Save and manage favorite recipes
- User authentication with login and signup
- Rate recipes and see average ratings

## Technologies Used
- **React**: A JavaScript library for building user interfaces
- **Firebase**: Authentication and Firestore Database
- **Spoonacular API**: Recipe and nutrition data
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework

## Project Structure
The project structure is as follows:

recipe-finder/
  ├── public/                     # Static files
  │   ├── index.html              # HTML entry point
  │   └── ...
  ├── src/                        # Source files
  │   ├── __tests__/              # Test files
  │   ├── components/             # Component files
  │   │   ├── HomePage.js
  │   │   ├── NavBar.js
  │   │   ├── RecipeDetailPage.js
  │   │   ├── ProfilePage.js
  │   │   └── ...
  │   ├── firebaseConfig.js       # Firebase configuration
  │   ├── App.js                  # Main application file
  │   ├── index.js                # Entry point of the React application
  │   └── ...
  ├── README.md                   # Documentation
  ├── package.json                # Project dependencies and scripts
  └── ...

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed:

- **Node.js:** `>= 14.x`
- **npm:** `>= 6.x`

### Installation and Setup

1. Clone the Repository:
   git clone https://github.com/cook226/INF_Recipe_Finder.git
   cd recipe-finder

2. Install Dependencies:
   npm install

3. Firebase Configuration:
   Create a `firebaseConfig.js` file in the `src/` directory with your Firebase credentials:

   // src/firebaseConfig.js
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app);

   export { auth, db };

4. Spoonacular API Configuration:
   Update the Spoonacular API key in the `src/components/RecipeDetailPage.js` file:

   const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY';

### Usage
1. Start the Development Server:
   npm start

2. Search Recipes:
   Use the search bar on the home page to find recipes based on ingredients or category.

3. View Details:
   Click on a recipe to see detailed information, including instructions and nutritional facts.

4. Save to Favorites:
   Add recipes to your favorites by clicking on the "Favorite" button.

### Testing

To run the tests, use the following command:

npm test

### Deployment

To deploy the project:

1. Build the Production Version:
   npm run build

2. Deploy to a Web Server:
   Upload the `build/` directory to your web server or deploy to a static site hosting service like Netlify, Vercel, or GitHub Pages.

### Contributions

We welcome contributions to the Recipe Finder project. Please follow these guidelines:

1. Fork the repository and create your branch: `git checkout -b my-feature`
2. Commit your changes: `git commit -am 'Add my feature'`
3. Push to the branch: `git push origin my-feature`
4. Create a pull request



### Contact

For any questions or suggestions, please reach out:

- Email: cook226@gmail.com
- GitHub Issues: [Recipe Finder Issues](https://github.com/cook226/INF_Recipe_Finder/issues)

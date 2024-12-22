import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Context';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
  // Retrieve the authentication token from the AuthContext
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* Route for Signup: Redirects to Home if the user is already authenticated */}
      <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />}
      />

      {/* Route for Signin: Redirects to Home if the user is already authenticated */}
      <Route
        path="/signin"
        element={token ? <Navigate to="/" /> : <Signin />}
      />

      {/* Route for Home: Redirects to Signin if the user is not authenticated */}
      <Route
        path="/"
        element={token ? <Home /> : <Navigate to="/signin" />}
      />

      {/* Catch-all route for undefined paths, displays a 404 error */}
      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
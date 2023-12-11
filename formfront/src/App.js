import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from "./pages/UserProfile";
import './App.css';


function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<UserProfile />} />
          </Routes>
      </div>
  );
}

export default App;
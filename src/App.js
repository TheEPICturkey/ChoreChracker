import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Context Providers
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/navigation/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/navigation/Home';
import KidProfile from './components/navigation/KidProfile';
import ParentProfile from './components/navigation/ParentProfile'; 
import ParentHome from './components/navigation/ParentHome';
import AddChore from './components/navigation/AddChore';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <h2>Chore Chracker</h2> */}
        <Navbar />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/kid-profile" element={<KidProfile />} />
          <Route path="/kid-profile/:id" element={<KidProfile />} />
          <Route path="/home/parent" element={<ParentProfile />} />
          <Route path="/parentHome" element={<ParentHome />} />
          <Route path="/add-chore" element={<AddChore />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


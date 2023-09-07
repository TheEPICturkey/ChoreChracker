import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/navigation/Home';

const App = () => {
    console.log("app is rendering");
    return (
        <Router>
            <h1>Chore Chracker</h1>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;



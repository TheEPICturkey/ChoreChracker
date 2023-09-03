import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const App = () => {
    console.log("app is rendering");
    return (
        <Router>
            <h1>Hello World</h1>
            <Navbar />
            <Routes>
                <Route path="/" element={<div>Home or dashboard component</div>} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;



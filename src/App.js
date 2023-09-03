import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import SelectAccount from './path_to_SelectAccount_Component'; // Adjust the import path
import Login from './path_to_Login_Component'; // Adjust the import path

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/select-account">
                    <SelectAccount />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                {/* Add other routes as necessary */}
            </Switch>
        </Router>
    );
}

export default App;
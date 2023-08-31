import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                {}
            </Switch>
        </Router>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import ChoresList from './ChoresList';
import AddChore from './AddChore';
import axios from 'axios';

function App() {
    const [chores, setChores] = useState([]);

    const fetchChores = () => {
        axios.get('http://localhost:5000/chores')
            .then(response => {
                setChores(response.data);
            })
            .catch(error => {
                console.error("Error fetching chores:", error);
            });
    };

    useEffect(() => {
        fetchChores();
    }, []);

    return (
        <div className="App">
            <h1>ChoreTracker</h1>
            <ChoresList chores={chores} />
            <AddChore onChoreAdded={fetchChores} />
        </div>
    );
}

export default App;
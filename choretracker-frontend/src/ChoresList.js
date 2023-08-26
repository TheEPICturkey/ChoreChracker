import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChoresList() {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/chores')
            .then(response => {
                setChores(response.data);
            })
            .catch(error => {
                console.error("Error fetching chores:", error);
            });
    }, []);

    return (
        <div>
            <h2>Chores List</h2>
            <ul>
                {chores.map(chore => (
                    <li key={chore.id}>{chore.title} - {chore.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default ChoresList;
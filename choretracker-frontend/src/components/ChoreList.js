import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChoreList() {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        fetchChores();
    }, []);

    const fetchChores = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chores');
            setChores(response.data);
        } catch (error) {
            console.error("Error fetching chores:", error);
        }
    };

    return (
        <div>
            <h2>Chores</h2>
            <ul>
                {chores.map(chore => (
                    <li key={chore._id}>
                        {chore.title}: {chore.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChoreList;
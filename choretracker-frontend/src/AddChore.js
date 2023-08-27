import React, { useState } from 'react';
import axios from 'axios';

function AddChore({ onChoreAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const chore = {
            title,
            description,
            assignedTo: 1, 
            createdBy: 2
        };

        console.log('Sending chore data:', chore);

        axios.post('http://localhost:5000/assignChore', chore)
            .then(() => {
                alert('Chore added successfully!');
                setTitle('');
                setDescription('');
                onChoreAdded();  
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    console.error('Error response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            });
    };

    return (
        <div>
            <h2>Add New Chore</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Chore</button>
            </form>
        </div>
    );
}

export default AddChore;

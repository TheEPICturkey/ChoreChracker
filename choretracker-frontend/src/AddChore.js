import React, { useState } from 'react';
import axios from 'axios';

function AddChore() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const chore = {
            title,
            description,
            assignedTo: "DefaultUser",  
            createdBy: "DefaultAdmin"  
        };

        axios.post('http://localhost:5001/assignChore', chore)
            .then(() => {
                alert('Chore added successfully!');
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error("Error adding chore:", error);
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
                <button type="submit" onClick={() => console.log('Button clicked')}>Add Chore</button>
            </form>
        </div>
    );
}

export default AddChore;
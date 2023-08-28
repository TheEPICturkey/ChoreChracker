import React, { useState } from 'react';
import axios from 'axios';

function AddChore({ onChoreAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState(''); 
    const [createdBy, setCreatedBy] = useState('');  

    const handleSubmit = (e) => {
        e.preventDefault();

        const chore = {
            title: title,
            description: description,
            assignedTo: parseInt(assignedTo),  
            createdBy: parseInt(createdBy)     
        };

        axios.post('http://localhost:5000/assignChore', chore)
            .then(() => {
                alert('Chore added successfully!');
                setTitle('');
                setDescription('');
                setAssignedTo('');  
                setCreatedBy('');   
                onChoreAdded();
            })
            .catch(error => {
                console.error("Error adding chore:", error);
            });
    };

    return (
        <div>
            <h2>Add Chore</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Assigned To (User ID):</label>
                    <input type="number" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
                </div>
                <div>
                    <label>Created By (User ID):</label>
                    <input type="number" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
                </div>
                <button type="submit">Add Chore</button>
            </form>
        </div>
    );
}

export default AddChore;


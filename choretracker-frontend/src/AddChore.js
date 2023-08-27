// import React, { useState } from 'react';
// import axios from 'axios';

// function AddChore({ onChoreAdded }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const chore = {
//             title,
//             description,
//             assignedTo: 1, 
//             createdBy: 2
//         };

//         console.log('Sending chore data:', chore);

//         axios.post('http://localhost:5000/assignChore', chore)
//             .then(() => {
//                 alert('Chore added successfully!');
//                 setTitle('');
//                 setDescription('');
//                 onChoreAdded();  
//             })
//             .catch(error => {
//                 if (error.response) {
//                     console.error('Error response:', error.response.data);
//                     console.error('Error response status:', error.response.status);
//                     console.error('Error response headers:', error.response.headers);
//                 } else if (error.request) {
//                     console.error('Error request:', error.request);
//                 } else {
//                     console.error('Error message:', error.message);
//                 }
//                 console.error('Error config:', error.config);
//             });
//     };

//     return (
//         <div>
//             <h2>Add New Chore</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Title:
//                     <input
//                         value={title}
//                         onChange={e => setTitle(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Description:
//                     <input
//                         value={description}
//                         onChange={e => setDescription(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Add Chore</button>
//             </form>
//         </div>
//     );
// }

// export default AddChore;

import React, { useState } from 'react';
import axios from 'axios';

function AddChore({ onChoreAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState(''); // New state for assignedTo
    const [createdBy, setCreatedBy] = useState('');  // New state for createdBy

    const handleSubmit = (e) => {
        e.preventDefault();

        const chore = {
            title: title,
            description: description,
            assignedTo: parseInt(assignedTo),  // Convert to integer
            createdBy: parseInt(createdBy)     // Convert to integer
        };

        axios.post('http://localhost:5000/assignChore', chore)
            .then(() => {
                alert('Chore added successfully!');
                setTitle('');
                setDescription('');
                setAssignedTo('');  // Reset assignedTo
                setCreatedBy('');   // Reset createdBy
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


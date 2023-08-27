// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ChoresList from './ChoresList';
// import AddChore from './AddChore';
// import axios from 'axios';

// function App() {
//     const [chores, setChores] = useState([]);

//     const fetchChores = () => {
//         axios.get('http://localhost:5000/chores')
//             .then(response => {
//                 setChores(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching chores:", error);
//             });
//     };

//     useEffect(() => {
//         fetchChores();
//     }, []);

//     return (
//         <div className="App">
//             <h1>ChoreTracker</h1>
//             <ChoresList chores={chores} />
//             <AddChore onChoreAdded={fetchChores} />
//         </div>
//     );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddChore from './AddChore';
import ChoresList from './ChoresList';

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
        <div>
            <h1>Chore Tracker</h1>
            <AddChore onChoreAdded={fetchChores} />
            <ChoresList chores={chores} />
        </div>
    );
}

export default App;
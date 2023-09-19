// import React, { useState } from 'react';
// import { db, collection, addDoc } from '../../firebase/index';

// function AddChore() {
//   const [choreData, setChoreData] = useState({
//     name: '',
//     dueDate: '',
//     note: '',
//     assignedToKidId: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setChoreData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newChore = {
//       ...choreData,
//       isCompleted: false,
//     };
//     console.log('New Chore Object:', JSON.stringify(newChore, null, 2));
//     try {
//       const docRef = await addDoc(collection(db, 'chores'), newChore);
//       console.log('Chore added successfully with ID:', docRef.id);
//     } catch (error) {
//       console.error('Error adding chore:', error);
//     }
//   };
  


//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Chore Name:
//           <input type="text" name="name" value={choreData.name} onChange={handleChange} />
//         </label>
//         <label>
//           Due Date:
//           <input type="date" name="dueDate" value={choreData.dueDate} onChange={handleChange} />
//         </label>
//         <label>
//           Note:
//           <input type="text" name="note" value={choreData.note} onChange={handleChange} />
//         </label>
//         <button type="submit" onClick={handleSubmit}>Add Chore</button>
//       </form>
//     </>
//   );
// }

// export default AddChore;


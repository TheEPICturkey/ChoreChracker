// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function ParentHome() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Welcome to the Parent Home page!</h1>
//       <button onClick={() => navigate('/home')}>Home</button>
//     </div>
//   );
// }

// export default ParentHome;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/index'; 
import { setDoc, doc, collection, addDoc, getDocs } from "firebase/firestore"; 

function ParentHome() {
  const [kidName, setKidName] = useState('');
  const [choreName, setChoreName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [assignedKid, setAssignedKid] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser, currentUser, kids, setKids } = useContext(AuthContext);

  useEffect(() => {
    const fetchKids = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "kids"));
        let kidsArray = [];
        querySnapshot.forEach((doc) => {
          kidsArray.push({ ...doc.data(), id: doc.id });
        });
        setKids(kidsArray);
      } catch (e) {
        console.error("Error fetching kids: ", e);
      }
    };

    fetchKids();
  }, [setKids]);

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/sign-in');
  };

  const createKidProfile = async () => {
    const newKid = { name: kidName, id: Date.now().toString() }; 
    try {
      await setDoc(doc(db, "kids", newKid.id), newKid);  
      setKids([...kids, newKid]);
      setKidName('');
    } catch (e) {
      console.error("Error adding kid profile: ", e);
    }
  };
  

  const handleChoreCreation = async (e) => {
    e.preventDefault();
    if (!assignedKid) {
      alert("Please select a kid to assign the chore to.");
      return;
    }

    if (!currentUser) {
      alert("Current user is not defined. Please sign in again.");
      return;
    }

    // Logging currentUser structure to verify the properties
    console.log('Current user structure: ', currentUser);
    console.log('Assigned Kid ID:', assignedKid);

    try {
      await addDoc(collection(db, "chores"), {
        name: choreName,
        dueDate,
        note,
        assignedToKidId: assignedKid,  
        parentId: currentUser.uid,  // Changed from currentUser.id to currentUser.uid
      });
      console.log("Chore created successfully");
      setChoreName('');
      setDueDate('');
      setNote('');
      setAssignedKid('');
    } catch (e) {
      console.error("Error creating chore: ", e);
    }
  };

  return (
    <div>
      <h1>Welcome to the Parent Home page!</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <input 
          type="text" 
          placeholder="Kid Name" 
          value={kidName} 
          onChange={(e) => setKidName(e.target.value)} 
        />
        <button onClick={createKidProfile}>Create Kid Profile</button>

        <form onSubmit={handleChoreCreation}>
          <input 
            type="text" 
            value={choreName} 
            onChange={(e) => setChoreName(e.target.value)} 
            placeholder="Chore Name" 
          />
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            placeholder="Due Date" 
          />
          <textarea 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="Note"
          ></textarea>
          <select 
            value={assignedKid} 
            onChange={(e) => setAssignedKid(e.target.value)}
          >
            {kids.map(kid => <option value={kid.id} key={kid.id}>{kid.name}</option>)}
          </select>
          <button type="submit">Create Chore</button>
        </form>

        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default ParentHome;

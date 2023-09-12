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

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/index'; 
import { setDoc, doc } from "firebase/firestore"; 

function ParentHome() {
  const [kidName, setKidName] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser, kids, setKids } = useContext(AuthContext);

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/sign-in');
  };

  const createKidProfile = async () => {
    const newKid = { name: kidName, id: Date.now() };
    try {
      await setDoc(doc(db, "kids", newKid.id.toString()), newKid);  // Add the new kid to the Firestore database
      setKids([...kids, newKid]);
      setKidName('');
    } catch (e) {
      console.error("Error adding kid profile: ", e);
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
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default ParentHome;





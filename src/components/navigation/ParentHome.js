import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/index'; 
import { setDoc, doc, collection, addDoc, getDocs } from "firebase/firestore"; 
import './ParentProfile.css';

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
  
    console.log('Current user structure: ', currentUser);
    console.log('Assigned Kid ID:', assignedKid);
  
    try {
      await addDoc(collection(db, "chores"), {
        name: choreName,
        dueDate,
        note,
        assignedToKidId: assignedKid,  
        parentId: currentUser.uid,  
        isCompleted: false,  
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
      <h1>Parent Home Page</h1>
      <div className='kidChoreCreate'>
        {/* <h1>Parent Home Page</h1> */}
        <div>
        <div className='addAKid'>
          <h2 className='addAKid'>Add a kid</h2>
          <input 
            type="text" 
            placeholder="Kid Name" 
            value={kidName} 
            onChange={(e) => setKidName(e.target.value)} 
          />
          </div>
          <div className="createKidButtonContainer">
            <button onClick={createKidProfile} className='createKidButton'>Create Kid Profile</button>
          </div>  
          <h2>Create a chore</h2>
          <form onSubmit={handleChoreCreation} className='addAKid'>
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
              className="custom-textarea"
            ></textarea>
            <br></br>
            <select 
              value={assignedKid} 
              onChange={(e) => setAssignedKid(e.target.value)}
            >
              {kids.map(kid => <option value={kid.id} key={kid.id}>{kid.name}</option>)}
            </select>
            <br></br>
            <button type="submit">Create Chore</button>
          </form>
          <div className='addAKid'>
            <button onClick={() => navigate('/home')}>Home</button> 
          </div>
          {/* <button onClick={handleSignOut}>Sign Out</button> */}
        </div>
      </div>
    </div>
  );
}

export default ParentHome;
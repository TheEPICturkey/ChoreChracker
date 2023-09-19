import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, getDocs, collection, where, doc as firestoreDoc, updateDoc, query, getDoc } from '../../firebase/index'; 

function KidProfile() {
  const { id } = useParams();
  const [kidData, setKidData] = useState(null);
  const [chores, setChores] = useState([]);
  
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const docRef = firestoreDoc(db, 'kids', id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setKidData(docSnapshot.data());
        } else {
          console.error('No kid found with the given ID');
        }
      } catch (e) {
        console.error('Error fetching kid data:', e);
      }
    };

    fetchKidData();
  }, [id]);

  useEffect(() => {
    const fetchChoresForKid = async (kidId) => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'chores'), where('assignedToKidId', '==', kidId), where('isCompleted', '==', false)));
        let choresArray = [];
        querySnapshot.forEach((doc) => {
          choresArray.push({ ...doc.data(), id: doc.id });
        });
        setChores(choresArray);
        console.log('Updated chores:', choresArray);
      } catch (e) {
        console.error('Error fetching chores:', e);
      }
    };

    if (id) {
      fetchChoresForKid(id);
    }
  }, [id]);

  const markChoreAsComplete = async (choreId) => {
    try {
      const choreDoc = firestoreDoc(db, 'chores', choreId);
      await updateDoc(choreDoc, { isCompleted: true });
      setChores(chores.filter(chore => chore.id !== choreId));
    } catch (e) {
      console.error('Error updating chore:', e);
    }
  };

  return (
    <div>
      {kidData && <h1>{kidData.name}'s Profile</h1>}
      <h2>Chores</h2>
      {chores.map(chore => (
        <div key={chore.id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
          <h3>Chore Name: {chore.name}</h3>
          <p>Due Date: {chore.dueDate}</p>
          <p>Note: {chore.note}</p>
          <button onClick={() => markChoreAsComplete(chore.id)}>COMPLETE</button>
        </div>
      ))}
    </div>
  );
}

export default KidProfile;


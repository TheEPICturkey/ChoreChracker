import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, getDocs, collection, where } from '../../firebase/index'; 

function KidProfile() {
  const { id } = useParams(); // Assuming you're using react-router-dom and you have a route set up to pass the kid ID as a URL parameter
  const [kidData, setKidData] = useState(null);
  const [chores, setChores] = useState([]);
  
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const docSnapshot = await doc(db, 'kids', id).get();
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
        const querySnapshot = await getDocs(collection(db, 'chores'), where('assignedToKidId', '==', kidId));
        let choresArray = [];
        querySnapshot.forEach((doc) => {
          choresArray.push({ ...doc.data(), id: doc.id });
        });
        setChores(choresArray);
      } catch (e) {
        console.error('Error fetching chores:', e);
      }
    };

    if (id) {
      fetchChoresForKid(id);
    }
  }, [id]);

  return (
    <div>
      {kidData && <h1>{kidData.name}'s Profile</h1>}
      <h2>Chores</h2>
      {chores.map(chore => (
        <div key={chore.id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
          <h3>Chore Name: {chore.name}</h3>
          <p>Due Date: {chore.dueDate}</p>
          <p>Note: {chore.note}</p>
          <p>Assigned To Kid ID: {chore.assignedToKidId}</p>6
        </div>
      ))}
    </div>
  );

}

export default KidProfile;




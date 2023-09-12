import React, { createContext, useState, useEffect } from 'react';
import { getDocs, collection } from '../firebase/index'; 
import { db } from '../firebase/index';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [kids, setKids] = useState([]);

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
  }, [db, setKids]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, kids, setKids }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

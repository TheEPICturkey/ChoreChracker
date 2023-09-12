import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function KidProfile() {
  const { id } = useParams();
  const { kids } = useContext(AuthContext);

  const kid = kids.find(k => k.id === parseInt(id));

  if (!kid) {
    return <div>Kid not found</div>;
  }

  return (
    <div>
      <h1>{kid.name}'s Profile</h1>
      {/* Other details about the kid can go here */}
    </div>
  );
}

export default KidProfile;



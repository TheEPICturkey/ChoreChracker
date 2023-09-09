import React from 'react';
import { useNavigate } from 'react-router-dom';

function ParentHome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Parent Home page!</h1>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
}

export default ParentHome;




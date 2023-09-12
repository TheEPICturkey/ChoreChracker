import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ParentProfile from './ParentProfile';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const { kids } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <ParentProfile />
      {kids.map(kid => (
        <div key={kid.id} onClick={() => navigate(`/kid-profile/${kid.id}`)}>
          {kid.name}
        </div>
      ))}
    </div>
  );
}

export default Home;
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ParentProfile from './ParentProfile';
import { useNavigate } from 'react-router-dom';
import './KidProfile.css';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Home() {
  const navigate = useNavigate();
  const { kids } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <ParentProfile />
      {kids.map(kid => (
        <div 
          key={kid.id} 
          onClick={() => navigate(`/kid-profile/${kid.id}`)} 
          className="profile-circle"
          style={{ backgroundColor: getRandomColor() }}
        >
          {kid.name}
        </div>
      ))}
    </div>
  );
}

export default Home;
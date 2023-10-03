import './HomePage.css';
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
      <h2></h2>
      <div className="center-parent-profile">
        <ParentProfile />
      </div>
      <div className="profile-circle-container">
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
    </div>
  );
}

export default Home;



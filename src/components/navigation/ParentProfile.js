import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './ParentProfile.css';

function ParentProfile() {
  const navigate = useNavigate();  

  const navigateToParentHome = () => {
    navigate('/parentHome');  
  };

  return (
    <div className="profile-circle" onClick={navigateToParentHome}>
      Parent
    </div>
  );
}

export default ParentProfile;

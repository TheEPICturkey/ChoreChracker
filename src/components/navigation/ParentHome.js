// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function ParentHome() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Welcome to the Parent Home page!</h1>
//       <button onClick={() => navigate('/home')}>Home</button>
//     </div>
//   );
// }

// export default ParentHome;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ParentHome() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/sign-in');
  };

  return (
    <div>
      <h1>Welcome to the Parent Home page!</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default ParentHome;




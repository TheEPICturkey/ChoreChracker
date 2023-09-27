import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(currentUser);

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/sign-in');
  };

  return (
    <nav>
      {currentUser ? (
        <>
          {location.pathname !== '/home' && location.pathname !== '/parentHome' && <Link to="/home">Home</Link>}
          {location.pathname === '/ParentHome' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
              <button onClick={() => navigate('/home')}>Home</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
          {location.pathname !== '/ParentHome' && <button onClick={handleSignOut}>Sign Out</button>}
        </>
      ) : (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;



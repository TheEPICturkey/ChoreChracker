import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css'; 

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/sign-in');
  };

  const isAuthPage = location.pathname === '/sign-up' || location.pathname === '/sign-in';

  return !isAuthPage ? (
    <nav>
      {currentUser ? (
        <>
          {location.pathname === '/ParentHome' && (
            <div className=" signout-circle">
              <button onClick={handleSignOut} className='SignOut'>Sign Out</button>
            </div>
          )}
          <div className=" signout-circle">
          {location.pathname !== '/ParentHome' && <button onClick={handleSignOut} className='SignOut'>Sign Out</button>}
          </div>
        </>
      ) : (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  ) : null;
}

export default Navbar;


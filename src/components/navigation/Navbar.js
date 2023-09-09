import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(currentUser);

  const handleSignOut = () => {
    setCurrentUser(null);
    navigate('/sign-in');
  };

  return (
    <nav>
      {currentUser && <Link to="/">Home</Link>}
      {!currentUser ? (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
    </nav>
  );
}

export default Navbar;







import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user ? (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      ) : (
        <button onClick={() => { /* Function to handle sign out when i make it */ }}>Sign Out</button>
      )}
    </nav>
  );
}

export default Navbar;

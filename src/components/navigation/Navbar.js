// import React, { useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';

// function Navbar() {
//   const { currentUser, setCurrentUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   console.log(currentUser);

//   const handleSignOut = () => {
//     setCurrentUser(null);
//     navigate('/sign-in');
//   };

//   return (
//     <nav>
//       {currentUser && location.pathname !== '/home' && location.pathname !== '/ParentHome' && <Link to="/">Home</Link>}

//       {!currentUser ? (
//         <>
//           <Link to="/sign-up">Sign Up</Link>
//           <Link to="/sign-in">Sign In</Link>
//         </>
//       ) : (
//         <button onClick={handleSignOut}>Sign Out</button>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

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
      {location.pathname === '/parentHome' ? null : (
        currentUser ? (
          <>
            {location.pathname !== '/home' && <Link to="/">Home</Link>}
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )
      )}
    </nav>
  );
}

export default Navbar;



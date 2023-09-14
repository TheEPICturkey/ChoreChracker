import React, { useState, useContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('rememberMe')) {
      setEmail(localStorage.getItem('rememberMeEmail'));
      setPassword(localStorage.getItem('rememberMePassword'));
      setRememberMe(true);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("Sign in was successful, user data: ", userCredential.user); // Logging user data structure

      setCurrentUser(userCredential.user); // Setting currentUser state
      navigate('/home');

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberMeEmail', email);
        localStorage.setItem('rememberMePassword', password);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberMeEmail');
        localStorage.removeItem('rememberMePassword');
      }

    } catch (err) {
      setCurrentUser(null); // Resetting currentUser to null if there is an error
      setError(err.message);
      console.error("Error in sign-in: ", err.message);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      {error && <p>{error}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <label>
        <input 
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(prev => !prev)}
        />
        Remember Me
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;



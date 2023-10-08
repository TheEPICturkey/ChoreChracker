import React, { useState, useContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Sign.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

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

      console.log("Sign in was successful, user data: ", userCredential.user);

      setCurrentUser(userCredential.user); 
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
      setCurrentUser(null);
      setError("Your email or password is incorrect. Please double-check and try again.");
      console.error("Error in sign-in: ", err.message);
    }
  };

  return (
    <div className='Background'>
      <h1>ChoreIO</h1>
      <h2>Sign In</h2>
      <div className='test'>
        <form onSubmit={handleSignIn}>
          {error && <p>{error}</p>}
          <p>EMAIL</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>PASSWORD</p>
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <br></br>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
            />
            Show Password
          </label>
          
          <br></br>
          <br></br>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(prev => !prev)}
            />
            Remember Me
          </label>
          <br></br>
          <br></br>
          <button type="submit">Sign In</button>
        </form>
        <br></br>
        Don't have an account? Sign Up<button className="SignUp" onClick={() => navigate('../SignUp')}><strong><em>HERE</em></strong>!</button>
      </div>
    </div>
  );
}

export default SignIn;




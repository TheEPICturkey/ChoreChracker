import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../../firebase/index.js'; 
import { useNavigate } from 'react-router-dom';
import './Sign.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [rememberMe, setRememberMe] = useState(false); 
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setError('Invalid email or passward format');
        return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      setError(null);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <div className='Background'>
      <h1>ChoreIO</h1>
      <h2>Sign Up</h2>
      <div className='test'>
        {error && <p>Error: {error}</p>}
        <p>VALID EMAIL</p>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>PASSWORD</p>
        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Already have an account? Sign In<button className="SignIn" onClick={() => navigate('../SignIn')}><strong><em>HERE</em></strong>!</button></p>
      </div>
    </div>
  );
}

export default SignUp;



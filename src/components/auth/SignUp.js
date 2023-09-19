import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../../firebase/index.js'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setError('Invalid email format');
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
    <div>
    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleSignUp}>Sign Up</button>

    {error && <p>Error: {error}</p>}
  </div>
);
}


export default SignUp;

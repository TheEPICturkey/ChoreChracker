// SignUp.js
// import React, { useState } from 'react';
// import { auth, createUserWithEmailAndPassword } from '../../firebase/index';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.error("Error during sign-up:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSignUp}>
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import { auth } from '../../firebase/index.js'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User signed up:', userCredential);
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/navigation/Navbar';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
// import Home from './components/navigation/Home';
// import { AuthProvider } from './context/AuthContext';

// const App = () => {
//     console.log("app is rendering");
//     return (
//         <AuthProvider>
//             <Router>
//                 <h1>Chore Chracker</h1>
//              <Navbar />
//                 <Routes>
//                     <Route path="/sign-in" element={<SignIn />} />
//                     <Route path="/sign-up" element={<SignUp />} />
//                     <Route path="/home" element={<Home />} />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }


// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/navigation/Home';
import ParentProfile from './components/navigation/ParentProfile'; 
import ParentHome from './components/navigation/ParentHome';
import { AuthProvider } from './context/AuthContext';

<Route path="/parent-home" element={<ParentHome />} />

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <h1>Chore Chracker</h1>
        <Navbar />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/parent" element={<ParentProfile />} /> {/* New route for the ParentProfile component */}
          <Route path="/parentHome" element={<ParentHome />} /> {/* New route for the ParentHome component */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



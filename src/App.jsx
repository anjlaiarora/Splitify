


// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import Splitter from './components/Splitter';



// function App() {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
//           <Route path="/Splitter" element={<Splitter />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />


//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />








//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
 import Splitter from './components/Splitter';
 

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router> 
      <Routes>
        <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />} />
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/" element={<Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
    <Route path="/Splitter" element={<Splitter />} />

      </Routes>                              
    </Router> 
  );
}

export default App;

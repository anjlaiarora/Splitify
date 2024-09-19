import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Splitter from './components/Splitter';
import About from './components/About';
import Explore from './components/Explore';
import Contact from './components/Contact';
import MainLayout from './components/MainLayout';
import Footer from './components/Footer';



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path:"/splitter",
      element:<Splitter/>,
    },

    {
      path:"/register",
      element:<Register/>,
    },
    {
      path:"/login",
      element:<Login/>,
    },
     {
      path:"/footer",
      element:<Footer/>,

      
     },

     

     

    {
      path:"/",
      element:<MainLayout/>,
      children:[{
        path:"/",
        element:<Dashboard/>,
      },
    {
      path:"/aboutus",
      element:<About/>,

    },

    {
      path:"/explore",
      element:<Explore/>,
    },

    {
      path:"/contect",
      element:<Contact/>,
    },

    ]
    }
  ]);



  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    
      {/* <Router>

        <Routes>
          <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path='/*' element={
            <Routes>
              <Route path="" element={<Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
              <Route path="splitter" element={<Splitter />} />
              <Route path='aboutus' element={<About />} />
              <Route path='explore' element={<Explore />} />
              <Route path='contact' element={<Contact />} />
            </Routes>
          }></Route>


        </Routes>
      </Router> */}

    </>
  );
}

export default App;

import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import NavbarCom from './NavbarCom'
const MainLayout = () => {
  return (
    <div>
        <NavbarCom/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout
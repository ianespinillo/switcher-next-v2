import React, { useContext } from 'react'
import { Navbar } from '../UI/navbar'

export const NavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

import React from 'react'
import { useRouter } from 'next/navigation'
import  { useContext, useEffect, useState } from 'react'

import styles from '@/Styles/Navbar.module.css'

export const UnloggedNavbar = () => {
  const router = useRouter()

  return (
    <nav className={styles.navBar} id='navBar'>
          <ul className={styles['navbar-ul']}>
            <li>Contact</li>
            <li>Custom Job</li>
            <li>Store</li>
            <button onClick={() => router.push('/auth/login')}>Login</button>
            <button onClick={() => router.push('/auth/register')}>
              Sign up
            </button>
          </ul>
        </nav>
  )
}

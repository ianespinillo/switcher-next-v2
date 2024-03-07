'use client'

import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import confedStyles from '@/Styles/Confederacion.module.css'
import { LoggedNavbar } from './Navbars/LoggedNavbar'
import { UnloggedNavbar } from './Navbars/UnloggedNavbar'
import styles from '@/Styles/Navbar.module.css'






export const Navbar = () => {

  
  const location = usePathname()
  
  const { data: session, status } = useSession()
  const isLogged = status === 'authenticated'
  const publicRoutes=['custom-job', 'contact', 'checkout', 'admin', 'switcher']
  useEffect(() => {
    
    const path = location.split('/')
    if (document.getElementById('navBar')) {
        if (path[1] !== '' && path.length == 2 && !publicRoutes.some(route=>path.includes(route))) {
          document.body.removeAttribute('class')
        document.body.classList.add(styles[path[1]], confedStyles[path[1]])
        if (document.getElementById('submenu')) {
          document.getElementById('submenu').removeAttribute('class')
          document
            .getElementById('submenu')
            .classList.add(styles[path[1]], styles.submenu)
        }
      } else {
        document.body.removeAttribute('class')
        document.body.classList.add(styles[`main-screen`])
        if (document.getElementById(styles.submenu)) {
          document.getElementById(styles.submenu).removeAttribute('class')
          document.getElementById('submenu').classList.add(styles.submenu)
        }
      }
    }
  }, [location])
  if (!location.includes('auth' || 'admin' || 'dashboard')) {
    if (!isLogged) {
      return <UnloggedNavbar />
    } else {
      return <LoggedNavbar />
    }
  }
}

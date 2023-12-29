'use client'

import { signOut, useSession } from 'next-auth/react'
import {  usePathname,  } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import styles from '@/Styles/Navbar.module.css'
import confedStyles from '@/Styles/Confederacion.module.css'


import {IoPersonCircle} from 'react-icons/io5';
import {IoIosArrowDown} from 'react-icons/io';
import { IconContext } from 'react-icons'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const location = usePathname()
  const router = useRouter()
  
  const { data: session, status } = useSession()
  const isLogged = status === 'authenticated'
  /* const confedPath = location.pathname.replace(
    '[ConfedName]',
    location.query.ConfedName
  ) */

  useEffect(() => {
    const path =location.split('/')
    if (document.getElementById('navBar')) {
      if (path[1] !== '' && path.length == 2) {
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
  }, [location.query])
  if (!location.includes('auth')) {
    if (!isLogged) {
      return (
        <nav className={styles.navBar} id='navBar'>
          <ul className={styles['navbar-ul']}>
            <li>Contact</li>
            <li>Custom Job</li>
            <li>Store</li>
            <button onClick={() => router.push('/auth/login')}>Login</button>
            <button onClick={() => router.push('/auth/register')}>Sign up</button>
          </ul>
        </nav>
      )
    } else {
      return (
        <nav className={styles.navBar} id='navBar'>
          <ul className={styles['navbar-ul']}>
            <li>Contact</li>
            <li>Custom Job</li>
            <li>Store</li>
            <div
              className={styles['icon-container']}
              onMouseEnter={e => setShowSubMenu(true)}
              onMouseLeave={e => setShowSubMenu(false)}
            >
              <IconContext.Provider value={{style:{verticalAlign:'middle'}}}>
                <IoPersonCircle size={24} />
                <IoIosArrowDown size={24} />
              </IconContext.Provider>
              {showSubMenu && (
                <div className={styles.submenu} id='submenu'>
                  <ul>
                    <li>Dashboard</li>
                    <li>
                      <div className={styles.logout} onClick={()=> signOut()}>
                        Log out <i className='bi bi-arrow-bar-right'></i>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
        </nav>
      )
    }
  }
}

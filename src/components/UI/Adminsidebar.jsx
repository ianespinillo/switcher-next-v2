// Component.jsx

import React from 'react'
import styles from '@/Styles/sidebar.module.css' // Importa el archivo de estilos como módulo
import {
  CreditCardIcon,
  ShoppingCartIcon,
  UsersIcon
} from '@/components/icons/Icons'
import Link from 'next/link'
import { GoVersions } from 'react-icons/go'
import { BiWorld } from 'react-icons/bi'
import { FaFlag, FaTrophy } from 'react-icons/fa'

export function Adminsidebar () {
  return (
    <aside className={styles.container}>
      <Link className={styles.link} href='/admin/confederations'>
        <BiWorld className={styles.icon} />
        <span className={styles.text}>Confederation</span>
      </Link>
      <Link className={styles.link} href='/admin/countries'>
        <FaFlag className={styles.icon} />
        <span className={styles.text}>Countries</span>
      </Link>
      <Link className={styles.link} href='/admin/competitions?page=1'>
        <FaTrophy className={styles.icon} />
        <span className={styles.text}>Competitions</span>
      </Link>
      <Link className={styles.link} href='/admin/users'>
        <UsersIcon className={styles.icon} />
        <span className={styles.text}>Users</span>
      </Link>
      <Link className={styles.link} href='/admin/payements'>
        <CreditCardIcon className={styles.icon} />
        <span className={styles.text}>Payments</span>
      </Link>
      <Link className={styles.link} href='/admin/switcher'>
        <GoVersions className={styles.icon} />
        <span className={styles.text}>Switcher App</span>
      </Link>
    </aside>
  )
}

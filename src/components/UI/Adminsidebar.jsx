// Component.jsx

import React from 'react'
import styles from '@/Styles/sidebar.module.css' // Importa el archivo de estilos como módulo
import {
  CreditCardIcon,
  ShoppingCartIcon,
  UsersIcon
} from '@/components/icons/Icons'
import Link from 'next/link'

export function Adminsidebar () {
  return (
    <aside className={styles.container}>
      <Link className={styles.link} href='/admin/products'>
        <ShoppingCartIcon className={styles.icon} />
        <span className={styles.text}>Products</span>
      </Link>
      <Link className={styles.link} href='/admin/users'>
        <UsersIcon className={styles.icon} />
        <span className={styles.text}>Users</span>
      </Link>
      <Link className={styles.link} href='/admin/payements'>
        <CreditCardIcon className={styles.icon} />
        <span className={styles.text}>Payments</span>
      </Link>
    </aside>
  )
}

'use client'

import React from 'react'
import styles from '@/Styles/Product.module.css'
import { cartStore } from '@/app/store/cartstore'

export default function AddButton ({ prod }) {
  const addItem = cartStore((state) => state.addNewItem);
  function handleClick () {
    addItem(prod)
  }
  return (
    <button className={styles.btnAdd} onClick={handleClick}>
      Add to cest
    </button>
  )
}

'use client'

import React from 'react'
import styles from '@/Styles/Product.module.css'
import { cartStore } from '@/app/store/cartstore'

export default function AddButton ({ prod, isBuyed }) {
  const addItem = cartStore((state) => state.addNewItem);
  function handleClick () {
    addItem(prod)
  }
  if(!isBuyed){
    return (
      <button className={styles.btnAdd} onClick={handleClick}>
        Add to cest
      </button>
    )
  }else{
    return (
      <h2 className='text-lg qatar'>Product already buyed</h2>
    )
  }
}

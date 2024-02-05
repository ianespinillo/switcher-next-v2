'use client'

import React from 'react'
import styles from '@/Styles/Product.module.css'
import { cartStore } from '@/app/store/cartstore'
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function AddButton ({ prod, isBuyed }) {
  const addItem = cartStore((state) => state.addNewItem);
  const {data:session} = useSession()
  const router= useRouter()
  function handleClick () {
    if (!session){
      router.push('/auth/login')
    }
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

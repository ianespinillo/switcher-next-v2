'use client'

import React from 'react'
import styles from '@/Styles/Product.module.css'
import { cartStore } from '@/store/cartstore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function AddButton ({ prod, isBuyed }) {
  const addItem = cartStore(state => state.addNewItem)
  const { data: session } = useSession()
  const router = useRouter()
  function handleClick () {
    if (!session) {
      router.push('/auth/login')
    }
    addItem(prod)
  }
  if (!isBuyed) {
    return (
      <button
        className='bg-[dodgerblue] text-lg qatar py-2 rounded-2xl text-white text-center hover:bg-transparent hover:text-[dodgerblue] border-2 border-[dodgerblue] transition duration-300'
        onClick={handleClick}
      >
        Add to cest
      </button>
    )
  } else {
    return <h2 className='text-lg qatar'>Product already buyed</h2>
  }
}

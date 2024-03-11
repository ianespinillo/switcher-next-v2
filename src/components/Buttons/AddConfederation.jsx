import React from 'react'
import Link from 'next/link';
export const AddConfederation = () => {
  
  return (
    <>
      <Link
        className='bg-qatar-gold text-qatar-purple qatar px-2 py-1 rounded-lg outline outline-2 outline-qatar-gold hover:bg-transparent hover:text-qatar-gold duration-300'
        href={'/admin/confederations/add'}
      >
        + Add Confederation
      </Link>
      
    </>
  )
}

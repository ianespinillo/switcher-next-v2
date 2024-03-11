'use client'

import React from 'react'
import Link from 'next/link';
export const AddCountry = () => {
    
  return (
    <>
      <Link
        href={'/admin/countries/add'}
        className='bg-qatar-gold text-qatar-purple qatar px-2 py-1 rounded-lg outline outline-2 outline-qatar-gold hover:bg-transparent hover:text-qatar-gold duration-300'
      >
        + Add Country
      </Link>
    </>
  )
}

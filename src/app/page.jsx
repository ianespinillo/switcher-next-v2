
import React from 'react'
import Link from 'next/link'

import { obtainConfederations } from '@/lib/productActions'



export default async function page ({ searchParams }) {
  const confederations = await obtainConfederations()
  
  
  if (
    searchParams.collection_status &&
    searchParams.collection_status == 'approved'
  ) {
    
  }
  return (
    <>
      <div className='grilla'>
        {confederations.map((confederacion, i) => (
          <Link className='confederacion' key={i} href={confederacion.confed_3}>
            <img
              src={confederacion.img_url}
              className='ImgConfederacion'
              alt='ConfederationImage'
            />
            <p className='nombreConfederacion'>{confederacion.confed_3}</p>
          </Link>
        ))}
      </div>
    </>
  )
}

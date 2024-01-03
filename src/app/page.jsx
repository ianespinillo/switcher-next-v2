
import { obtainConfederations } from '@/lib/productActions'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

export default async function page () {
  const confederations = await obtainConfederations()
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

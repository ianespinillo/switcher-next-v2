
import React from 'react'
import Link from 'next/link'
import Icon from '../../public/Logo_2024.ico';
import { obtainConfederations } from '@/lib/productActions'



export default async function Page ({ searchParams }) {
  const confederations = await obtainConfederations()
  
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-24'>
        {confederations.map((confederacion, i) => (
          <Link className='confederacion' key={i} href={confederacion.confed_3}>
            <img
              src={confederacion.img_url}
              className='ImgConfederacion max-w-[200px] lg:max-w-[300px]'
              alt='ConfederationImage'
            />
            <p className='nombreConfederacion'>{confederacion.confed_3}</p>
          </Link>
        ))}
      </div>
    </>
  )
}


export const metadata = {
  title: 'Scoreboard Switcher',
  icons: {
    icon: '/Logo_2024.ico',
  },
}
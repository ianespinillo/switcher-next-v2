import React from 'react'
import Link from 'next/link'

import { filterByConfed, getConfed } from '@/lib/productActions'

export default async function index ({ params: { ConfedName } }) {
  const countries = await filterByConfed(ConfedName)
  const confed = await getConfed(ConfedName)
  return (
    <>
      <header>
        <div className='flex justify-center items-center gap-8 p-2'>
          <img src={confed.img_url} alt='Confederation logo' className='max-w-[300px]' />
          <h1 className='text-6xl text-qatar-gold qatar mt-2'>{ConfedName}</h1>
        </div>
      </header>
      <div className='grilla'>
        {countries.map((country, i) => (
          <Link
            className='confederacion'
            key={i}
            href={
              ConfedName == 'fifa'
                ? `${ConfedName}/${ConfedName}/${country.name}`
                : `${ConfedName}/${country.name}`
            }
          >
            <img
              src={country.country_img_url}
              className='ImgConfederacion'
              alt='ConfederationImage'
            />
          </Link>
        ))}
      </div>
    </>
  )
}

export async function generateMetadata({ params: { ConfedName } }) {
  const {confed_3, img_url} = await getConfed(ConfedName)
  return {
    title: confed_3,
    icons: {
      icon: img_url
    }
  }
  
}
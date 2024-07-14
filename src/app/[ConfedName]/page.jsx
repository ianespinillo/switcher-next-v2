'use server'
import React from 'react'
import Link from 'next/link'

import { filterByConfed, getConfed } from '@/lib/productActions'

export default async function index ({ params: { ConfedName } }) {
  const countries = await filterByConfed(ConfedName)
  const confed = await getConfed(ConfedName)
  return (
    <>
      <header>
        <div className='flex justify-center items-center flex-col gap-4 sm:flex-row sm:gap-8 p-2'>
          <img
            src={confed.img_url}
            alt='Confederation logo'
            className='max-w-[300px]'
          />
          <h1 className='text-6xl text-qatar-gold qatar'>{ConfedName}</h1>
        </div>
      </header>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-6 pt-28'>
        {countries.map((country, i) => (
          <Link
            className='confederacion'
            key={i}
            href={`${ConfedName}/${country.name}`}
          >
            <img
              src={country.country_img_url}
              className='max-w-[200px] lg:max-w-[300px] hover:scale-105 duration-[450ms] cursor-pointer'
              alt='ConfederationImage'
            />
          </Link>
        ))}
      </div>
    </>
  )
}

export async function generateMetadata ({ params: { ConfedName } }) {
  const { confed_3, img_url } = await getConfed(ConfedName)
  return {
    title: confed_3,
    icons: {
      icon: img_url
    }
  }
}

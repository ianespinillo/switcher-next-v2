import React from 'react'
import Link from 'next/link'

import { filterByConfed } from '@/lib/productActions'

export default async function index({params:{ConfedName}}) {
  const countries = await filterByConfed(ConfedName)
  console.log(countries)
  return (
    <div className='grilla'>
      {
        countries.map((country, i)=>(
          <Link className='confederacion' key={i} href={(ConfedName == 'fifa') ? `${ConfedName}/${ConfedName}/${country.name}`: `${ConfedName}/${country.name}`}>
            <img
              src={country.country_img_url}
              className='ImgConfederacion'
              alt='ConfederationImage'
            />
          </Link>
        ))
      }
    </div>
  )
}

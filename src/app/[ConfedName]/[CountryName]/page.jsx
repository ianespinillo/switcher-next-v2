import React from 'react'
import Link from 'next/link'
import { filterByCountry } from '@/lib/productActions'
import { ProductCard } from '@/components/cards/ProductCard'

export default async function Page_ ({ params: { ConfedName, CountryName } }) {
  const { countryId, childrens } = await filterByCountry(CountryName)
  return (
    <>
      <header>
        <div className='flex justify-center items-center flex-col gap-2 sm:flex-row'>
          {
            <>
              <img src={countryId.country_not_name_img} />
              <p className='text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-700 qatar'>
                {countryId.name}
              </p>
            </>
          }
        </div>
      </header>

      <div className='bg-white sm:p-[30px] w-full'>
        <div className='flex flex-wrap sm:grid md:grid md:grid-cols-2 lg:grid-cols-3'>
          {childrens.map((competition, i) => (
            <Link
              
              key={i}
              href={CountryName + '/' + competition.name}
            >
              <ProductCard
                name={competition.name}
                preview={competition.preview_url}
                price={competition.price}
                description={competition.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export async function generateMetadata ({ params: { CountryName } }) {
  const { countryId } = await filterByCountry(CountryName)
  return {
    title: countryId.name,
    icons: {
      icon: countryId.country_not_name_img
    }
  }
}

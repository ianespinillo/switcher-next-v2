import React from 'react'
import Link from 'next/link'

import styles from '@/Styles/Country.module.css'
import { filterByCountry } from '@/lib/productActions'

export default async function Page ({ params: { ConfedName, CountryName } }) {
  const { countryId, childrens } = await filterByCountry(CountryName)
  return (
    <>
      <header>
        <div className='header-texts'>
          {
            <>
              <img src={countryId.country_not_name_img} />
              <p className='countryName'>{countryId.name}</p>
            </>
          }
        </div>
      </header>

      <div className={styles.competitions}>
        <div className='grilla'>
          {childrens.map((competition, i) => (
            <Link
              className={styles.competencia}
              key={i}
              href={CountryName + '/' + competition.name}
            >
              <img src={competition.preview_url} alt='competition preview' />
              <p className={styles.description}>{competition.name}</p>
              <span>Price: ${parseFloat(competition.price)}</span>
              <button className={styles.btnSee}>See More</button>
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
    icons:{
      icon: countryId.country_not_name_img
    }
  }
}
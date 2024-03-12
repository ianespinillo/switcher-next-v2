import React from 'react'

import { StockTable } from '@/components/UI/StockTable'

import { obtainProducts } from '@/lib/productActions'
import Link from 'next/link'
import { AdmnTable } from '@/components/Tables/AdmnTable'

export default async function Product () {
  const data = await obtainProducts()
  return (
    <div className='absolute left-[20%] w-4/5 flex flex-col gap-4'>
      <div className='flex justify-end p-4 py-6'>
        <Link
          href={'/admin/competitions/add'}
          className='bg-qatar-gold text-qatar-purple qatar px-2 py-1 rounded-lg outline outline-2 outline-qatar-gold hover:bg-transparent hover:text-qatar-gold duration-300'
        >
          + Add Competition
        </Link>
      </div>
      <div className='p-3'>
        <AdmnTable
          TABLE_HEAD={['ID', 'Name', 'Logo', 'Abreviation', 'Actions']}
          TABLE_ROWS={data.map(product => ({
            id: product.id,
            name: product.name,
            logo: product.logo_url,
            alias: product.name_3
          }))}
          TABLE_LINKS={data.map(({ id }) => `/admin/competitions/edit/${id}`)}
          DELETE_ID={data.map(({ id }) => ({id:id, type: 'competition'}))}
        />
      </div>
    </div>
  )
}

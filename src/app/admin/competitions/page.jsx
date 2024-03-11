import React from 'react'

import { StockTable } from '@/components/UI/StockTable'

import { obtainProducts } from '@/lib/productActions'
import Link from 'next/link'

export default async function Product () {
  const data = await obtainProducts()
  return (
    <div>
      <div className='flex justify-end p-4 py-6 z-20'>
        <Link
          href={'/admin/competitions/add'}
          className='bg-qatar-gold text-qatar-purple qatar px-2 py-1 rounded-lg outline outline-2 outline-qatar-gold hover:bg-transparent hover:text-qatar-gold duration-300'
        >
          + Add Competition
        </Link>
      </div>
      <div>
        <StockTable
          titles={['Id', 'Name', 'Confederation', 'Actions']}
          btns={['Update', 'Delete']}
          data={data}
        />
      </div>
    </div>
  )
}

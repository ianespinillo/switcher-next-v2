import React from 'react'


import { StockTable } from '@/components/UI/StockTable'
import { Products } from '@/components/page/Products'
import { obtainProducts } from '@/lib/productActions'


export default async function Product () {
  const data= await obtainProducts()
  return (
    <div>
      <Products />
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

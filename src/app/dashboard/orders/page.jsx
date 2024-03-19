import React from 'react'
import { OrdersTable } from '@/components/Tables/OrdersTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
import { getMyProducts } from '@/lib/productActions'
import moment from 'moment'

export default async function Page_ () {
  const { user } = await getServerSession(authOptions)
  const payments = await getMyProducts(
    user.email
  )
    console.log(payments)
  return (
    <div className='absolute left-[20%] flex justify-center p-6'>
      <OrdersTable  />
    </div>
  )
}

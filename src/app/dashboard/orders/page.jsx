import React from 'react'
import { OrdersTable } from '@/components/Tables/OrdersTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
import { getMyProducts } from '@/lib/productActions'
import moment from 'moment'

export default async function Page_ () {
  const { user } = await getServerSession(authOptions)
  const payments = await getMyProducts(user.email)
  return (
    <div className='absolute left-[20%] flex justify-center w-4/5 p-6 mt-20'>
      <OrdersTable
        TABLE_HEAD={['Order ID', 'Date', 'Competitions buyed', 'Amount']}
        TABLE_ROWS={payments.map(payment => ({
          id: payment.id,
          date: payment.date,
          competitions: payment.products.join(', '),
          amount:'$' + payment.amount
        }))}
      />
    </div>
  )
}

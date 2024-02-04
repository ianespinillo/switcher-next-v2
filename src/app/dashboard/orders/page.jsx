import React from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/UI/Table'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
import { getMyProducts } from '@/lib/productActions'
import moment from 'moment'

export default async function Page () {
  const { user } = await getServerSession(authOptions)
  const { prods, userPayments, payementDetails } = await getMyProducts(
    user.email
  )
  
  return (
    <div className='flex justify-center p-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Buyed at</TableHead>
            <TableHead>Products buyed</TableHead>
            <TableHead>Order id</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userPayments.map((payment, i) => (
            <TableRow key={i}>
              <TableCell>{moment(payment.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
                {
                  payementDetails.filter(detail=> detail.payementId== payment.id)
                  .map(detail=>{
                    const product= prods.find(prod => prod.id == detail.productId)
                    return product ? product.name : null
                  }).join(', ')
                }
              </TableCell>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{(payment.method == 'PAYPAL' ? '$' : 'ARS') + payment.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

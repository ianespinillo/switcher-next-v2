import React, { Suspense } from 'react'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/UI/Table'

export const PayementsTable = ({paymemts}) => {
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Buyed by</TableHead>
          <TableHead>Products buyed</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Suspense fallback={<div>Loading...</div>}>
          {
            paymemts.map((data, i) => (
              <TableRow key={i}>
                <TableCell>{data.user_email}</TableCell>
                <TableCell>{data.products.join(', ')}</TableCell>
                <TableCell>{data.state?'Approved':'Pending'}</TableCell>
                <TableCell>{data.amount}</TableCell>
              </TableRow>
            ))
          }
        </Suspense>
      </TableBody>
    </Table>
  )
}

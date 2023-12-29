import React from 'react'

import Tablestyles from '@/Styles/table.module.css'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button
} from '@/components/UI/Table'

export const PayementsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
            <TableHead>Buyed by</TableHead>
            <TableHead>Products buyed</TableHead>
            <TableHead>Ticket id</TableHead>
            <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>STK001</TableCell>
          <TableCell>Stock 1</TableCell>
          <TableCell>Confederation 1</TableCell>
          <TableCell>$10</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

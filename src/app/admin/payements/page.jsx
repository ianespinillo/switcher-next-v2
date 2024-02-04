

import { PayementsTable } from '@/components/UI/PayementsTable'
import { getPayments } from '@/lib/productActions'
import React from 'react'

export default async function index() {
  const payments = await getPayments()
  
  return (
    <PayementsTable paymemts={payments} />
  )
}


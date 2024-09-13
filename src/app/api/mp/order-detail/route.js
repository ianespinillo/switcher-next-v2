import { NextResponse } from 'next/server'

import { MercadoPagoConfig, Payment } from 'mercadopago'
import prisma from '@/lib/db'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
})
export async function POST (req, res) {
  const body = await req.json()
  const {
    additional_info: { items },
    status,
    transaction_details: { net_received_amount},
    payment_method,
    
    date_approved,
    metadata: { email }
  } = await new Payment(client).get({ id: body.data.id })
  const payement_id = await createOrder(
    email,
    date_approved,
    status,
    payment_method.type,
    net_received_amount
  )
  await createPayementDetail(payement_id, items)
  return NextResponse.json({ ok: true })
}

async function createOrder (user_email, date, isAproved, method, amount) {
  const new_order = await prisma.payement.create({
    data: {
      method,
      date: new Date(date),
      state: isAproved == 'approved',
      user_email,
      amount
    }
  })
  return new_order.id
}

async function createPayementDetail (payement_id, items) {
  items.map(async item => {
    await prisma.payement_detail.create({
      data: {
        quantity: 1,
        productId: Number(item.id),
        payementId: Number(payement_id)
      }
    })
  })
}

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
    id,
    status,
    transaction_details: { net_received_amount, total_paid_amount },
    payment_method,
    date_created,
    date_approved,
    metadata: { email }
  } = await new Payment(client).get({ id: body.data.id })
  const payement_id= await createOrder(email, date_approved, status, payment_method.type)
  await createPayementDetail(payement_id, items)
  return NextResponse.json({ ok: true })
}

async function createOrder (user_email, date, isAproved, method) {
  const new_order = await prisma.payement.create({
    data: {
      method,
      date: new Date(date),
      state: isAproved == 'approved' ? true : false,
      user_email
    }
  })
  return new_order.id
}


async function createPayementDetail(payement_id, items){
  items.map(async item =>{
    const new_detail= await prisma.payement_detail.create({
      data:{
        quantity: 1,
        productId: Number(item.id),
        payementId: Number(payement_id)
      }
    })
  })
}
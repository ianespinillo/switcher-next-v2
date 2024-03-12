'use server'

import prisma from './db'

export async function paypalPayement (status, date, user_email, amount) {
  const payment = await prisma.payement.create({
    data: {
      method: 'PAYPAL',
      date: new Date(date),
      state: status == 'COMPLETED' ? true : false,
      user_email,
      amount: parseFloat(amount, 2)
    }
  })
  return payment.id
}

export async function createPayementDetail (payement_id, items) {
  items.map(async ({ reference_id }) => {
    await prisma.payement_detail.create({
      data: {
        quantity: 1,
        productId: reference_id,
        payementId: Number(payement_id)
      }
    })
  })
}

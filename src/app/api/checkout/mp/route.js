import { authOptions } from '@/lib/authoptions'
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
export async function POST (req, res) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
  })

  const { user } = await getServerSession(authOptions)

  const { cart, total } = await req.json()

  const bodyReq = {
    body: {
      items: cart.map(item => ({
        title: item.name,
        id: item.id,
        currency_id: 'USD',
        quantity: 1,
        unit_price: parseFloat(item.price)
      })),
      back_urls: {
        success: 'https://scoreboard-switcher.vercel.app/success'
        /* failure: "http://www.tu-sitio/failure",
          pending: "http://www.tu-sitio/pending" */
      },
      auto_return: 'approved',
      payer: {
        email: user.email
      },
      metadata: {
        email: user.email
      }
    }
  }

  const preference = new Preference(client).create(bodyReq)
  
  return NextResponse.json({ ok: true, id: (await preference).id })
}

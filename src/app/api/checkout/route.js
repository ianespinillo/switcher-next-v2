import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'



const enviroment = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY
)
const client = new paypal.core.PayPalHttpClient(enviroment)
export async function POST (req, res) {
  const { cart, total } = await req.json()
  const orders = new paypal.orders.OrdersCreateRequest()
  orders.requestBody({
    application_context: {
      return_url: 'http://localhost:3000/success'
    },
    intent: 'CAPTURE',
    purchase_units: cart.map(item => ({
      reference_id: `${item.id}`,
      amount: {
        currency_code: 'USD',
        value: `${parseFloat(item.price)}`
      },
      description: item.description
    }))
  })

  const response = await client.execute(orders)

  return NextResponse.json({
    id: response.result.id,
    result: response.result
  })
}

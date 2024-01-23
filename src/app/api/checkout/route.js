import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const REST_API = process.env.PAYPAL_REST_API
const SECRET_KEY = process.env.PAYPAL_SECRET_KEY


const enviroment = new paypal.core.SandboxEnvironment(
  'AYaZ--mpticcxqgFYBUE5KTMN0vN5yykRPYBOeZ-sMDYkpnhnv_SAOX3oGRFcWz_w7g3Ds6BwWmSA1jq',
  'EK8RuvgmbVJmsxEcs23tf-I5popkjR6WCp2TksGnFjuE-8LaaqZEWo47R1-9ftBhDokNqg9lwKv7LI6X'
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
      description: item.description,
    })),
  })

  const response = await client.execute(orders)
  
  return NextResponse.json({
    id: response.result.id,
    result: response.result
  })
}

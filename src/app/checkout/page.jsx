'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { IoTrashBin } from 'react-icons/io5'
import { GoQuestion } from 'react-icons/go'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { createPayementDetail, paypalPayement } from '@/lib/payementActions'
import { cartStore } from '../store/cartstore'
import { useSession } from 'next-auth/react'
import moment from 'moment'

export default function page () {
  const { data: session } = useSession()
  const { cart, cartSize, total, resetCart } = cartStore.getState()
  const router = useRouter()
  const id = initMercadoPago(process.env.NEXT_PUBLIC_SANDBOX_MP_KEY)
  const [isClient, setIsClient] = useState(false)
  const [preferenceId, setPreferenceId] = useState(null)
  const email = useRef(null)
  useEffect(() => {
    if (session) {
      email.currentUser = session.user.email
    }
  }, [session])

  
  
  
  if (isClient && cartSize > 0) {
    useEffect(() => {
      setIsClient(true)
  
      fetch('/api/checkout/mp', {
        method: 'POST',
        body: JSON.stringify({ cart, total })
      })
        .then(res => res.json())
        .then(res => setPreferenceId(res.id))
    }, [])
    return (
      <div className='grid grid-cols-2'>
        <div className='p-4'>
          <table className='  text-center w-full qatar mt-5'>
            <thead className='bg-qatar-gold text-center text-qatar-purple '>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((prod, i) => (
                  <tr
                    key={i}
                    className='outline-2 outline-qatar-gold text-qatar-gold'
                  >
                    <td className='items-center flex justify-center'>
                      <img src={prod.logo_url} />
                    </td>
                    <td>{prod.name}</td>
                    <td>${prod.price}</td>
                    <td>
                      <IoTrashBin
                        className='cursor-pointer'
                        onClick={() => deleteItem(prod)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='w-10/12 flex flex-col gap-3'>
          <div className='flex flex-col gap-4 border-b-2 border-qatar-gold border-solid p-1'>
            <h2 className='text-qatar-gold text-xl flex items-center justify-between '>
              Taxes: (10%)
              <GoQuestion style={{ cursor: 'pointer', marginRight: '10px' }} />
            </h2>
            <h1 className='text-qatar-gold text-2xl flex items-center justify-between'>
              Total: <span className='ml-3'>${(total * 1.1).toFixed(2)}</span>
            </h1>
          </div>
          <div>
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT
              }}
            >
              <PayPalButtons
                style={{
                  color: 'gold',
                  layout: 'horizontal',
                  label: 'paypal'
                }}
                createOrder={async (data, actions) => {
                  const res = await fetch('/api/checkout/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cart, total })
                  })
                  const order = await res.json()

                  return order.id
                }}
                onApprove={async (data, actions) => {
                  const {
                    purchase_units,
                    status,
                    update_time,
                    id,
                    payer: { email_address },
                    create_time
                  } = await actions.order.capture()

                  const paymentId = await paypalPayement(
                    status,
                    update_time,
                    email.currentUser
                  )
                  await createPayementDetail(paymentId, purchase_units)
                  resetCart()
                  const queries = {
                    id: id,
                    status: status,
                    totalPayed:
                      '$' +
                      purchase_units
                        .map(unit => Number(unit.amount.value))
                        .reduce((total, valor) => total + valor, 0),
                    dateCreated: moment(create_time).format('MMMM Do YYYY'),
                    dateCompleted: moment(update_time).format('MMMM Do YYYY'),
                    email: email_address
                  }
                  const queryParams = new URLSearchParams(queries).toString()
                  router.push(`/success?${queryParams}`)
                }}
              />
            </PayPalScriptProvider>

            {preferenceId && (
              <Wallet
                initialization={{
                  preferenceId: preferenceId,
                  redirectMode: 'modal'
                }}
                customization={{ texts: { valueProp: 'smart_option' } }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }else{
    return router.push('/')
  }
}

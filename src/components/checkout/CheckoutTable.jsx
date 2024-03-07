'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { GoQuestion } from 'react-icons/go'
import { IoTrashBin } from 'react-icons/io5'
import moment from 'moment'
import { paypalPayement, createPayementDetail } from '../../lib/payementActions'
import { useRouter } from 'next/navigation'
import { cartStore } from '../../store/cartstore'
import { useEffect, useState } from 'react'

export function CheckoutTable ({ email }) {
  const { cart, cartSize, total, resetCart, deleteItem } = cartStore.getState()
  const [isClient, setIsClient] = useState(null)
  const router = useRouter()
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (isClient) {
    return (
      <div className='flex flex-col lg:flex-row'>
        <div className='p-4 sm:basis-1/2'>
          <table className='text-center w-full mt-5 qatar'>
            <thead className='bg-qatar-gold text-qatar-purple'>
              <tr>
                <th className='px-2 py-3'>Logo</th>
                <th className='px-2 py-3'>Name</th>
                <th className='px-2 py-3'>Price</th>
                <th className='px-2 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((prod, i) => (
                  <tr
                    key={i}
                    className='outline-2 outline-qatar-gold text-qatar-gold'
                  >
                    <td className='items-center'>
                      <img
                        src={prod.logo_url}
                        alt={prod.name}
                        className='mx-auto'
                      />
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
        <div className='w-full lg:w-10/12 flex flex-col gap-3 lg:basis-1/2 p-4'>
          <div className='flex flex-col gap-4 border-b-2 border-qatar-gold border-solid p-1'>
            <h2 className='text-qatar-gold text-lg sm:text-xl flex items-center justify-between'>
              Taxes: (10%)
              <GoQuestion style={{ cursor: 'pointer', marginRight: '10px' }} />
            </h2>
            <h1 className='text-qatar-gold text-xl sm:text-2xl flex items-center justify-between'>
              Total:{' '}
              <span className='ml-3'>
                ${(selectedSub.price * 1.1).toFixed(2)}
              </span>
            </h1>
          </div>
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
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
                const payed = purchase_units
                  .map(unit => Number(unit.amount.value))
                  .reduce((total, valor) => total + valor, 0)

                const paymentId = await paypalPayement(
                  status,
                  update_time,
                  email,
                  payed
                )
                await createPayementDetail(paymentId, purchase_units)
                const queries = {
                  id: id,
                  status: status,
                  totalPayed: payed,
                  dateCreated: moment(create_time).format('MMMM Do YYYY'),
                  dateCompleted: moment(update_time).format('MMMM Do YYYY'),
                  email: email_address
                }
                resetCart()
                const queryParams = new URLSearchParams(queries).toString()
                router.push(`/success?${queryParams}`)
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    )
  }
}

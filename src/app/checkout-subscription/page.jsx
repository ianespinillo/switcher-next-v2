'use client'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSearchParams } from 'next/navigation'
import { GoQuestion } from 'react-icons/go'
import React, { useEffect, useState } from 'react'
import { subs } from '@/Data/subscriptions'
import { updateSubscription } from '@/lib/userActions'
import { useSession } from 'next-auth/react'

export default function Page_ () {
  const subQuery = useSearchParams().get('sub')
  const selectedSub = subs.find(sub => sub.level === Number(subQuery))
  const { data: session } = useSession()
  const [userId, setUserId] = useState(null)
  useEffect(() => setUserId(session.user.id), [])
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='p-4 sm:basis-1/2'>
        <table className='text-center w-full mt-5 qatar'>
          <thead className='bg-qatar-gold text-qatar-purple'>
            <tr>
              <th className='px-2 py-3'>Type</th>
              <th className='px-2 py-3'>Category</th>
              <th className='px-2 py-3'>Advantages</th>
              <th className='px-2 py-3'>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-qatar-gold'>
              <td className='px-1.5 py-2 text-balance'>Subscription</td>
              <td className='px-1.5 py-2 text-balance'>{selectedSub.title}</td>
              <td className='px-1.5 py-2'>
                <ul>
                  {selectedSub.advantages.map(advantage => (
                    <li className='text-start list-disc' key={advantage}>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </td>
              <td className='px-1.5 py-2'>${selectedSub.price}</td>
            </tr>
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
            clientId: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID,
            components: 'buttons',
            intent: 'capture'
          }}
        >
          <PayPalButtons
            style={{
              color: 'gold',
              layout: 'horizontal',
              label: 'subscribe',
              disableMaxWidth: true
            }}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: (selectedSub.price * 1.1).toFixed(2)
                      },
                      description: selectedSub.title
                    }
                  ]
                })
                .then(orderId => {
                  return orderId
                })
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture()
              if (order.status === 'COMPLETED') {
                await updateSubscription(userId, selectedSub.level)
              }
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

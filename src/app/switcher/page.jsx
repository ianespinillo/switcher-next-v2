import React from 'react'
import { SubsCard } from '@/components/cards/card'
import { subs } from '@/Data/subscriptions'

export default async function Switcher_subs () {
  
  return (
    <div className='flex flex-wrap justify-center items-center min-h-[calc(100vh-62px)] h-full w-full gap-4'>
      {subs.map((sub, i) => (
        <SubsCard
          key={i}
          title={sub.title}
          price={sub.price}
          advantages={sub.advantages}
          buttonLabel={sub.buttonLabel}
          redirectUrl={sub.redirectUrl}
        />
      ))}
    </div>
  )
}

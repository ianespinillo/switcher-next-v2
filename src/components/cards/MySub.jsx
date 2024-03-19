import React from 'react'
import { subs } from '../../Data/subscriptions'
import { getSub } from '../../lib/userActions'
import { SubsCard } from '../cards/card'
import moment from 'moment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
export const MySub = async () => {
  const {user} = await getServerSession(authOptions)
  const { expire_Date, level: subscribeLevel } = await getSub(user.id)
  const mySub = subs.find(sub => subscribeLevel === sub.level)
  return (
    <div className='absolute sm:left-[20%] flex items-center flex-col gap-4 p-3 mt-24 sm:mt-0 '>
      <div className='flex flex-col bg-qatar-gold rounded-md p-5 w-fit gap-3'>
        <h1 className='qatar text-qatar-purple text-2xl pl-3'>
          Subscription Details
        </h1>
        <div className='flex flex-col gap-2 text-qatar-purple qatar text-lg'>
          <span>
            Current plan: <span>{mySub.title}</span>
          </span>
          <span>
            Payed Amount: <span>${mySub.price}</span>
          </span>
          <span>
            Expire Date:{' '}
            <span>
              {expire_Date ? moment(expire_Date).format('DD/MM/YYYY') : 'N/A'}
            </span>
          </span>
        </div>
      </div>
      <div>
        <h1 className='text-qatar-gold text-4xl qatar pl-4 py-2'>
          Upgrade sub
        </h1>

        <div className='flex flex-col gap-8 md:gap-3 scale-90 items-center justify-center md:flex-row md:flex-wrap'>
          {subs.map((sub, i) => (
            <SubsCard
              className={`shadow-md shadow-qatar-gold ${
                i === 2 && 'scale-110 m-5 md:mx-4'
              }`}
              redirectUrl={sub.redirectUrl}
              sub={sub}
              buttonLabel={sub.buttonLabel}
              title={sub.title}
              price={sub.price}
              advantages={sub.advantages}
              key={i}
              myLevel={sub.level === subscribeLevel}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

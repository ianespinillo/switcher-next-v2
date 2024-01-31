import { authOptions } from '@/lib/authoptions'
import prisma from '@/lib/db'
import { getMyProducts } from '@/lib/productActions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page () {
  const { user } = await getServerSession(authOptions)

  const {prods} = await getMyProducts(user.email)

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-3 gap-5'>
        {prods &&
          prods.map(product => (
            <div className='flex flex-col bg-qatar-gold p-5 rounded-xl'>
              <img src={product.preview_url} alt='' className='w-[300px] ' />
              <p className='text-qatar-purple qatar text-xl py-3 flex gap-3'>
                {product.name}
                <img src={product.logo_url} className='h-[22px]' alt='' />
              </p>
              <div className='flex justify-between'>
                <a className='bg-blue-600 text-white text-sm font-bold text-center p-2 cursor-pointer rounded-md'>
                  Download .BIG
                </a>
                <a className='bg-red-600 text-white text-sm font-bold text-center p-2 cursor-pointer rounded-md align-middle'>
                  Download .FIFAMOD
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

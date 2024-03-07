import { authOptions } from '@/lib/authoptions'
import Link from 'next/link';
import { getMyProducts } from '@/lib/productActions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page () {
  const { user } = await getServerSession(authOptions)

  const { prods } = await getMyProducts(user.email)

  return (
    <div className='flex justify-center items-center w-full min-h-[calc(100vh-62px)]'>
      {prods.length > 0 ? (
        prods.map(product => (
          <div className='grid grid-cols-3 gap-5'>
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
          </div>
        ))
      ) : (
        <div className='flex justify-center items-center flex-col gap-2'>
          <p className='text-qatar-gold qatar text-4xl'>No products found</p>
          <Link href='/'>
            <p className='text-qatar-purple bg-qatar-gold p-3 rounded-lg cursor-pointer qatar text-4xl'>Go to home</p>
          </Link>
        </div>
      )}
    </div>
  )
}

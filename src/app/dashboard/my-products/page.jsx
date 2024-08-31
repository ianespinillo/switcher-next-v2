import { authOptions } from '@/lib/authoptions'
import Link from 'next/link'
import { getMyProducts, productsBuyed } from '@/lib/productActions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page_ () {
  const { user } = await getServerSession(authOptions)

  const prods = await productsBuyed(user.email)
  console.log(prods)

  return (
    <div className='sm:absolute sm:left-[20%] w-full flex justify-center items-center sm:w-4/5 flex-wrap min-h-[calc(100vh-62px)] gap-5'>
      {prods.length > 0 ? (
        prods.map(({ Payement_detail }) => {
          const { product } = Payement_detail[0]
          return (
            <div className='flex flex-col bg-qatar-gold p-5 rounded-xl max-w-[300px] sm:max-w-[400px]'>
              <img src={product.preview_url} alt='' className='w-96' />
              <p className='text-qatar-purple qatar text-xl py-3 flex gap-3'>
                {product.name}
                <img src={product.logo_url} className='h-[22px]' alt='' />
              </p>
              <div className='flex justify-between'>
                <a
                  className={`bg-blue-600 text-white text-sm font-bold text-center p-2 cursor-pointer rounded-md ${
                    !product.big_url && 'cursor-not-allowed'
                  }`}
                  href={product.big_url}
                  download={product.name}
                >
                  {product.big_url ? 'Download .BIG' : 'No available'}
                </a>
                <a
                  className={`bg-red-600 text-white text-sm font-bold text-center p-2 cursor-pointer rounded-md align-middle ${
                    !product.fifaproject_url ? 'cursor-not-allowed' : ''
                  }`}
                  href={product.fifaproject_url}
                  download={product.name}
                >
                  {product.fifaproject_url
                    ? 'Download .FIFAPROJECT'
                    : 'Not available'}
                </a>
              </div>
            </div>
          )
        })
      ) : (
        <div className='flex justify-center items-center flex-col gap-2'>
          <p className='text-qatar-gold qatar text-4xl'>No products found</p>
          <Link href='/'>
            <p className='text-qatar-purple bg-qatar-gold p-3 rounded-lg cursor-pointer qatar text-4xl'>
              Go to home
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

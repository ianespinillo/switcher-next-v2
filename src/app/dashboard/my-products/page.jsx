import { authOptions } from '@/lib/authoptions'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page () {
  const { user } = await getServerSession(authOptions)
  const myProducts = await getMyProducts(user.email)
  console.log(myProducts)
  async function getMyProducts (email) {
    const userPayments = await prisma.payement.findFirst({
      where: {
        user_email: email
      }
    })
    const payementDetails = await prisma.payement_detail.findMany({
      where: {
        payementId: userPayments.id
      }
    })
    const products = []
    await Promise.all(
      payementDetails.map(async ({ productId }) => {
        const product = await prisma.product.findFirst({
          where: {
            id: productId
          }
        })
        products.push(product)
      })
    )
    return products
  }
  return (
    <div className='flex justify-center'>
      <h1>My Products</h1>
      {myProducts &&
        myProducts.map(product => (
          <div className='flex flex-col bg-qatar-gold p-5 rounded-xl'>
            <img
              src={product.preview_url}
              alt=''
              className='w-[300px] '
            />
            <p className='text-qatar-purple qatar text-xl py-3'>
              {product.name}
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
  )
}

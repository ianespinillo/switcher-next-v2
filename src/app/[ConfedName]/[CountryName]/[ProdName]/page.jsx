import Link from 'next/link'
import React from 'react'
import styles from '@/Styles/Product.module.css'
import AddButton from '@/components/UI/AddButton'
import { filterProduct, productIsBuyed } from '@/lib/productActions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
import { FaTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { IoLogoDiscord } from 'react-icons/io5'

export default async function Page ({ params: { ProdName } }) {
  const name = ProdName.split('%20').join(' ')
  const product = await filterProduct(name)
  const session = await getServerSession(authOptions)
  const prodIsBuyed = session
    ? await productIsBuyed(product.id, session.user.email)
    : false

  return (
    <section className='w-full min-h-[calc(100vh-62px)] flex justify-center items-center'>
      <div className='flex justify-center items-center md:bg-blue-gray-200 p-5 w-full mt-[56px]'>
        <div className='flex flex-col sm:flex-row border-2 border-black rounded-xl p-7 bg-blue-gray-200'>
          <div className='flex flex-col gap-2'>
            <img src={product.preview_url} className='w-[500px] border-2 border-black rounded-xl' alt='Product preview' />
            <p className='qatar text-xl'>{product.description}</p>
          </div>
          <div className='flex flex-col gap-5 sm:px-4 sm:gap-10'>
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between sm:justify-normal sm:gap-7 items-center'>
                <h1 className='qatar align-middle'>{product.name}</h1>
                <img src={product.logo_url} className='w-20' alt='Product logo' />
              </div>
              <span className='qatar text-lg'>
                Price: ${parseFloat(product.price)}
              </span>
            </div>
            <AddButton prod={product} isBuyed={prodIsBuyed} />
            <div className='flex w-full justify-between'>
              <Link href='https://twitter.com/EspinilloIan'>
                <FaTwitter color='#1DA1F2' size={45} />
              </Link>
              <Link href='https://discord.gg/V9dWE97UZp'>
                <IoLogoDiscord color='#7289DA' size={45} />
              </Link>
              <Link href='/contact'>
                <BiLogoGmail color='#db4437' size={45} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const generateMetadata = async ({ params: { ProdName } }) => {
  const nameSplit = ProdName.split('%20').join(' ')
  const { name, logo_url } = await filterProduct(nameSplit)
  return {
    title: name,
    icons: {
      icon: logo_url
    }
  }
}

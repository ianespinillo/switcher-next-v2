'use client'

import React, { useState } from 'react'
import { CreditCardIcon, UsersIcon } from '@/components/icons/Icons'

import Link from 'next/link'
import { LuPackage } from 'react-icons/lu'
import { MdOutlineLogout } from 'react-icons/md'
import { PiShoppingBagFill } from 'react-icons/pi'
import { MdUnsubscribe } from 'react-icons/md'
import { ThemeProvider, Tooltip } from '@material-tailwind/react'

export const DashboardSidebar = () => {
  return (
    <ThemeProvider>
      <div className='md:h-full w-full md:w-1/6 fixed top-0 bg-qatar-purple/50 backdrop-blur-sm z-30 sm:bg-transparent'>
        <nav className='flex md:grid w-full items-center md:items-start text-4xl md:text-sm font-medium h-full sm:z-10'>
          <div className='flex ml-[10%] w-full justify-center p-3 sm:hidden'>
            <Tooltip
              content='My Products'
              className='text-qatar-purple bg-qatar-gold qatar'
            >
              <Link
                className='flex items-center gap-3 rounded-lg bg-transparent px-3 py-2 text-qatar-gold '
                href='/dashboard/my-products'
                title='My Products'
              >
                <LuPackage />
              </Link>
            </Tooltip>
            {/* Profile */}
            <Tooltip
              content='Profile'
              className='text-qatar-purple bg-qatar-gold qatar'
            >
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold'
                href='/dashboard/profile'
              >
                <UsersIcon />
              </Link>
            </Tooltip>
            <Tooltip
              content='My Orders'
              className='text-qatar-purple bg-qatar-gold qatar'
            >
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold'
                href='/dashboard/orders'
              >
                <PiShoppingBagFill />
              </Link>
            </Tooltip>
            <Tooltip
              content='My subscription'
              className='text-qatar-purple bg-qatar-gold qatar'
            >
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold pb-0.5'
                href='/dashboard/my-subscription'
              >
                <MdUnsubscribe />
              </Link>
            </Tooltip>
            {/* Return to Home */}
            <Tooltip
              content='Back to home'
              className='text-qatar-purple bg-qatar-gold qatar'
            >
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold '
                href='/'
              >
                <MdOutlineLogout />
              </Link>
            </Tooltip>
          </div>
          {/* My Products */}
          <div className='hidden sm:block p-5 pt-7 text-lg'>
            <Link
              className='flex items-center gap-3 rounded-lg bg-transparent px-3 py-2 text-qatar-gold  transition-all hover:scale-110'
              href='/dashboard/my-products'
            >
              <LuPackage className='h-6 w-6' />
              My Products
            </Link>
            {/* Profile */}
            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold transition-all hover:scale-110'
              href='/dashboard/profile'
            >
              <UsersIcon className='h-6 w-6' />
              Profile
            </Link>
            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold transition-all hover:scale-110'
              href='/dashboard/orders'
            >
              <PiShoppingBagFill className='h-6 w-6' />
              My Orders
            </Link>
            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold transition-all hover:scale-110'
              href='/dashboard/my-subscription'
            >
              <MdUnsubscribe className='h-6 w-6' />
              My Subscription
            </Link>
            {/* Return to Home */}
            <div className='fixed bottom-0 p-5 flex flex-row justify-center items-center gap-4 qatar text-qatar-gold cursor-pointer'>
              <MdOutlineLogout />
              <Link href='/'>Return to Home</Link>
            </div>
          </div>
        </nav>
      </div>
    </ThemeProvider>
  )
}

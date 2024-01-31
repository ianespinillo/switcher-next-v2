/**
 * Render the sidebar component for the dashboard navigation.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child elements.
 * @returns {ReactNode} - The rendered sidebar component.
 */

import { CreditCardIcon, UsersIcon } from '@/components/icons/Icons'
import Link from 'next/link'
import { LuPackage } from 'react-icons/lu'
import { MdOutlineLogout } from 'react-icons/md'
import { PiShoppingBagFill } from "react-icons/pi";
export default function Sidebar ({ children }) {
  return (
    <>
      {/* Navigation */}
      <div className='h-full w-1/6'>
        <nav className='grid items-start px-4 text-sm font-medium h-full z-10'>
          {/* My Products */}
          <Link
            className='flex items-center gap-3 rounded-lg bg-transparent px-3 py-2 text-qatar-gold  transition-all hover:text-base'
            href='/dashboard/my-products'
          >
            <LuPackage className='h-4 w-4' />
            My Products
          </Link>
          {/* Profile */}
          <Link
            className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold transition-all hover:text-base'
            href='/dashboard/profile'
          >
            <UsersIcon className='h-4 w-4' />
            Profile
          </Link>
          <Link
            className='flex items-center gap-3 rounded-lg px-3 py-2 text-qatar-gold transition-all hover:text-base'
            href='/dashboard/orders'
          >
            <PiShoppingBagFill className='h-4 w-4' />
            My Orders
          </Link>
        </nav>
        {/* Return to Home */}
        <div className='fixed bottom-0 p-5 flex flex-row justify-center items-center gap-4 qatar text-qatar-gold cursor-pointer'>
          <MdOutlineLogout />
          <Link href='/'>Return to Home</Link>
        </div>
      </div>
      {/* Child Elements */}
      {children}
    </>
  )
}

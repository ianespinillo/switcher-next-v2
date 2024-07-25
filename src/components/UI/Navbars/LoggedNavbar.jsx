'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Modal from 'react-modal'
import { signOut, useSession } from 'next-auth/react'

import { IoPersonCircle, IoTrashBin, IoTrashBinSharp } from 'react-icons/io5'
import { IoIosArrowDown, IoIosCloseCircle, IoMdMenu } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { LuShoppingCart } from 'react-icons/lu'

import { modalStyles } from '@/lib/custom-styles'
import { cartStore } from '@/store/cartstore'

import { usePathname, useRouter } from 'next/navigation'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

export const LoggedNavbar = () => {
  Modal.setAppElement('#__next')
  const router = useRouter()
  const path = usePathname().split('/')
  const confed = path[1]

  const { data: session } = useSession()
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  const [cartSize, deleteItem, cart, total, resetCart] = cartStore(state => [
    state.cartSize,
    state.deleteItem,
    state.cart,
    state.total,
    state.resetCart
  ])

  function handleDelete (prod) {
    deleteItem(prod)
  }
  function closeModal () {
    setModalIsOpen(false)
  }
  const handleClick = () => {
    setIsToggle(!isToggle)
  }
  return (
    <nav id='navBar'>
      <div
        className={`z-50 w-full h-full min-h-screen  fixed backdrop-blur-lg transition-transform ease-in duration-300 ${
          isToggle ? 'translate-x-0' : '-translate-x-full'
        }
        ${
          path.length < 3 && confed === 'AFC'
            ? 'bg-[#00328d]/70'
            : path.length < 3 && confed == 'CONMEBOL'
            ? 'bg-[#003874]/70'
            : path.length < 3 && confed == 'CAF'
            ? 'bg-[#018839]/70'
            : path.length < 3 && confed == 'CONCACAF'
            ? 'bg-[#c99e53]/70'
            : path.length < 3 && confed == 'OFC'
            ? 'bg-[#0067e5]/70'
            : path.length < 3 && confed == 'UEFA'
            ? 'bg-[#0a30ba]/70'
            : path.length < 3 && confed == 'FIFA'
            ? 'bg-[#003870]/70'
            : 'bg-qatar-purple/70'
        }
        `}
      >
        <div
          className={`px-5 flex justify-between items-center ${
            path.length < 3 && confed == 'AFC'
              ? 'text-white'
              : path.length < 3 && confed == 'CAF'
              ? 'text-[#f3ca0c]'
              : path.length < 3 && confed == 'CONMEBOL'
              ? 'text-[#c99e53]'
              : path.length < 3 && confed == 'OFC'
              ? 'text-white'
              : path.length < 3 && confed == 'UEFA'
              ? 'text-white'
              : path.length < 3 && confed == 'CONCACAF'
              ? 'text-black'
              : path.length < 3 && confed == 'FIFA'
              ? 'text-white'
              : 'text-qatar-gold'
          }`}
        >
          <h3 className='text-3xl qatar p-1.5'>Menú</h3>
          <RxCross1 size={30} className='p-1 ' onClick={handleClick} />
        </div>
        <ul
          className={`flex flex-col items-center gap-2 p-3 qatar 
          ${
            path.length < 3 && confed == 'AFC'
              ? 'text-white'
              : path.length < 3 && confed == 'CAF'
              ? 'text-[#f3ca0c]'
              : path.length < 3 && confed == 'CONMEBOL'
              ? 'text-[#c99e53]'
              : path.length < 3 && confed == 'OFC'
              ? 'text-white'
              : path.length < 3 && confed == 'UEFA'
              ? 'text-white'
              : path.length < 3 && confed == 'CONCACAF'
              ? 'text-black'
              : path.length < 3 && confed == 'FIFA'
              ? 'text-white'
              : 'text-qatar-gold'
          }
          
        `}
        >
          <Link href={'/contact'}>Contact</Link>
          <Link href={'/custom-job'}>Custom Job</Link>
          <Link href={'/switcher'}>Switcher App</Link>
          <Link
            className='flex items-center gap-2'
            href={session.user.role == 'admin' ? '/admin/users' : '/dashboard'}
            onClick={() => setShowSubMenu(false)}
          >
            <IoPersonCircle size={24} /> Dashboard
          </Link>
          <button
            onClick={() => {
              setShowSubMenu(false)
              signOut()
            }}
          >
            Logout
          </button>
        </ul>
      </div>
      <div className='pl-6 flex h-[76px] items-center sm:hidden fixed z-40'>
        <button
          className='bg-transparent text-4xl block md:hidden'
          onClick={handleClick}
        >
          <IoMdMenu />
        </button>
      </div>
      <ul
        className={`qatar hidden sm:flex  gap-5 sm:justify-end sm:p-3 items-center`}
      >
        <Link href={'/contact'}>Contact</Link>
        <Link href={'/custom-job'}>Custom Job</Link>
        <Link href={'/switcher'}>Switcher App</Link>

        <div className='relative flex flex-col items-center rounded-lg'>
          <button
            className='flex items-center gap-1'
            onClick={() => setShowSubMenu(!showSubMenu)}
          >
            <IoPersonCircle size={24} />
            <IoIosArrowDown size={24} />
          </button>
          <div
            className={`absolute  ${
              path.length < 3 && confed == 'AFC'
                ? 'text-white'
                : path.length < 3 && confed == 'CAF'
                ? 'text-[#f3ca0c]'
                : path.length < 3 && confed == 'CONMEBOL'
                ? 'text-[#c99e53]'
                : path.length < 3 && confed == 'OFC'
                ? 'text-white'
                : path.length < 3 && confed == 'UEFA'
                ? 'text-white'
                : path.length < 3 && confed == 'CONCACAF'
                ? 'text-black'
                : path.length < 3 && confed == 'FIFA'
                ? 'text-white'
                : 'text-qatar-gold'
            } 
                ${
                  path.length < 3 && confed === 'AFC'
                    ? 'bg-[#00328d]'
                    : path.length < 3 && confed == 'CONMEBOL'
                    ? 'bg-[#003874]'
                    : path.length < 3 && confed == 'CAF'
                    ? 'bg-[#018839]'
                    : path.length < 3 && confed == 'CONCACAF'
                    ? 'bg-[#c99e53]'
                    : path.length < 3 && confed == 'OFC'
                    ? 'bg-[#0067e5]'
                    : path.length < 3 && confed == 'UEFA'
                    ? 'bg-[#0a30ba]'
                    : path.length < 3 && confed == 'FIFA'
                    ? 'bg-[#003870]'
                    : 'bg-qatar-purple'
                } top-8 p-5 flex flex-col gap-2 rounded-xl transition-transform ease-in duration-300 ${
              showSubMenu ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={{
              transitionProperty: 'transform, opacity',
              transitionDuration: '300ms',
              transformOrigin: 'top center'
            }}
          >
            <Link
              href={
                session.user.role === 'admin' ? '/admin/users/' : '/dashboard'
              }
              onClick={() => setShowSubMenu(false)}
            >
              Dashboard
            </Link>
            <button onClick={() => signOut()}>Logout</button>
          </div>
        </div>
        <div
          className='flex gap-1.5 items-center text-center cursor-pointer'
          onClick={() => setModalIsOpen(true)}
        >
          <LuShoppingCart size={24} />{' '}
          <span className='text-[20px] mt-2'>{cartSize}</span>
        </div>
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel='Example Modal'
        overlayClassName='Overlay'
      >
        <IoIosCloseCircle
          onClick={() => closeModal()}
          className='cursor-pointer fixed right-7'
        />
        <table className='  text-center w-full qatar mt-5'>
          <thead className='bg-qatar-gold text-center text-qatar-purple '>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((prod, i) => (
              <tr
                key={i}
                className='outline-2 outline-qatar-gold text-qatar-gold'
              >
                <td className='items-center flex justify-center'>
                  <img src={prod.logo_url} />
                </td>
                <td>{prod.name}</td>
                <td>${prod.price}</td>
                <td>
                  <IoTrashBin
                    className='cursor-pointer'
                    onClick={() => handleDelete(prod)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td className='bg-qatar-gold text-qatar-purple qatar rounded-lg'>
                Total: ${total}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className='w-full flex justify-center p-3 gap-3'>
          <button
            className='bg-qatar-gold text-qatar-purple qatar rounded-lg flex items-center gap-1.5 p-1.5'
            onClick={() => {
              router.push('/checkout')
              setModalIsOpen(false) //
            }}
          >
            Go to checkout
            <MdOutlineShoppingCartCheckout size={22} />
          </button>
          <button
            className='bg-qatar-gold text-qatar-purple qatar rounded-lg flex items-center gap-1.5 p-1.5'
            onClick={() => {
              resetCart()
              setModalIsOpen(false)
            }}
          >
            Delete All
            <IoTrashBin size={22} />
          </button>
        </div>
      </Modal>
    </nav>
  )
}

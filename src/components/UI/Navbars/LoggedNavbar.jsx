'use client'

import React, { useState } from 'react'
import Modal from 'react-modal'
import { signOut } from 'next-auth/react'

import { IoPersonCircle, IoTrashBin, IoTrashBinSharp } from 'react-icons/io5'
import { IoIosArrowDown, IoIosCloseCircle } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { LuShoppingCart } from 'react-icons/lu'

import { modalStyles } from '@/lib/custom-styles'
import { cartStore } from '@/app/store/cartstore'
import styles from '@/Styles/Navbar.module.css'
import { useRouter } from 'next/navigation'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'

export const LoggedNavbar = () => {
  Modal.setAppElement('#__next')
  const router = useRouter()
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
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
  return (
    <nav className={styles.navBar} id='navBar'>
      <ul className={styles['navbar-ul']}>
        <li onClick={() => router.push('/contact')}>Contact</li>
        <li onClick={() => router.push('/custom-job')}>Custom Job</li>
        <div
          className={styles['icon-container']}
          onMouseEnter={e => setShowSubMenu(true)}
          onMouseLeave={e => setShowSubMenu(false)}
        >
          <IconContext.Provider
            value={{ style: { verticalAlign: 'middle', cursor: 'pointer' } }}
          >
            <IoPersonCircle size={24} />
            <IoIosArrowDown size={24} />
          </IconContext.Provider>
          {showSubMenu && (
            <div className={styles.submenu} id='submenu'>
              <ul>
                <li onClick={() => router.push('/dashboard')}>Dashboard</li>
                <li>
                  <div className={styles.logout} onClick={() => signOut()}>
                    Log out <i className='bi bi-arrow-bar-right'></i>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className={styles['icon-container']}
          onClick={() => setModalIsOpen(true)}
        >
          <LuShoppingCart className={styles.icon} />{' '}
          <span id={styles.cartSize}>{cartSize}</span>
        </div>
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel='Example Modal'
        overlayClassName='Overlay'
      >
        <div className='close' onClick={closeModal}>
          <IoIosCloseCircle />
        </div>
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
            onClick={() =>{ 
              router.push('/checkout')
              setModalIsOpen(false); //
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

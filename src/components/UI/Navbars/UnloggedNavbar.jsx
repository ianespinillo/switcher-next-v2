import React from 'react'
import Link from 'next/link'

import { useContext, useEffect, useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'
import styles from '@/Styles/Navbar.module.css'
import { usePathname } from 'next/navigation'

export const UnloggedNavbar = () => {
  const [isToggle, setIsToggle] = useState(false)
  const path = usePathname().split('/')
  const confed = path[1]
  const handleClick = () => {
    setIsToggle(!isToggle)
  }
  return (
    <nav id='navBar' className='h-[62px]'>
      <div
        className={`z-50 w-full h-full min-h-screen  fixed backdrop-blur-lg transition-transform ease-in duration-300 ${
          isToggle ? 'translate-x-0' : '-translate-x-full'
        }
        ${
          path.length < 3 && confed == 'AFC'
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
          className={`px-5 flex justify-between items-center
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
        }`}
        >
          <h3 className='text-3xl qatar p-1.5'>Menú</h3>
          <RxCross1 size={30} className='p-1 ' onClick={handleClick} />
        </div>
        <ul
          className={`flex flex-col items-center gap-2 p-3  qatar ${
            path.length < 3 && confed == 'AFC'
              ? 'text-white '
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
          <Link href={'/contact'}>Contact</Link>
          <Link href={'/custom-job'}>Custom Job</Link>
          <Link href={'/switcher'}>Switcher App</Link>
          <Link
            href={'/auth/login'}
            className='px-2 py-2 rounded-md outline outline-2'
          >
            Login
          </Link>
          <Link
            href={'/auth/login'}
            className='px-2 py-2 rounded-md outline outline-2'
          >
            Sign up
          </Link>
        </ul>
      </div>
      <div className='pl-6 flex h-[76px] items-center sm:hidden fixed z-40'>
        <button
          className={`bg-transparent text-4xl block md:hidden ${
            path.length < 3 && confed == 'AFC'
              ? 'text-white '
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
          onClick={handleClick}
        >
          <IoMdMenu />
        </button>
      </div>
      <nav className={styles.navBar} id='navBar'>
        <ul className='hidden md:flex justify-end gap-6 p-5 qatar  cursor-pointer'>
          <Link href={'/contact'}>Contact</Link>
          <Link href={'/custom-job'}>Custom Job</Link>
          <Link href={'/switcher'}>Switcher App</Link>
          <Link
            className={`rounded-xl px-4 outline outline-2  hover:bg-transparent duration-300 
          ${
            path.length < 3 && confed == 'AFC'
              ? 'bg-white text-[#00328d] outline-white hover:text-white'
              : path.length < 3 && confed == 'CONMEBOL'
              ? 'bg-qatar-gold text-[#003874] outline-qatar-gold hover:text-qatar-gold'
              : path.length < 3 && confed == 'CAF'
              ? 'bg-[#f3ca0c] text-[#018839] outline-[#f3ca0c] hover:text-[#f3ca0c]'
              : path.length < 3 && confed == 'CONCACAF'
              ? 'text-[#c99e53] bg-black outline-[#c99e53] hover:text-qatar-gold'
              : path.length < 3 && confed == 'OFC'
              ? 'text-[#0067e5] bg-white outline-white hover:text-white'
              : path.length < 3 && confed == 'UEFA'
              ? 'text-[#0a30ba] bg-white outline-white hover:text-white'
              : path.length < 3 && confed == 'FIFA'
              ? 'text-[#003870] bg-white outline-white hover:text-white'
              : 'text-qatar-purple bg-qatar-gold outline-[#c99e53] hover:text-qatar-gold'
          }
      
        `}
            href={'/auth/login'}
          >
            Login
          </Link>
          <Link
            className={`rounded-xl px-4 outline outline-2  hover:bg-transparent duration-300 
              ${
                path.length < 3 && confed == 'AFC'
                  ? 'bg-white text-[#00328d] outline-white hover:text-white'
                  : path.length < 3 && confed == 'CONMEBOL'
                  ? 'bg-qatar-gold text-[#003874] outline-qatar-gold hover:text-qatar-gold'
                  : path.length < 3 && confed == 'CAF'
                  ? 'bg-[#f3ca0c] text-[#018839] outline-[#f3ca0c] hover:text-[#f3ca0c]'
                  : path.length < 3 && confed == 'CONCACAF'
                  ? 'text-[#c99e53] bg-black outline-[#c99e53] hover:text-white'
                  : path.length < 3 && confed == 'OFC'
                  ? 'text-[#0067e5] bg-white outline-white hover:text-white'
                  : path.length < 3 && confed == 'UEFA'
                  ? 'text-[#0a30ba] bg-white outline-white hover:text-white'
                  : path.length < 3 && confed == 'FIFA'
                  ? 'text-[#003870] bg-white outline-white hover:text-white'
                  : 'text-qatar-purple bg-qatar-gold outline-[#c99e53] hover:text-qatar-gold'
              }
          
            `}
            href={'/auth/register'}
          >
            Register
          </Link>
        </ul>
      </nav>
    </nav>
  )
}

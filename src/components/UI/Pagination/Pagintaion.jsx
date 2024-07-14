'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export const Pagination = ({ number, actualPage }) => {
  const router = useRouter()
  const url = usePathname()
  const numbers = []
  const pages = Math.ceil(number / 10)

  for (let i = 1; i <= pages; i++) {
    numbers.push(i)
  }

  return (
    <div className='flex justify-center pb-4 w-full'>
      <div className='flex gap-4 items-center'>
        <button
          className='text-qatar-gold rounded-full p-2'
          onClick={() => router.push(`${url}?page=${1}`)}
        >
          <IoIosArrowBack fill='#c99e53' />
        </button>
        {numbers.length > 2 &&
          numbers.map((n, i) => {
            return (
              <button
                className={
                  'hover:bg-qatar-gold/15 text-qatar-gold flex items-center justify-center text-center h-10 w-10 rounded-full p-2' +
                  `${n === actualPage ? ' bg-qatar-gold/15' : ''}`
                }
                onClick={() => router.push(`${url}?page=${n}`)}
                key={n}
              >
                {n}
              </button>
            )
          })}
        <button
          className='text-qatar-gold rounded-full p-2'
          onClick={() =>
            router.push(`${url}?page=${numbers[numbers.length - 1]}`)
          }
        >
          <IoIosArrowForward fill='#c99e53' />
        </button>
      </div>
    </div>
  )
}

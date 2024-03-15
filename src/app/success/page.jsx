'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page_ () {
  const searchParams = useSearchParams()
  const paramsSplited = searchParams.toString().split('&')
  const router = useRouter()
  return (
    <div className='w-full flex justify-center'>
      <div className='w-8/12 h-full flex justify-center flex-col gap-3 items-center'>
        <h1 className='text-xl text-qatar-gold'>
          Your payement was aproved corectly
        </h1>
        <section className='bg-qatar-gold rounded-md flex p-5 w-[450px] justify-center'>
          <ul>
            {paramsSplited &&
              paramsSplited.map((param, i) => {
                const [llave, valor] = param.split('=')
                return (
                  <li
                    key={i}
                    className='text-qatar-purple qatar flex list-disc'
                  >
                    {llave.at(0).toUpperCase() + llave.slice(1)}:{' '}
                    {valor.includes('+')
                      ? valor.split('+').join(' ')
                      : !isNaN(Number(valor))
                      ? '$ ' + valor
                      : valor}
                  </li>
                )
              })}
          </ul>
        </section>
        <div className='flex gap-2'>
          <button
            className='bg-qatar-gold p-2 qatar rounded-lg text-qatar-purple cursor-pointer'
            onClick={() => router.push('/')}
          >
            Back to home
          </button>
          <button
            className='bg-qatar-gold p-2 qatar rounded-lg text-qatar-purple cursor-pointer'
            onClick={() => router.push('/dashboard')}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

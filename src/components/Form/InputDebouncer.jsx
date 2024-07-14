'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const InputDebouncer = () => {
    const pathname= usePathname()
    const p= useSearchParams().get('page')
    const router= useRouter()
    const debounce= useDebouncedCallback(value => {
        const params= new URLSearchParams()
        params.append('page', p)
        params.append('q', value)
        router.push(`${pathname}?${params.toString()}`)
    }, 750)
  return (
    <input
      type='text'
      placeholder='Search by name...'
      className='ml-4 px-2 py-1 rounded-lg outline outline-2 outline-qatar-gold hover:bg-transparent hover:text-qatar-gold duration-300 bg-transparent focus:outline focus:outline-qatar-gold focus:outline-2 placeholder:text-qatar-gold text-qatar-gold qatar'
      onChange={e => debounce(e.target.value)}
    />
  )
}

'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IoIosAddCircle } from 'react-icons/io'
import { createVersion } from '@/lib/versionActions';
export default function Add_version () {
    const formAction = async (FormData) =>{
        
        await createVersion(FormData)
    }
  const [date, setDate] = useState(Date.now())
  return (
    <div className='absolute left-[20%] w-4/5 flex justify-center items-center h-[calc(100vh-62px)]'>
      <form action={formAction} className='flex flex-col gap-3 w-2/5 items-center justify-center bg-qatar-gold rounded-lg shadow-md shadow-black p-10'>
        <h3 className='qatar text-3xl text-qatar-purple'>
          Create a new version
        </h3>
        <div className='flex flex-col qatar gap-3 text-qatar-purple py-3'>
          <label htmlFor='versionNumber' className='flex flex-col gap-1.5 text-xl'>
            Version number{' '}
            <input
              type='text'
              name='versionNumber'
              id='versionNumber'
              placeholder='Version ex: 1.6'
              className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
            />
          </label>
          <label htmlFor='releaseDate' className='flex flex-col gap-1.5 text-xl'>
            Release date
            <DatePicker selected={date} onSelect={setDate} name='releaseDate' className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline' />
          </label>
        </div>
        <button
          type='submit'
          className='flex items-center align-middle bg-qatar-purple rounded-xl px-4 py-2 w-full text-qatar-gold justify-center gap-2'
        >
          Create <IoIosAddCircle />
        </button>
      </form>
    </div>
  )
}

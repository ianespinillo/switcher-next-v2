import { updatePassword } from '@/lib/userActions'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

export default async function ChangePassword ({ searchParams: { id } }) {
  if (!id) redirect('/auth/login')
  return (
    <div className='flex flex-col items-center pt-10'>
      <h1 className='qatar text-3xl sm:text-5xl text-qatar-gold p-3 pb-5 '>
        Change Password
      </h1>
      <form className='flex flex-col gap-8 w-[350px]' action={updatePassword}>
        <input type='text' name='id' value={id} className='hidden absolute' />
        <label htmlFor='password' className='text-qatar-gold qatar text-xl'>
          Set your new password
        </label>
        <input
          type='password'
          name='password'
          className='input-field bg-transparent outline outline-2 outline-qatar-gold rounded-sm focus:outline focus:outline-2 focus:outline-qatar-gold text-qatar-gold px-2 py-1 qatar'
        />
        <label
          htmlFor='confirmPassword'
          className='text-qatar-gold qatar text-xl'
        >
          Confirm your new password
        </label>
        <input
          type='password'
          name='confirmPassword'
          className='input-field bg-transparent outline outline-2 outline-qatar-gold rounded-sm focus:outline focus:outline-2 focus:outline-qatar-gold text-qatar-gold px-2 py-1 qatar'
        />
        <button
          type='submit'
          className='text-qatar-purple bg-qatar-gold py-2 text-xl qatar rounded-xl cursor-pointer '
        >
          Submit
        </button>
      </form>
    </div>
  )
}

import { subs } from '@/Data/subscriptions'
import { findUserById, updateSubscriptionByAdmin } from '@/lib/userActions'
import React from 'react'
import { IoIosAddCircle } from 'react-icons/io'

export default async function EditUser ({ params }) {
  const user = await findUserById(params.id)
  console.log(user)
  return (
    <div className='absolute left-[20%] w-4/5 flex justify-center items-center h-[calc(100vh-62px)]'>
      <form action={updateSubscriptionByAdmin} className='flex flex-col gap-3 w-2/5 items-center justify-center bg-qatar-gold rounded-lg shadow-md shadow-black p-10'>
      <input type="text" className='hidden' name="id" value={user.id} />
        <h3 className='qatar text-3xl text-qatar-purple'>
          Edit user: {user.email}
        </h3>
        <div className='flex flex-col qatar gap-3 text-qatar-purple'>
          <label htmlFor='sublevel' className='w-full'>
            Subscription level
            <select
              name='subLevel'
              id='sublevel'
              className='bg-qatar-purple text-qatar-gold rounded-xl px-4 py-2 w-full'
            >
              {subs.map(sub => (
                <option key={sub.level} value={sub.level}>
                  {sub.title} - ${sub.price}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="expireDate">
            Expire Date
            <input
              type="date"
              name="expireDate"
              id="expireDate"
              className="bg-qatar-purple text-qatar-gold rounded-xl px-4 py-2 w-full picker"
            />
          </label>
        </div>
        <button
          type='submit'
          className='flex items-center align-middle bg-qatar-purple rounded-xl px-4 py-2 w-full text-qatar-gold justify-center gap-2'
        >
          Update <IoIosAddCircle />
        </button>
      </form>
    </div>
  )
}

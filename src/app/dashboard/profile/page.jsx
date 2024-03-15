import EditProfile from '@/components/Form/EditProfile'
import { authOptions } from '@/lib/authoptions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page_ () {
  const user = await getServerSession(authOptions)
  
  return (
    <div className='w-full pl-5 flex flex-col justify-center'>
      <div className='w-full flex flex-col items-center'>
        <h1 className='qatar text-qatar-gold p-4 text-2xl'>Profile Edit</h1>
        <EditProfile  user={user}/>
      </div>
    </div>
  )
}

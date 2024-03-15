import React from 'react'

import { authOptions } from '@/lib/authoptions'
import { getServerSession } from 'next-auth'

export default async function Page_() {
  const { user } = await getServerSession(authOptions)
  return (
    <div className='ml-44'>
      <div>
        <h1>Welcome {user.name}</h1>
      </div>
    </div>
  )
}

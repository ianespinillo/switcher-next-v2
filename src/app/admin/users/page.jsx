import React from 'react'

import { AdmnTable } from '@/components/Tables/AdmnTable'
import { getUsers } from '../../../lib/userActions'

export default async function Page_ () {
  const data = await getUsers()
  return (
    <div className='absolute left-[20%] w-4/5 pr-5'>
      <AdmnTable
        TABLE_HEAD={['ID', 'Username', 'Email', 'Actions']}
        TABLE_ROWS={data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          
        }))}
        TABLE_LINKS={data.map(user => `/admin/users/edit/${user.id}`)}
        DELETE_ID={data.map(user => ({ id: user.id, type: 'user' }))}
      />
    </div>
  )
}

import React from 'react'
import { redirect } from 'next/navigation'

import { AdmnTable } from '@/components/Tables/AdmnTable'
import { countUsers, getUsers } from '../../../lib/userActions'
import { Pagination } from '@/components/UI/Pagination/Pagintaion'
import { InputDebouncer } from '@/components/Form/InputDebouncer'

export default async function Page_ ({ searchParams }) {
  if (!searchParams.page) redirect('/admin/users?page=1')
  const data = await getUsers(searchParams.page, searchParams.q || '')
  const nUsers = await countUsers()
  return (
    <div className='absolute left-[20%] w-4/5 pr-5 flex flex-col gap-4'>
      <div className='flex justify-end p-4'>
        <InputDebouncer />
      </div>
      <AdmnTable
        TABLE_HEAD={['ID', 'Username', 'Email', 'Actions']}
        TABLE_ROWS={data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email
        }))}
        TABLE_LINKS={data.map(user => `/admin/users/edit/${user.id}`)}
        DELETE_ID={data.map(user => ({ id: user.id, type: 'user' }))}
      />
      <Pagination
        number={Number(nUsers)}
        actualPage={Number(searchParams.page)}
      />
    </div>
  )
}

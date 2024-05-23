
import React from 'react'

import { UsersTable } from '@/components/UI/UsersTable';
import {getUsers} from '../../../lib/userActions';

export default async function Page_() {
  const data = await getUsers()
  return (
    <UsersTable titles={['ID', 'Username', 'Email', 'Actions']} users={data} />
  )
}


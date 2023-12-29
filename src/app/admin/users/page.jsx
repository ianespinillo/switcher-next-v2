'use client'

import { UsersTable } from '@/components/UI/UsersTable';

import React, { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState([])
  useEffect(() =>{
    fetch('/api/users')
      .then(res => res.json())
        .then( data => setData(data.usersList))
  }, []);
  return (
    <UsersTable titles={['ID', 'Username', 'Email', 'Actions']} users={data} />
  )
}


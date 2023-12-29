'use client'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'


export default function page() {
  const {data:session} =useSession()
  {session &&
    JSON.stringify(session, null, 2)
  }
  return <h1>returned</h1>
}

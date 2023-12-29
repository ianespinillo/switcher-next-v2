'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function Provider ({ children }) {
  return (
    <SessionProvider baseUrl={process.env.NEXTAUTH_URL}>
      {children}
    </SessionProvider>
  )
}

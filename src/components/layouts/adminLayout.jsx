import React from 'react'
import { Adminsidebar } from '../UI/Adminsidebar'

export function AdminLayout({children}) {
  return (
    <main>
      <Adminsidebar />
      {children}
    </main>
  )
}

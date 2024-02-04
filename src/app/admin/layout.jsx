import { Adminsidebar } from '@/components/UI/Adminsidebar'
import React from 'react'

export default function Layout ({ children }) {
  return (
    <>
      <Adminsidebar />
      {children}
    </>
  )
}

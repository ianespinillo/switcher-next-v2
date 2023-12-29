import { Adminsidebar } from '@/components/UI/Adminsidebar'
import React from 'react'

export default function layout ({ children }) {
  return (
    <>
      <Adminsidebar />
      {children}
    </>
  )
}

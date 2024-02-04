import React from 'react'
import {ContactUs} from '@/components/Form/ContactUs';
export default function page () {
  return (
    <div className='flex items-center justify-center'>
      <ContactUs />
    </div>
  )
}

export const metadata={
  title:'Contact Us',
  icons:{
    icon:'/Logo_2024.ico'
  }
}
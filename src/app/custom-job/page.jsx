import React from 'react'
import { CustomJob } from '@/components/Form/CustomJob';
export default function page () {
  return (
    <div className='flex flex-col '>
      <div className='ml-5'>
        <h1 className='qatar text-5xl text-qatar-gold p-3 pb-5  '>Custom Job</h1>
        <h2 className='qatar text-3xl text-qatar-gold p-2 pl-4'>What is custom job?</h2>
        <p className='qatar text-xl text-qatar-gold pl-6 max-w-[620px]'>
          Custom job is the way to make requests for specific scoreboards that
          you want to add to your patch, through a form and a price you will
          obtain your personalized scoreboard
        </p>
      </div>
      <div className="flex justify-center">
        <CustomJob />
      </div>
    </div>
  )
}

export const metadata={
  title:'Custom job',
  icons:{
    icon:'/Logo_2024.ico'
  }
}
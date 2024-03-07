import React from 'react'
import { AdmnTable } from '@/components/Tables/AdmnTable';
export default function Switcher() {
  return (
    <div className='absolute left-[20%] w-full max-w-screen-lg flex flex-col gap-4'>
        <h1 className='text-qatar-gold text-3xl qatar'>Switcher App Version Manager</h1>
        <AdmnTable 
            TABLE_HEAD={['ID', 'Version N°', 'Date Release', 'Actions']}
            TABLE_ROWS={[['1', '1.0.0', '2022-01-01'], ['2', '2.0.0', '2022-01-01'], ['3', '3.0.0', '2022-01-01'], ['4', '4.0.0', '2022-01-01']]}
            BUTTONS={['Update', 'Delete']}
        />
        <div className="flex justify-end">
            <button className='text-qatar-purple qatar bg-qatar-gold rounded-md shadow-md shadow-black p-3 hover:scale-105 duration-300' >New Version</button>
        </div>
    </div>  
  )
}

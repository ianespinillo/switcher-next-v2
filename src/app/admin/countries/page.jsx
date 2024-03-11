import React from 'react'
import { AddCountry } from '@/components/Buttons/AddCountry'
import { AdmnTable } from '@/components/Tables/AdmnTable'
import { obtainCountries } from '@/lib/productActions'
export default async function countries_panel () {
  const countries = await obtainCountries()
  return (
    <div className='absolute left-[20%] w-4/5 flex flex-col gap-4'>
      <div className='flex justify-end px-3 py-2'>
        <AddCountry />
      </div>
      <div className='p-3'>
        <AdmnTable
          TABLE_HEAD={['ID', 'Name', 'Logo', 'Actions']}
          TABLE_ROWS={countries.map(country => ({
            id: country.id,
            name: country.name,
            logo: country.country_not_name_img
          }))}
          BUTTONS={['Edit', 'Delete']}
        />
      </div>
    </div>
  )
}

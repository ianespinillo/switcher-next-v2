import React from 'react'
import { AddConfederation } from '../../../components/Buttons/AddConfederation'
import { AdmnTable } from '../../../components/Tables/AdmnTable'
import { obtainConfederations } from '@/lib/productActions'
import Link from 'next/link'
export default async function confederations_panel () {
  const confeds = await obtainConfederations()
  return (
    <div className='absolute left-[20%] w-4/5 flex flex-col gap-4'>
      <div className='flex justify-end px-3 py-2'>
        <AddConfederation />
      </div>
      <div className='p-3'>
        <AdmnTable
          TABLE_HEAD={['ID', 'Name', 'Logo', 'Abreviation', 'Actions']}
          TABLE_ROWS={confeds.map(confed => ({
            id: confed.id,
            name: confed.confed_name,
            logo: confed.img_url,
            alias: confed.confed_3
          }))}
          TABLE_LINKS={confeds.map(
            ({ id }) => `/admin/confederations/edit/${id}`
          )}
          DELETE_ID={confeds.map(({ id }) => ({id, type: 'confederation'}))}
        />
      </div>
    </div>
  )
}

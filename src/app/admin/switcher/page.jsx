import React from 'react'
import Link from 'next/link'
import { AdmnTable } from '@/components/Tables/AdmnTable'
import { getVersions } from '@/lib/versionActions'
import moment from 'moment'
export default async function Switcher () {
  const versions = await getVersions()
  
  return (
    <div className='absolute left-[20%] w-4/5 flex flex-col gap-4'>
      <h1 className='text-qatar-gold text-3xl qatar'>
        Switcher App Version Manager
      </h1>
      <div className='p-3'>
        <AdmnTable
          TABLE_HEAD={['ID', 'Version N°', 'Date Release', 'Actions']}
          TABLE_ROWS={versions.map(version => ({
            id: version.id,
            number: version.version_number,
            date: moment(version.free_release).format('DD/MM/YYYY'),
          }))}
          TABLE_LINKS={versions.map(({ id }) => `/admin/switcher/edit/${id}`)}
          DELETE_ID={versions.map(({ id }) => ({ id, type: 'version' }))}
        />
      </div>
      <div className='flex justify-end px-3 py-2'>
        <Link
          href={'/admin/switcher/new-version'}
          className='text-qatar-purple qatar bg-qatar-gold rounded-md shadow-md shadow-black p-3 hover:scale-105 duration-300'
        >
          New Version
        </Link>
      </div>
    </div>
  )
}

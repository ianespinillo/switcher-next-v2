'use server'

import prisma from './db'
import { z } from 'zod'
import { redirect } from 'next/navigation'

export async function createVersion (formData) {
  console.log(formData.get('releaseDate'))
  const schema = z.object({
    versionNumber: z.string().nonempty(),
    releaseDate: z.string().nonempty()
  })
  const success = schema.safeParse({
    versionNumber: formData.get('versionNumber'),
    releaseDate: formData.get('releaseDate')
  })
  if (success.error) {
    throw new Error('Invalid version number: ' + success.error)
  }
  const { versionNumber, releaseDate } = success.data
  const relDate = new Date(releaseDate)
  await prisma.version.create({
    data: {
      version_number: versionNumber,
      free_release: relDate
    }
  })
  redirect('/admin/switcher')
}


export async function getVersions(){
    return await prisma.version.findMany()
}
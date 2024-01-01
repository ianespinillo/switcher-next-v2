'use server'

import prisma from './db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createConfederation (prevState, formValues) {
  console.log(prevState)
  const schema = z.object({
    ConfedName: z.string().nonempty(),
    ConfedAbrev: z.string().nonempty(),
    Url: z.string().nonempty()
  })
  const data = schema.safeParse({
    ConfedName: formValues.get('ConfedName'),
    ConfedAbrev: formValues.get('ConfedAbrev'),
    Url: formValues.get('Url')
  })

  if (!data.success) {
    return {
      message: 'All felds are required'
    }
  }
  const { ConfedName, ConfedAbrev, Url } = data.data
  const confedExist = await prisma.confederation.findFirst({
    where: {
      name: ConfedName
    }
  })
  if (confedExist) return { message: 'Confederation already exists' }
  await prisma.confederation.create({
    data: {
      img_url: Url,
      confed_name: ConfedName,
      confed_3: ConfedAbrev
    }
  })

  return {
    message: null
  }
}

export async function createCountry (prevState, formData) {
  const schema = z.object({
    confedId: z.string().nonempty(),
    countryName: z.string().nonempty(),
    countryAbrev: z.string().nonempty(),
    imgUrl: z.string().nonempty(),
    imgWithoutName: z.string().nonempty()
  })
  const success = schema.safeParse({
    confedId: formData.get('confedId'),
    countryName: formData.get('countryName'),
    countryAbrev: formData.get('countryAbrev'),
    imgUrl: formData.get('imgUrl'),
    imgWithoutName: formData.get('imgWithoutName')
  })
  if (success.error) {
    return {
      message: 'All fields are required'
    }
  }
  const { confedId, countryName, countryAbrev, imgUrl, imgWithoutName } =
    success.data

  const countryExists = await prisma.country.findFirst({
    where: {
      name: countryName
    }
  })
  if (countryExists) return { message: 'Country already exists' }
  await prisma.country.create({
    data: {
      name: countryName,
      country_3: countryAbrev,
      country_img_url: imgUrl,
      confederation_id: parseInt(confedId),
      country_not_name_img: imgWithoutName
    }
  })
  return { message: null }
}

export async function createCompetition (prevState, formData) {
  console.log(formData)
  const schema = z.object({
    countryId: z.string().nonempty(),
    competitionName: z.string().nonempty(),
    competitionAbrev: z.string().nonempty(),
    logoUrl: z.string().nonempty(),
    previewUrl: z.string().nonempty(),
    price: z.string().nonempty(),
    compType: z.string().nonempty(),
    desc: z.string().nonempty()
  })
  const result = schema.safeParse({
    countryId: formData.get('countryId'),
    competitionName: formData.get('competitionName'),
    competitionAbrev: formData.get('competitionAbrev'),
    logoUrl: formData.get('logoUrl'),
    previewUrl: formData.get('previewUrl'),
    price: formData.get('price'),
    compType: formData.get('compType'),
    desc: formData.get('desc')
  })
  if (result.error) return { message: 'All fields are required' }
  const {
    countryId,
    competitionAbrev,
    competitionName,
    logoUrl,
    previewUrl,
    price,
    compType,
    desc
  } = result.data
  const competitionExist = await prisma.product.findFirst({
    where: {
      name: competitionName
    }
  })
  if (competitionExist) return { message: 'Competition already exists' }
  await prisma.product.create({
    data: {
      description: desc,
      name: competitionName,
      price: parseFloat(price),
      logo_url: logoUrl,
      preview_url: previewUrl,
      type: compType,
      countryId: Number(countryId),
      name_3: competitionAbrev
    }
  })
  revalidatePath('admin/products')
  return {message: null}
}

export async function obtainProducts () {
  const products = await prisma.product.findMany()
  let prodsWithCN = []
  await Promise.all(
    products.map(async prod => {
      const { name } = await prisma.country.findUnique({
        where: {
          id: prod.countryId
        }
      })
      prod.countryName = name
      console.log(name)
      prodsWithCN.push(prod)
    })
  )
  return prodsWithCN
}

export async function obtainConfederations () {
  const confedList = await prisma.confederation.findMany()
  return confedList
}

export async function obtainCountries () {
  const countriesList = await prisma.country.findMany()
  return countriesList
}

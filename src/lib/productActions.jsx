'use server'

import moment from 'moment'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from './db'
import { z } from 'zod'

export async function createConfederation (prevState, formValues, img_url) {
  const schema = z.object({
    ConfedName: z.string().nonempty(),
    ConfedAbrev: z.string().nonempty()
  })
  const data = schema.safeParse({
    ConfedName: formValues.get('ConfedName'),
    ConfedAbrev: formValues.get('ConfedAbrev')
  })

  if (!data.success) {
    return {
      message: 'All felds are required'
    }
  }

  const { ConfedName, ConfedAbrev } = data.data
  const confedExist = await prisma.confederation.findFirst({
    where: {
      confed_name: ConfedName
    }
  })
  if (confedExist) return { message: 'Confederation already exists' }
  await prisma.confederation.create({
    data: {
      img_url: img_url,
      confed_name: ConfedName,
      confed_3: ConfedAbrev
    }
  })

  redirect('/admin/confederations')
}

export async function createCountry (prevState, formData, img_url, no_name_img) {
  const schema = z.object({
    confedId: z.string().nonempty(),
    countryName: z.string().nonempty(),
    countryAbrev: z.string().nonempty()
  })
  const success = schema.safeParse({
    confedId: formData.get('confedId'),
    countryName: formData.get('countryName'),
    countryAbrev: formData.get('countryAbrev')
  })
  if (success.error) {
    return {
      message: 'All fields are required'
    }
  }
  const { confedId, countryName, countryAbrev } = success.data

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
      country_img_url: img_url,
      confederation_id: confedId,
      country_not_name_img: no_name_img
    }
  })
  redirect('/admin/countries')
}

export async function createCompetition (
  prevState,
  formData,
  preview,
  logo,
  big,
  fifaproject
) {
  const schema = z.object({
    countryId: z.string().nonempty(),
    competitionName: z.string().nonempty(),
    competitionAbrev: z.string().nonempty(),
    price: z.string().nonempty(),
    compType: z.string().nonempty(),
    desc: z.string().nonempty(),
    version: z.string()
  })
  const result = schema.safeParse({
    countryId: formData.get('countryId'),
    competitionName: formData.get('competitionName'),
    competitionAbrev: formData.get('competitionAbrev'),
    price: formData.get('price'),
    compType: formData.get('compType'),
    desc: formData.get('desc'),
    version: formData.get('version')
  })
  if (result.error) return { message: 'All fields are required' }

  const {
    countryId,
    competitionAbrev,
    competitionName,
    price,
    compType,
    desc,
    version
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
      logo_url: logo,
      preview_url: preview,
      type: compType,
      countryId: countryId,
      name_3: competitionAbrev,
      big_url: big,
      fifaproject_url: fifaproject,
      versionId: version ? version : null
    }
  })
  redirect('/admin/competitions')
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
      prodsWithCN.push(prod)
    })
  )
  return prodsWithCN
}

export async function obtainConfederations () {
  const confedList = await prisma.confederation.findMany({
    orderBy: {
      confed_3: 'asc'
    }
  })
  return confedList
}

export async function obtainCountries () {
  const countriesList = await prisma.country.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  return countriesList
}

export async function filterByConfed (confed) {
  const confederation = await prisma.confederation.findFirst({
    where: {
      confed_3: confed
    }
  })
  if (confederation) {
    const countries = await prisma.country.findMany({
      where: {
        confederation_id: confederation.id
      },
      orderBy: {
        name: 'asc'
      }
    })

    return countries
  }
}

export async function filterByCountry (country) {
  const countryId = await prisma.country.findFirst({
    where: {
      name: country
    }
  })
  const childrens = await prisma.product.findMany({
    where: {
      countryId: countryId.id
    }
  })
  return { countryId, childrens }
}

export async function filterProduct (name) {
  const product = await prisma.product.findFirst({
    where: {
      name: name
    }
  })
  return product || {}
}

export async function filterProductById (id) {
  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id)
    }
  })
  return product || {}
}

export async function getConfed (confedName) {
  return await prisma.confederation.findFirst({
    where: {
      confed_3: confedName
    }
  })
}

export async function getMyProducts (email) {
  const userPayments = await prisma.payement.findMany({
    where: {
      user_email: email
    },
    select: {
      id: true,
      amount: true,
      date: true,
      Payement_detail: {
        select: {
          product: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  userPayments.map(payement => {
    payement.products = payement.Payement_detail.map(
      detail => detail.product.name
    )
    delete payement.Payement_detail
    payement.date = moment(payement.date).format('DD/MM/YYYY')
  })
  return userPayments
}

export async function productsBuyed (email) {
  const userPayments = await prisma.payement.findMany({
    where: {
      user_email: email
    },
    select: {
      Payement_detail: {
        select: {
          product: true
        }
      }
    }
  })
  return userPayments
}

export async function productIsBuyed (prodId, user_email) {
  const payementDetails = await prisma.payement
    .findMany({
      where: {
        user_email
      }
    })
    .then(payments => {
      const paymentIds = payments.map(payment => payment.id)
      return prisma.payement_detail.findMany({
        where: {
          payementId: {
            in: paymentIds
          }
        }
      })
    })

  return payementDetails.some(detail => detail.productId === prodId)
}

export async function updateProduct (
  prevState,
  formData,
  preview,
  logo,
  big,
  fifaproject,
  id
) {
  const schema = z.object({
    countryId: z.string().nonempty(),
    competitionName: z.string().nonempty(),
    competitionAbrev: z.string().nonempty(),
    price: z.string().nonempty(),
    compType: z.string().nonempty(),
    desc: z.string().nonempty(),
    version: z.string().nonempty()
  })
  const result = schema.safeParse({
    countryId: formData.get('countryId'),
    competitionName: formData.get('competitionName'),
    competitionAbrev: formData.get('competitionAbrev'),
    price: formData.get('price'),
    compType: formData.get('compType'),
    desc: formData.get('desc'),
    version: formData.get('version')
  })
  if (result.error) return { message: 'All fields are required' }
  const {
    countryId,
    competitionAbrev,
    competitionName,
    price,
    compType,
    desc,
    version
  } = result.data
  const competition = await prisma.product.findFirst({
    where: {
      id: id
    }
  })
  if (!competition) {
    return { message: 'Competition not found' }
  }
  await prisma.product.update({
    where: {
      id: id
    },
    data: {
      description: desc,
      name: competitionName,
      price: parseFloat(price),
      logo_url: logo,
      preview_url: preview,
      type: compType,
      countryId: countryId,
      name_3: competitionAbrev,
      big_url: big,
      fifaproject_url: fifaproject,
      versionId: version
    }
  })
  redirect('/admin/competitions')
}

export async function getPayments () {
  //recuperar todos los pagos y retornar un array con objetos tipo [{user_email, amount, state, products_name}]
  //del pago extaer el amount, email, y estado
  const pagos = await prisma.payement.findMany({
    select: {
      user_email: true,
      amount: true,
      state: true,
      id: true
    }
  })
  const paymetsIds = pagos.map(pago => pago.id)
  const paymetsDetails = await prisma.payement_detail.findMany({
    where: {
      payementId: {
        in: paymetsIds
      }
    }
  })
  const productsIds = paymetsDetails.map(detail => detail.productId)
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds
      }
    }
  })
  // Crear un array con objetos tipo [{user_email, amount, state, products_name}]
  const payments = pagos.map(pago => {
    const details = paymetsDetails.filter(
      detail => detail.payementId === pago.id
    )
    const productsNames = details.map(detail => {
      const product = products.find(prod => prod.id === detail.productId)
      return product.name
    })
    return {
      user_email: pago.user_email,
      amount: pago.amount,
      state: pago.state,
      products: productsNames
    }
  })

  return payments
}

export const getConfedById = async id => {
  return await prisma.confederation.findFirst({
    where: {
      id: id
    }
  })
}

export const deleteById = async (id, type) => {
  switch (type) {
    case 'confederation':
      await prisma.confederation.delete({
        where: {
          id
        }
      })
      revalidatePath('/admin/confederations')
      break
    case 'country':
      try {
        await prisma.country.delete({
          where: {
            id: id
          }
        })('Successfully deleted')
      } catch (error) {
        console.error('Error deleting country', error)
      }
      revalidatePath('/admin/countries')
      break
    case 'competition':
      await prisma.product.delete({
        where: {
          id: id
        }
      })
      revalidatePath('/admin/competitions')
      break
    case 'version':
      await prisma.version.delete({
        where: {
          id: id
        }
      })
      revalidatePath('/admin/switcher')
      break
    default:
      break
  }
}

export const updateConfederation = async (
  prevState,
  formData,
  confedId,
  url
) => {
  const schema = z.object({
    ConfedName: z.string().nonempty(),
    ConfedAbrev: z.string().nonempty(),
    Url: z.string().nonempty().url()
  })
  const result = schema.safeParse({
    ConfedName: formData.get('ConfedName'),
    ConfedAbrev: formData.get('ConfedAbrev'),
    Url: url
  })
  if (result.error) return { message: 'All fields are required' }
  await prisma.confederation.update({
    where: {
      id: Number(confedId)
    },
    data: {
      confed_name: result.data.ConfedName,
      confed_3: result.data.ConfedAbrev,
      img_url: result.data.Url
    }
  })
  redirect('/admin/confederations')
}

export const updateCountry = async (
  prevState,
  formData,
  countryId,
  notNameUrl,
  imgUrl
) => {
  const schema = z.object({
    confedId: z.string().nonempty(),
    countryName: z.string().nonempty(),
    countryAbrev: z.string().nonempty()
  })
  const success = schema.safeParse({
    confedId: formData.get('confedId'),
    countryName: formData.get('countryName'),
    countryAbrev: formData.get('countryAbrev')
  })
  if (success.error) {
    return {
      message: 'All fields are required'
    }
  }
  const { confedId, countryName, countryAbrev } = success.data

  await prisma.country.update({
    where: {
      id: Number(countryId)
    },
    data: {
      name: countryName,
      country_3: countryAbrev,
      country_img_url: imgUrl,
      confederation_id: parseInt(confedId),
      country_not_name_img: notNameUrl
    }
  })
  redirect('/admin/countries')
}

export const getCountryById = async id =>
  await prisma.country.findFirst({ where: { id: id } })

export const getCompetitionById = async id =>
  await prisma.product.findFirst({ where: { id: id } })

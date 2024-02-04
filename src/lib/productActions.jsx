'use server'

import { PrismaClient } from '@prisma/client'
//import prisma from './db'
import { revalidatePath } from 'next/cache'
//import prisma from './db'
import { z } from 'zod'
const prisma = new PrismaClient()

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

  return {
    message: null
  }
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
      confederation_id: parseInt(confedId),
      country_not_name_img: no_name_img
    }
  })
  return { message: null }
}

export async function createCompetition (
  prevState,
  formData,
  preview,
  logo,
  big,
  fifaproject
) {
  console.log(formData)
  const schema = z.object({
    countryId: z.string().nonempty(),
    competitionName: z.string().nonempty(),
    competitionAbrev: z.string().nonempty(),
    price: z.string().nonempty(),
    compType: z.string().nonempty(),
    desc: z.string().nonempty()
  })
  const result = schema.safeParse({
    countryId: formData.get('countryId'),
    competitionName: formData.get('competitionName'),
    competitionAbrev: formData.get('competitionAbrev'),
    price: formData.get('price'),
    compType: formData.get('compType'),
    desc: formData.get('desc')
  })
  if (result.error) return { message: 'All fields are required' }
  const {
    countryId,
    competitionAbrev,
    competitionName,
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
      logo_url: logo,
      preview_url: preview,
      type: compType,
      countryId: Number(countryId),
      name_3: competitionAbrev,
      big_url: big,
      fifaproject_url: fifaproject
    }
  })
  revalidatePath('admin/products')
  return { message: null }
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
  const confedList = await prisma.confederation.findMany()
  // ordenar alfabeticamente por confederacion
  confedList.sort((a, b) => (a.confed_3 > b.confed_3 ? 1 : -1))
  return confedList
}

export async function obtainCountries () {
  const countriesList = await prisma.country.findMany()
  countriesList.sort((a, b) => (a.name > b.name ? 1 : -1))
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
      }
    })
    countries.sort((a, b) => (a.name > b.name ? 1 : -1))
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
      method: true
    }
  })
  if (!userPayments) return null
  const paymentIds = userPayments.map(payment => payment.id)
  const payementDetails = await prisma.payement_detail.findMany({
    where: {
      payementId: {
        in: paymentIds
      }
    },
    select: {
      productId: true,
      payementId: true
    }
  })
  if (!payementDetails) return null
  const productIds = payementDetails.map(detail => detail.productId)
  const uniqueProductIds = [...new Set(productIds)]
  const prods = await prisma.product.findMany({
    where: {
      id: {
        in: uniqueProductIds
      }
    }
  })
  return {
    prods,
    userPayments,
    payementDetails
  }
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
    desc: z.string().nonempty()
  })
  const result = schema.safeParse({
    countryId: formData.get('countryId'),
    competitionName: formData.get('competitionName'),
    competitionAbrev: formData.get('competitionAbrev'),
    price: formData.get('price'),
    compType: formData.get('compType'),
    desc: formData.get('desc')
  })
  if (result.error) return { message: 'All fields are required' }
  const {
    countryId,
    competitionAbrev,
    competitionName,
    price,
    compType,
    desc
  } = result.data
  const competition = await prisma.product.findFirst({
    where: {}
  })
  await prisma.product.update({
    where: {
      id
    },
    data: {
      description: desc,
      name: competitionName,
      price: parseFloat(price),
      logo_url: logo,
      preview_url: preview,
      type: compType,
      countryId: Number(countryId),
      name_3: competitionAbrev,
      big_url: big,
      fifaproject_url: fifaproject
    }
  })
  revalidatePath('admin/products')
  return { message: null }
}

export async function getPayments () {
  //recuperar todos los pagos y retornar un array con objetos tipo [{user_email, amount, state, products_name}]
  //del pago extaer el amount, email, y estado
  const pagos = await prisma.payement.findMany({
    select:{
      user_email: true,
      amount: true,
      state: true,
      id: true,
    }
  })
  const paymetsIds = pagos.map(pago=>pago.id)
  const paymetsDetails = await prisma.payement_detail.findMany({
    where:{
      payementId:{
        in: paymetsIds
      }
    }
  })
  const productsIds = paymetsDetails.map(detail=>detail.productId)
  const products = await prisma.product.findMany({
    where:{
      id:{
        in: productsIds
      }
    }
  })
  // Crear un array con objetos tipo [{user_email, amount, state, products_name}]
  const payments = pagos.map(pago => {
    const details = paymetsDetails.filter(detail => detail.payementId === pago.id);
    const productsNames = details.map(detail => {
      const product = products.find(prod => prod.id === detail.productId);
      return product.name;
    });
    return {
      user_email: pago.user_email,
      amount: pago.amount,
      state: pago.state,
      products: productsNames
    };
  });
  
  return payments
}

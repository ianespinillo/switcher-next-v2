'use server'

import prisma from './db'
import {revalidatePath} from 'next/cache';

export async function createConfederation (formValues) {
  const formData = {
    Url: formValues.get('Url'),
    ConfedAbrev: formValues.get('ConfedName'),
    ConfedName: formValues.get('ConfedAbrev')
  }
  const { Url, ConfedAbrev, ConfedName } = formData
  const newConfed = await prisma.confederation.create({
    data: {
      img_url: Url,
      confed_3: ConfedAbrev,
      confed_name: ConfedName
    }
})
    if (newConfed){
        revalidatePath('/admin/products')
    }
}

export async function createCountry(formData){
    console.log(formData)
}


export async function obtainProducts(){
    const products = await prisma.product.findMany();
    let prodsWithCN=[]
    await Promise.all(products.map(async prod=>{
        const {name} = await prisma.country.findUnique({
            where: {
                id: prod.countryId
            }
        })
        prod.countryName= name
        console.log(name)
        prodsWithCN.push(prod)
    }))
    return prodsWithCN
}

export async function obtainConfederations(){
    const confedList = await prisma.confederation.findMany();
    return confedList
}
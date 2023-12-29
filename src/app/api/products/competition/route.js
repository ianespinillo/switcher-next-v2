import prisma from '@/lib/db'
import {NextResponse} from 'next/server'

/* export default async function handler (req, res) {
  if (req.method === 'GET') {
    
  } else if (req.method === 'POST') {
    const {
      competitionName,
      competitionAbrev,
      countryId,
      logoUrl,
      previewUrl,
      price,
      compType,
      desc
    } = req.json()
    try {
      const newCompetition = await prisma.product.create({
        data: {
          description: desc,
          name: competitionName,
          price: parseFloat(price),
          logo_url: logoUrl,
          preview_url: previewUrl,
          type: compType,
          countryId: countryId,
          name_3: competitionAbrev
        }
      })
      if (newCompetition) {
        res.status(200).json({
          ok: true,
          new_Competition: newCompetition
        })
      }
    } catch (error) {
      console.error(error)
    }
  } else if (req.method == 'PUT') {
    const {
      competitionName,
      competitionAbrev,
      countryId,
      logoUrl,
      previewUrl,
      price,
      compType,
      desc
    } = req.json()
    
    const productUpdate = await prisma.product.update({
      data: {
        description: desc,
        name: competitionName,
        price: parseInt(price),
        logo_url: logoUrl,
        preview_url: previewUrl,
        type: compType,
        countryId: countryId,
        name_3: competitionAbrev
      }
    })
    if(productUpdate){
      return res.status(200).json({
        ok: true,
        msg: "Product Updated"
      })
    }
  }else if ( req.method == "DELETE" ){
    const id = req.json()
    try {
      await prisma.product.delete({
        where:{
          id: parseInt(id),
        }
      })
      res.status(200).json({
        ok: true,
        msg: "Product Deleted"
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: "An exception was occured while deleting the product"
      })
    }
  }
} */

export async function GET(){
  const productList = await prisma.product.findMany()
    if (productList) {
      const newProds = []
      await Promise.all(
        productList.map(async product => {
          const countryName = await prisma.country.findUnique({
            where: {
              id: product.countryId
            }
          })
          product.countryName = countryName.name
          newProds.push(product)
        })
      )

      return NextResponse.json({
        products: newProds
      })
    }
}
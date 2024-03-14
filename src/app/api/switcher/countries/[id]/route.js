import { NextResponse } from 'next/server'
import { verifyToken } from '../../../../../middlewares/JWT'
import { headers } from 'next/headers'
export async function POST (req, res) {
  const token = headers().get('x-token')
  try {
    await verifyToken(token)
    const id= req.id
    const competitions = await prisma.product.findMany({
      where: {
        countryId: id
      },
      orderBy:{
        name: 'asc'
      },
      select:{
        id: true,
        name: true,
        logo_url: true
      }
    })
    return NextResponse.json({ ok: true, competitions }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      {
        ok: false,
        msg: 'Unauthorized, please login'
      },
      {
        status: 401
      }
    )
  }
}

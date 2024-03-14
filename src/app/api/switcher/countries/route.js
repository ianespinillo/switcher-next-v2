import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { verifyToken } from '../../../../middlewares/JWT'
import prisma from '@/lib/db'
export async function POST (req, res) {
  const token = headers().get('x-token')
  try {
    await verifyToken(token)
    const countries = await prisma.country.findMany({
      orderBy: {
        country_3: 'asc'
      },
      select: {
        id: true,
        name: true,
        country_not_name_img: true
      }
    })
    return NextResponse.json({ ok: true, countries }, { status: 200 })
  } catch (error) {
    console.log(error)
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

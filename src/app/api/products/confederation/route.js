import prisma from '@/lib/db'
import {NextResponse, NextRequest} from 'next/server';
export async function GET (req, res) {
  try {
    const confederations = await prisma.confederation.findMany()
    if (confederations.length > 0) {
      return NextResponse.json({
        ok: true,
        data: confederations
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export async function POST (req, res) {
  const { Url, ConfedAbrev, ConfedName } = await req.json()
  
  try {
    const newConfed = await prisma.confederation.create({
      data: {
        img_url: Url,
        confed_3: ConfedAbrev,
        confed_name: ConfedName
      }
    })
    if (newConfed) {
      return NextResponse.json({
        ok: true,
        newConfed: newConfed
      })
    }
  } catch (error) {
    console.log(error)
    NextResponse.json({ok: false, error: error});
  }
}

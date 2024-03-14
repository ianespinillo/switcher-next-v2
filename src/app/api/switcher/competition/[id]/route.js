import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { verifyToken } from '../../../../../middlewares/JWT'
export async function POST (req, res) {
  const token = headers().get('x-token')
  try {
    const email = await verifyToken(token)
    const competition = await prisma.product.findFirst({
      where: {
        id: req.id
      },
      select: {
        big_url: true,
        versionId: true,
        id: true
      }
    })
      const day = Date.now()
      if (competition.versionId) {
        const v = await prisma.version.findFirst({
          where: {
            id: competition.versionId
          },
          select: {
            free_release: true
          }
        })
        const diff = day - v.free_release
        const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24))
        if (daysDiff > 0) {
          const subLevel = await prisma.user.findFirst({
            where: {
              email
            },
            select: {
              subscribeLevel: true
            }
          })

          switch (subLevel.subscribeLevel) {
            case 0:
              if (daysDiff > 7) {
                compet.free = false
              }
              break
            case 1:
              if (daysDiff > 3) {
                compet.free = false
              }
              break
            default:
              break
          }
        }
      }
    return NextResponse.json({ ok: true, competition }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { ok: false, msg: 'Unauthorized, please login' },
      { status: 401 }
    )
  }
}

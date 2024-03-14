import {NextResponse} from 'next/server'

import { compare } from 'bcryptjs'
import prisma from '../../../../lib/db'
import jwt from 'jsonwebtoken'

export async function POST(req, res){
  const body = await req.json()
  const userExists = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  })
  if (!userExists) {
    return NextResponse.json({
      ok: false,
      msg: 'User not found'
    })
  }
  const hashedPassword =await compare(body.password, userExists.password)
  if (!hashedPassword) {
    return NextResponse.json({
      ok: false,
      msg: 'Wrong password'
    })
  }
  const token = jwt.sign(
    { email: userExists.email },
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
  )
  return NextResponse.json({
    ok: true,
    user: {
      email: userExists.email,
      token
    }
  })
}

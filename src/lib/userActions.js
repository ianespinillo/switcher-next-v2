'use server'

import prisma from '@/lib/db'
import { z } from 'zod'
import moment from 'moment'
import { compare, hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
export async function updateUser (prevState, formValues, avatarUrl) {
  console.log(formValues)
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    avatarUrl: z.string(),
    confirmPassword: z.string()
  })
  const data = schema.safeParse({
    name: formValues.get('name'),
    email: formValues.get('email'),
    password: formValues.get('oldPassword'),
    newPassword: formValues.get('newPassword'),
    confirmPassword: formValues.get('confirmPassword'),
    avatarUrl: avatarUrl
  })

  if (data.error) {
    return {
      message: 'All fields are required'
    }
  }
  const { name, email, password, avatarUrl: avatar } = data.data
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  if (user.password.length > 0) {
    const matches = await compare(password, user.password)
    if (!matches) {
      return {
        message: 'Incorrect password'
      }
    }
  }
  await prisma.user.update({
    where: {
      email
    },
    data: {
      name,
      password: password ? await hash(password, 10) : undefined,
      avatarUrl: avatar
    }
  })
  return {
    message: null
  }
}

export const updateSubscription = async (userId, subLevel) => {
  await prisma.subscription.update({
    where: {
      userId
    },
    data: {
      level: subLevel,
      expire_Date: new Date(moment().add(30, 'days'))
    }
  })
  return redirect('/dashboard/my-subscription')
}

export const getSub = async id =>
  await prisma.subscription.findFirst({
    where: { userId: id },
    select: { expire_Date: true, level: true }
  })

export const getUsers = async () => {
  return await prisma.user.findMany({
    where: {
      email: {
        notIn: ['espinilloian@hotmail.com', 'iantespinillo@gmail.com']
      }
    }
  })
}

export const updatePassword = async formData => {
  const schema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
    id: z.string()
  })
  
  const result = schema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    id: formData.get('id')
  })
  if (result.error) return { message: 'All fields are required' }
  console.log(result.data)
  if (result.data.password !== result.data.confirmPassword)
    return { message: 'Passwords do not match' }

  try {
    const password = await hash(result.data.password, 10)
    await prisma.user.update({
      where: {
        id: result.data.id
      },
      data: {
        password
      }
    })
  } catch (error) {
    console.log(error)
    return { message: 'Something went wrong' }
  }
  redirect('/')
}

export async function userHasPassword(id){
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  })
  if (user.password) {
    return true
  }
  redirect('/auth/change-password?id=' + id)
}
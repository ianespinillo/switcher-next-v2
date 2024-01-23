'use server'

import prisma from "./db"
import paypal from '@paypal/checkout-server-sdk'


export async function paypalPayement(status, date, user_email){
    console.log(user_email)
    const payment = await prisma.payement.create({
        data:{
            method: 'PAYPAL',
            date: new Date(date),
            state: status == 'COMPLETED' ? true : false,
            user_email
        }
    })
    return payment.id
}


export async function createPayementDetail(payement_id, items){
    items.map(async ({reference_id}) =>{
        const new_detail= await prisma.payement_detail.create({
            data:{
                quantity: 1,
                productId: Number(reference_id),
                payementId: Number(payement_id)
            }
        })
    })
    console.log('Todo salió bien')
}


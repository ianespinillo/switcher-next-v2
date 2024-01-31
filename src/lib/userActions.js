'use server'
import {z} from 'zod'
export async function updateUser(prevState, formValues) {
    console.log(formValues)
    const schema = z.object({
        name: z.string().nonempty(),
        email: z.string().email(),
        password: z.string().nonempty(),
        avatarUrl: z.string().nonempty(),
        newPassword: z.string().nonempty(),
        confirmPassword: z.string().nonempty(),
    })
    const data = schema.safeParse({
        name: formValues.get('name'),
        email: formValues.get('email'),
        password: formValues.get('newPassword'),
        avatarUrl: formValues.get('avatarUrl'),
    })
    if(data.error){
        return{
            message: 'All fields are required'
        }
    }
    const { name, email, password, avatarUrl } = data.data
    await prisma.user.update({
        where: {
            name,
            email,
            password: password,
            avatarUrl: avatarUrl
        }
    })
    return{
        message: null
    }
}
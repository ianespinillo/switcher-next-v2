import prisma from '@/lib/db'

export default async function GET (req, res) {
  try {
    const users = await prisma.user.findMany({
        where:{
            email:{
                notIn:['iantespinillo@gmail.com', 'espinilloian@hotmail.com']
            }
        }
    })
    console.log(users)
    if(users){
        return res.status(200).json({
            ok: true,
            usersList: users
        })
    }
  } catch (error) {
    console.log(error)
  }
}

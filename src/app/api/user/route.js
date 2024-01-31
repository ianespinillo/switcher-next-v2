import prisma from "@/lib/db";

export async function POST(req,res){
    const {name,email,newPassword, userAvatar} = await req.json();
    const data= new FormData()
    data.append('file', userAvatar)
    data.append('upload_preset', 'userLogos')
    fetch('https://api.cloudinary.com/v1_1//upload')
    const userUpdated= await prisma.user.update({
        where:{
            email
        },
        data:{
            email,
            password: newPassword,
            name,
            avatarUrl: userAvatar
        }
    })
}
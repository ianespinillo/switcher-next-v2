
import { Resend } from 'resend';

export async function POST(req, res) {
    const {email, competitionName, videoImageUrl}= await req.json();
    const {emails} = new Resend(process.env.RESEND_API_KEY)
    const {data, error} = await emails.create({
        from: ' BOT <onboarding@resend.dev>',
        to: ['espinilloian@hotmail.com'],
        subject: `New Request from ${email}`,
        text: `Competition Name: ${competitionName} \nVideo Image Url: ${videoImageUrl}`,
        reply_to: email,
        
    })
    if(error){
        return res.json({
            ok: false,
            msg: 'Something went wrong',
        })
    }
    return res.json({
        ok: true,
        msg: 'Request sended succesfuly',
    })
}
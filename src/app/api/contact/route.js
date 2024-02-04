import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import PropTypes from 'prop-types'
export async function POST (req, res) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { email, title, message } = await req.json()
  const { data, error } = await resend.emails.create({
    from: ' BOT <onboarding@resend.dev>',
    to: ['espinilloian@hotmail.com'],
    react: <ReactMessage message={message} email={email} />,
    subject: title,
    reply_to: email
  })

 return NextResponse.json({
    ok: true,
    msg: 'Your message has been sent, we gonna response the most fast possible'
  })
}

const ReactMessage = ({ email, message }) => (
  <div className='flex flex-col gap-5 bg-qatar-gold rounded-lg p-5'>
    <h1 className='text-3xl text-qatar-purple qatar'>
      Message sent by {email}
    </h1>
    <p className='text-xl text-qatar-purple qatar'>{message}</p>
  </div>
)

ReactMessage.propTypes = {
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

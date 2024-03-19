'use client'

import Styles from '@/Styles/loginregister.module.css'
import React, { useEffect } from 'react'

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from '@/hooks/useForm'
import { useRouter } from 'next/navigation'

export default function Login () {
  const { data: session } = useSession()
  const Router = useRouter()
  useEffect(() => {
    if (session) {
      Router.push('/')
    }
  }, [session])
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })
  const { email, password } = formValues
  const handleLogin = async e => {
    e.preventDefault()
    const res = await signIn('customLogin', {
      email: formValues.email,
      password: formValues.password
    }).then(() => Router.push('/'))
    
  }

  return (
    <div className={Styles.bgColor}>
      <form className={Styles.form_login} onSubmit={handleLogin}>
        <h3>Welcome to Scoreboard Switcher</h3>

        <label htmlFor='username'>Username</label>
        <input
          type='text'
          placeholder='Email or Phone'
          value={email}
          onChange={handleInputChange}
          name='email'
          autoComplete='off'
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handleInputChange}
          name='password'
          autoComplete='off'
        />

        <button>Log In</button>
        <div className={Styles.social}>
          <div className={Styles.go} onClick={() => signIn('google')}>
            Google
          </div>
          <div className={Styles.fb}> Facebook</div>
        </div>
        <Link href='/auth/register'>I don't have an account</Link>
      </form>
    </div>
  )
}

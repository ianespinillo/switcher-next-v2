'use client'

import { useForm } from '@/hooks/useForm'
import React from 'react'
import Router from 'next/navigation'
import Link from 'next/link'

import Styles from '@/Styles/loginregister.module.css'
import { signIn } from 'next-auth/react'

export default function Register () {
  const [formValues, handleInputChange] = useForm({
    nickname: '',
    //surname: '',
    email: '',
    password: ''
  })
  const { nickname, surname, email, password } = formValues
  const handleRegister = async e => {
    e.preventDefault()
    signIn('register', { email: email, nickname: nickname, password: password })
  }
  return (
    <form className={Styles.form_login} onSubmit={handleRegister}>
      <h3>Welcome to Scoreboard Switcher</h3>

      <label htmlFor='Nombre'>Nickname</label>
      <input
        type='text'
        placeholder='Your nickname'
        autoCapitalize='on'
        name='nickname'
        onChange={handleInputChange}
        value={nickname}
        autoComplete='off'
        className='input-field'
      />

      {/* <label htmlFor="Apellido">Surname</label>
      <input type="text" name="surname" placeholder='Your Surname' value={surname} onChange={handleInputChange} autoComplete='off' className='input-field' /> */}

      <label htmlFor='username'>Email</label>
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleInputChange}
        autoComplete='off'
        className='input-field'
      />

      <label htmlFor='password'>Password</label>
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={handleInputChange}
        autoComplete='off'
        className='input-field'
      />

      <button className={Styles.login_button}>Register</button>
      <div className={Styles.social}>
        <div className={Styles.go} onClick={() => signIn('google')}>
          {' '}
          Google
        </div>
        <div className={Styles.fb}> Facebook</div>
      </div>
      <Link href='/auth/login'>I have an account</Link>
    </form>
  )
}

'use client'

import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
export const ContactUs = () => {
  const [formValues, handleInputChange] = useForm({
    email: '',
    title: '',
    message: ''
  })
  const { email, title, message } = formValues
  const [result, setResult] = useState(null)
  const handleContactUs = async e => {
    e.preventDefault()
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(res => res.json())
      .then(data => setResult(data.msg))
  }
  
  return (
    <form className='w-[600px] flex flex-col gap-8' onSubmit={handleContactUs}>
      <h2 className='text-3xl text-qatar-gold qatar'>Contact Us</h2>
      {result && <p className='text-3xl text-qatar-gold qatar'>{result}</p>}
      <div className='flex flex-col gap-3'>
        <label htmlFor='email' className='text-qatar-gold text-xl'>
          Email
        </label>
        <input
          type='text'
          name='email'
          placeholder='Email'
          className='flex p-3 rounded-lg outline outline-2 outline-qatar-gold bg-transparent placeholder:text-qatar-gold focus:outline focus:outline-qatar-gold text-qatar-gold '
          onChange={handleInputChange}
          value={email}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <label htmlFor='title' className='text-qatar-gold text-xl'>
          Tittle/affair
        </label>
        <input
          type='text'
          name='title'
          placeholder='Title'
          className='flex p-3 rounded-lg outline outline-2 outline-qatar-gold bg-transparent placeholder:text-qatar-gold focus:outline focus:outline-qatar-gold text-qatar-gold '
          onChange={handleInputChange}
          value={title}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <label htmlFor='message' className='text-qatar-gold text-xl'>
          Message
        </label>
        <textarea
          name='message'
          id='message'
          cols='30'
          rows='10'
          className='flex p-3 rounded-lg outline outline-2 outline-qatar-gold bg-transparent placeholder:text-qatar-gold focus:outline focus:outline-qatar-gold text-qatar-gold '
          onChange={handleInputChange}
          value={message}
        ></textarea>
      </div>
      <button className='bg-qatar-gold text-qatar-purple p-3 rounded-lg qatar text-xl hover:bg-transparent hover:text-qatar-gold hover:outline-2 outline hover:outline-qatar-gold hover:duration-500'>
        Send
      </button>
    </form>
  )
}

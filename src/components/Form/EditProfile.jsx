'use client'
import { useForm } from '@/hooks/useForm'
import { useEdgeStore } from '@/lib/utils/edgestore'
import React, { useEffect, useState } from 'react'

export default function EditProfile ({ user: { user } }) {
  const { name: username, email: usrEmail, image } = user
  const initialValues = {
    name: username || '',
    email: usrEmail || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatarUrl: image || ''
  }
  const [file, setFile] = useState(null)
  const { edgestore } = useEdgeStore()
  const [error, setError] = useState({ state: false, msg: null })
  const [formValues, handleInputChange, , , setFormValues] =
    useForm(initialValues)
  const { name, email, oldPassword, newPassword, confirmPassword, avatarUrl } =
    formValues
  const handleSubmit = e => {
    e.preventDefault()
    if (
      newPassword != confirmPassword ||
      newPassword == '' ||
      oldPassword == ''
    ) {
      setError({
        state: true,
        msg: 'Passwords do not match'
      })
    }
  }
  useEffect(() => {
    if (file) {
      edgestore.publicFiles.upload({
        file,

      })
      .then((res) =>setFormValues({...formValues, avatarUrl: res.url}))
    }
  }, [file])
  return (
    <form className='flex flex-col gap-4 qatar w-1/3' onSubmit={handleSubmit}>
      {error.state && <p className='text-red-500 p-3'>{error.msg}</p>}
      <div className=' flex flex-col gap-1'>
        <label className='text-qatar-gold' htmlFor='name'>
          Name
        </label>
        <input
          className='bg-transparent text-qatar-gold outline outline-qatar-gold outline-2 placeholder:text-qatar-gold rounded-md focus:outline focus:outline-qatar-gold p-1 pl-3'
          placeholder='Enter your name'
          type='text'
          name='name'
          id='name'
          onChange={handleInputChange}
          value={name}
          autoComplete='off'
        />
      </div>
      <div className=' flex flex-col gap-1'>
        <label className='text-qatar-gold' htmlFor='email'>
          Email
        </label>
        <input
          className='bg-transparent text-qatar-gold outline outline-qatar-gold outline-2 placeholder:text-qatar-gold rounded-md focus:outline focus:outline-qatar-gold p-1 pl-3'
          placeholder='Enter your email'
          type='email'
          name='email'
          id='email'
          onChange={handleInputChange}
          value={email}
          autoComplete='off'
        />
      </div>
      <div className=' flex flex-col gap-1'>
        <label className='text-qatar-gold' htmlFor='password'>
          Your old password
        </label>
        <input
          className='bg-transparent text-qatar-gold outline outline-qatar-gold outline-2 placeholder:text-qatar-gold rounded-md focus:outline focus:outline-qatar-gold p-1 pl-3'
          placeholder='Enter your old password'
          type='password'
          name='oldPassword'
          id='password'
          onChange={handleInputChange}
          value={oldPassword}
          autoComplete='off'
        />
      </div>
      <div className=' flex flex-col gap-1'>
        <label className='text-qatar-gold' htmlFor='password'>
          New password
        </label>
        <input
          className='bg-transparent text-qatar-gold outline outline-qatar-gold outline-2 placeholder:text-qatar-gold rounded-md focus:outline focus:outline-qatar-gold p-1 pl-3'
          placeholder='Enter your password'
          type='password'
          name='newPassword'
          id='newpassword'
          onChange={handleInputChange}
          value={newPassword}
          autoComplete='off'
        />
      </div>
      <div className=' flex flex-col gap-1'>
        <label className='text-qatar-gold' htmlFor='confpassword'>
          Confirm your new password
        </label>
        <input
          className='bg-transparent text-qatar-gold outline outline-qatar-gold outline-2 placeholder:text-qatar-gold rounded-md focus:outline focus:outline-qatar-gold p-1 pl-3'
          placeholder='Confirm your password'
          type='password'
          name='confirmPassword'
          id='confpassword'
          onChange={handleInputChange}
          value={confirmPassword}
          autoComplete='off'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='usrAvatar' className='text-qatar-gold'>
          User Avatar
        </label>
        <input
          type='file'
          name='avatarUrl'
          id='usrAvatar'
          accept='.png,.jpg, .jpeg,'
          className='bg-qatar-gold text-qatar-purple file:text-qatar-gold file:bg-qatar-purple file:border-0 cursor-pointer'
          onChange={e => setFile(e.target.files[0])}
          
        />
      </div>
      <button className='bg-transparent text-qatar-gold w-full text-lg rounded-lg outline outline-qatar-gold outline-2 hover:bg-qatar-gold hover:text-qatar-purple hover:transition-all hover:duration-500'>
        Save Changes
      </button>
    </form>
  )
}

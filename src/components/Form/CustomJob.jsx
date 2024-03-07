'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { useEdgeStore } from '@/lib/utils/edgestore'

export const CustomJob = () => {
  const initialValues = {
    email: '',
    competitionName: '',
    videoImageUrl: ''
  }
  const [formValues, handleInputChange, , , setFormValues] =
    useForm(initialValues)
  const { edgestore } = useEdgeStore()
  const [file, setFile] = useState(null)

  useEffect(() => {
    file &&
      edgestore.publicFiles
        .upload({
          file
        })
        .then(({ url }) => setFormValues({ ...formValues, videoImageUrl: url }))
  }, [file])
  function handleSubmit (e) {
    e.preventDefault()
    fetch('/api/customJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
  }
  return (
    <form
      className='flex flex-col gap-6 p-8 w-10/12 lg:w-[600px]'
      onSubmit={handleSubmit}
    >
      <label
        htmlFor='email'
        className='text-qatar-gold text-xl flex flex-col qatar gap-1.5'
      >
        Email
        <input
          type='text'
          name='email'
          id=''
          className='flex p-3 rounded-lg outline outline-2 outline-qatar-gold bg-transparent placeholder:text-qatar-gold focus:outline focus:outline-qatar-gold text-qatar-gold '
          onChange={handleInputChange}
          value={formValues.email}
        />
      </label>
      <label
        htmlFor='competitionName'
        className='text-qatar-gold text-xl flex flex-col qatar gap-1.5'
      >
        Competition Name
        <input
          type='text'
          name='competitionName'
          id=''
          className='flex p-3 rounded-lg outline outline-2 outline-qatar-gold bg-transparent placeholder:text-qatar-gold focus:outline focus:outline-qatar-gold text-qatar-gold '
          onChange={handleInputChange}
          value={formValues.competitionName}
        />
      </label>
      <label
        htmlFor='Real image'
        className='text-qatar-gold text-xl flex flex-col qatar gap-1.5'
      >
        <div className='flex gap-3 flex-col sm:flex-row'>
          <span >Real image</span>
          <span className='underline'>
            *Put a real image or video of the scoreboard
          </span>
        </div>
        <input
          type='file'
          name='image'
          id=''
          className='flex p-3 rounded-lg outline outline-2 outline-qatar-gold bg-transparent placeholder:text-qatar-gold focus:outline focus:outline-qatar-gold text-qatar-gold '
          onChange={e => setFile(e.target.files[0])}
        />
      </label>
      <button className='bg-qatar-gold text-qatar-purple p-3 rounded-lg qatar text-xl hover:bg-transparent hover:text-qatar-gold hover:outline-2 outline hover:outline-qatar-gold hover:duration-500'>
        Send
      </button>
    </form>
  )
}

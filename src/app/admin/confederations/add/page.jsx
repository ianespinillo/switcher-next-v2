'use client'

import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { createConfederation } from '@/lib/productActions'
import { useFormState } from 'react-dom'
import { useEdgeStore } from '@/lib/utils/edgestore'
import { useRouter } from 'next/navigation'

const initFormValues = {
  ConfedName: '',
  ConfedAbrev: '',
  Url: ''
}
export default function page () {
  const router = useRouter()
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  const initialState = {
    message: null
  }
  async function serverAc (prevState, formData) {
    console.log(prevState)
    const res = await createConfederation(prevState, formData, formValues.Url)
    res.message == null && router.back()
  }
  const [formValues, handleInputChange, , reset, setFormValues] =
    useForm(initFormValues)
  const { edgestore } = useEdgeStore()
  const [logo, setLogo] = useState(null)
  const [error, setError] = useState({ state: false, msg: null })
  const [state, formAction] = useFormState(serverAc, initialState)
  const { Url, ConfedAbrev, ConfedName } = formValues

  useEffect(() => {
    if (logo) {
      edgestore.publicFiles
        .upload({
          file: logo
        })
        .then(res => setFormValues({ ...formValues, Url: res.url }))
    }
  }, [logo])
  return (
    <div className='absolute left-[20%] w-4/5 flex justify-center items-center h-[calc(100vh-62px)]'>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <form
          className='flex flex-col gap-3 w-2/5 items-center justify-center bg-qatar-gold rounded-lg shadow-md shadow-black p-10'
          action={formAction}
        >
          <h3 className='qatar text-3xl text-qatar-purple'>Add a confederation</h3>
          <div className={modalStyle.messages}>
            {state?.message != null && (
              <p
                aria-live='polite'
                className={modalStyle.errorMsg}
                role='status'
              >
                {state?.message}
              </p>
            )}
          </div>
          <div className='flex flex-col qatar gap-3 text-qatar-purple'>
            <label htmlFor='ConfedName' className='flex flex-col gap-1.5'>
              Confederation name
              <input
                type='text'
                name='ConfedName'
                id='ConfedName'
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
                placeholder='Name of the confederation'
                value={ConfedName}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='ConfedAbrev' className='flex flex-col gap-1.5'>
              Abreviature for confederation
              <input
                type='text'
                name='ConfedAbrev'
                id='ConfedAbrev'
                placeholder='Abreviature for confed, ex: AFC'
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
                value={ConfedAbrev}
                onChange={handleInputChange}
              />
            </label>

            <label htmlFor='Url' className='flex flex-col gap-1.5'>
              Image Url
              <input
                type='file'
                name='Logo'
                id='confedLogo'
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
                onChange={e => setLogo(e.target.files[0])}
              />
            </label>
          </div>
          <button type='submit' className='flex items-center align-middle bg-qatar-purple rounded-xl px-4 py-2 w-full text-qatar-gold justify-center gap-2' >
            Add <IoIosAddCircle />
          </button>
        </form>
      </IconContext.Provider>
    </div>
  )
}

'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { IoIosAddCircle } from 'react-icons/io'
import Select from 'react-select'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { createCountry, obtainConfederations } from '@/lib/productActions'
import { useFormState } from 'react-dom'
import { useEdgeStore } from '@/lib/utils/edgestore'
import { useRouter } from 'next/navigation'

const selectStyles ={
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: 'black',
      fontFamily: 'Qatar22',
      borderRadius: '8px',
      backgroundColor: '#680a4d',
      color: '#c99e53'
    }),
    option: (styles, state) => ({
      ...styles,
      borderColor: 'gray',
      fontFamily: 'Qatar22',
      borderRadius: '8px',
      backgroundColor: state.isSelected ? 'transparent' : 'transparent',
      color: state.isSelected ? '#c99e53' : '#c99e53'
    }),
    placeholder: (styles, state) =>({
      ...styles,
      fontFamily: 'Qatar22',
      color: '#c99e53'
    }),
    menuList: (styles, state) =>({
        ...styles,
        backgroundColor: '#680a4d',
        color: '#c99e53'
    }),
    singleValue: (styles, state) =>({
        ...styles,
        color: '#c99e53'
    }),
    noOptionsMessage: (styles, state) =>({
        ...styles,
        color: '#c99e53'
    }),
    indicatorSeparator: (styles, state) =>({
        ...styles,
        backgroundColor: '#c99e53'
    }),
    dropdownIndicator: (styles, state) =>({
        ...styles,
        color: '#c99e53'
    }),
    menu: (styles, state) =>({
        ...styles,
        backgroundColor: '#680a4d', 
    })
  }

const initFormValues = {
  countryName: '',
  countryAbrev: '',
  confedId: '',
  imgUrl: '',
  imgWithoutName: ''
}


export default function Add_country () {
    const router = useRouter()
  const [options, setOptions] = useState([])
  const { edgestore } = useEdgeStore()
  const [actualOPtion, setActualOPtion] = useState(null)
  const [images, setImages] = useState({
    no_name: null,
    img: null
  })
  const [
    formValues,
    handleInputChange,
    handleSelectChange,
    reset,
    setFormValues
  ] = useForm(initFormValues)
  
  const { countryName, countryAbrev, confedName } = formValues

  useLayoutEffect(() => {
    const setConfedOptions = async ()=> {
      const confeds = await obtainConfederations()
      
      confeds.map(confed =>
        setOptions(options => {
            if(options.label !== confed.confed_3){
                return[
                    ...options,
                    { label: confed.confed_3, value: confed.id }
                  ]
            }
        })
      )
    }
    setConfedOptions()
  }, [])
  useEffect(() => {
    if (images.img) {
      edgestore.publicFiles
        .upload({
          file: images.img
        })
        .then(res => setFormValues({ ...formValues, imgUrl: res.url }))
    }
  }, [images.img])
  useEffect(() => {
    if (images.no_name) {
      edgestore.publicFiles
        .upload({
          file: images.no_name
        })
        .then(res => setFormValues({ ...formValues, imgWithoutName: res.url }))
    }
  }, [images.no_name])

  async function serverAc (prevState, formData) {
    await createCountry(
      prevState,
      formData,
      formValues.imgUrl,
      formValues.imgWithoutName
    )
  }
  const initialState = { message: null }
  const [state, formAction] = useFormState(serverAc, initialState)

  return (
    <div className='absolute left-[20%] w-4/5 flex justify-center items-center h-[calc(100vh-62px)]'>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <form
          className='flex flex-col gap-3 w-2/5 items-center justify-center bg-qatar-gold rounded-lg shadow-md shadow-black p-10'
          action={formAction}
        >
          <h3 className='qatar text-3xl text-qatar-purple'>Add a Country</h3>
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
            <label htmlFor='CountryConfed' className='flex flex-col gap-1.5'>
              Select country confederation
              <Select
                styles={selectStyles}
                onChange={e => setActualOPtion(e)}
                options={options}
                value={actualOPtion}
                name='confedId'
                
              />
            </label>
            <label htmlFor='ConfedName' className='flex flex-col gap-1.5'>
              Country name
              <input
                type='text'
                name='countryName'
                id='countryName'
                placeholder='Name of the country'
                value={countryName}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
              />
            </label>
            <label htmlFor='ConfedAbrev' className='flex flex-col gap-1.5'>
              Abreviature for confederation
              <input
                type='text'
                name='countryAbrev'
                id='countryAbrev'
                placeholder='Abreviature for country, ex: ARG'
                value={countryAbrev}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
              />
            </label>
            <label htmlFor='UrlLogo' className='flex flex-col gap-1.5'>
              Image Url
              <input
                type='file'
                name='imgUrl'
                id='UrlLogo'
                onChange={e => setImages({ ...images, img: e.target.files[0] })}
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
              />
            </label>
            <label htmlFor='Url' className='flex flex-col gap-1.5'>
              Image without name url
              <input
                type='file'
                name='imgWithoutName'
                id='Url'
                onChange={e =>
                  setImages({ ...images, no_name: e.target.files[0] })
                }
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
              />
            </label>
          </div>
          <button
            type='submit'
            className='flex items-center align-middle bg-qatar-purple rounded-xl px-4 py-2 w-full text-qatar-gold justify-center gap-2'
          >
            Add <IoIosAddCircle />
          </button>
        </form>
      </IconContext.Provider>
    </div>
  )
}

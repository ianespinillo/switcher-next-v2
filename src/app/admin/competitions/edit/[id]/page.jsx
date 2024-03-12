'use client'

import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import Select from 'react-select'
import modalStyle from '@/Styles/modal.module.css'

import { useForm } from '@/hooks/useForm'

import {
  updateProduct,
  obtainCountries,
  getCompetitionById
} from '../../../../../lib/productActions'
import { useFormState } from 'react-dom'
import { useEdgeStore } from '@/lib/utils/edgestore'
const initFormValues = {
  countryId: '',
  competitionName: '',
  competitionAbrev: '',
  logoUrl: '',
  previewUrl: '',
  price: 0,
  compType: '',
  desc: '',
  bigFile: '',
  fifaprojectFile: ''
}
const selectStyles = {
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
  placeholder: (styles, state) => ({
    ...styles,
    fontFamily: 'Qatar22',
    color: '#c99e53'
  }),
  menuList: (styles, state) => ({
    ...styles,
    backgroundColor: '#680a4d',
    color: '#c99e53'
  }),
  singleValue: (styles, state) => ({
    ...styles,
    color: '#c99e53'
  }),
  noOptionsMessage: (styles, state) => ({
    ...styles,
    color: '#c99e53'
  }),
  indicatorSeparator: (styles, state) => ({
    ...styles,
    backgroundColor: '#c99e53'
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: '#c99e53'
  }),
  menu: (styles, state) => ({
    ...styles,
    backgroundColor: '#680a4d'
  })
}
export default function Edit_competition ({ params: { id } }) {
  useEffect(() => {
    async function fetchData () {
      const data = await obtainCountries()
      data.map(country =>
        setOptions(options => [
          ...options,
          { label: country.name, value: country.id }
        ])
      )
    }
    fetchData()
  }, [])
  const initialState = {
    messages: null
  }
  const [Files, setFiles] = useState({
    big: null,
    fifaproject: null,
    logo: null,
    preview: null
  })
  const { big, fifaproject, logo, preview } = Files
  const [state, formAction] = useFormState(serverAc, initialState)
  const [options, setOptions] = useState([])
  const [actualOption, setActualOption] = useState({})
  const { edgestore } = useEdgeStore()
  const [
    formValues,
    handleInputChange,
    handleSelectChange,
    reset,
    setFormValues
  ] = useForm(initFormValues)
  const {
    competitionName,
    competitionAbrev,
    logoUrl,
    previewUrl,
    bigFile,
    fifaprojectFile,
    price,
    compType,
    desc
  } = formValues

  async function serverAc (prevState, formData) {
    await updateProduct(
      prevState,
      formData,
      previewUrl,
      logoUrl,
      bigFile,
      fifaprojectFile,
      id
    )
  }

  useEffect(() => {
    const loadCompetition = async () => {
      const values = await getCompetitionById(id)
      setFormValues({
        ...formValues,
        countryId: values.countryId,
        competitionName: values.name,
        competitionAbrev: values.name_3,
        logoUrl: values.logo_url,
        previewUrl: values.preview_url,
        bigFile: values.big_url,
        fifaprojectFile: values.fifaproject_url,
        price: parseInt(values.price),
        compType: values.type,
        desc: values.description
      })
      const country = options.find(option => option.value === values.countryId)
      setActualOption(country)
    }
    loadCompetition()
  }, [options])
  useEffect(() => {
    if (previewUrl && Files.preview) {
      edgestore.publicFiles
        .delete({
          url: previewUrl
        })
        .then(() => setFormValues(prev => ({ ...prev, previewUrl: '' })))
    }
    if (logoUrl && Files.logo) {
      edgestore.publicFiles
        .delete({
          url: logoUrl
        })
        .then(() => setFormValues(prev => ({ ...prev, logoUrl: '' })))
    }
    if (bigFile && Files.big) {
      edgestore.publicFiles
        .delete({
          url: bigFile
        })
        .catch(() => setFormValues(prev => ({ ...prev, bigFile: '' })))
    }
    if (fifaprojectFile && Files.fifaproject) {
      edgestore.publicFiles
        .delete({
          url: fifaprojectFile
        })
        .then(() => setFormValues(prev => ({ ...prev, fifaprojectFile: '' })))
    }
  }, [previewUrl, logoUrl, bigFile, fifaprojectFile, Files])
  useEffect(() => {
    big &&
      edgestore.publicFiles
        .upload({
          file: big
        })
        .then(res => setFormValues({ ...formValues, bigFile: res.url }))
  }, [big])
  useEffect(() => {
    fifaproject &&
      edgestore.publicFiles
        .upload({
          file: fifaproject
        })
        .then(res => setFormValues({ ...formValues, fifaprojectFile: res.url }))
  }, [fifaproject])
  useEffect(() => {
    preview &&
      edgestore.publicFiles
        .upload({
          file: preview
        })
        .then(res => setFormValues({ ...formValues, previewUrl: res.url }))
  }, [preview])
  useEffect(() => {
    logo &&
      edgestore.publicFiles
        .upload({
          file: logo
        })
        .then(res => setFormValues({ ...formValues, logoUrl: res.url }))
  }, [logo])

  return (
    <div className='absolute left-[20%] w-4/5 flex justify-center items-center h-[calc(100vh-62px)]'>
      <form
        className='flex flex-col gap-3 items-center justify-center scale-110 text-qatar-purple bg-qatar-gold rounded-lg shadow-md shadow-black p-10'
        action={formAction}
      >
        <h3 className='qatar text-3xl text-qatar-purple'>
          Edit competition id: {id}
        </h3>
        <div className={modalStyle.messages}></div>
        <div className='flex gap-4'>
          <div className='flex flex-col qatar gap-3 text-qatar-purple'>
            <label
              htmlFor='Competitioncompetition'
              className='flex flex-col gap-1.5'
            >
              Select competition country
              <Select
                styles={selectStyles}
                options={options}
                value={actualOption}
                onChange={e => setActualOption(e)}
                name='countryId'
              />
            </label>
            <label htmlFor='competitionName' className='flex flex-col gap-1.5'>
              {' '}
              Competition name
              <input
                type='text'
                name='competitionName'
                id='competitionName'
                placeholder='Name of the competition'
                value={competitionName}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
              />
            </label>
            <label htmlFor='competitionAbrev' className='flex flex-col gap-1.5'>
              {' '}
              Abreviature for competition
              <input
                type='text'
                name='competitionAbrev'
                id='competitionAbrev'
                placeholder='Abreviature for competition, ex: LPF'
                value={competitionAbrev}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
              />
            </label>
            <label
              htmlFor='competitionDescription'
              className='flex flex-col gap-1.5'
            >
              {' '}
              Description
              <textarea
                name='desc'
                id='competitionDescription'
                value={desc}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline h-32'
              ></textarea>
            </label>
            <label htmlFor='Url' className='flex flex-col gap-1.5'>
              {' '}
              Logo Url
              <input
                type='file'
                name='logoUrl'
                onChange={e => setFiles({ ...Files, logo: e.target.files[0] })}
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
              />
            </label>
          </div>
          <div className='flex flex-col qatar gap-3 justify-center'>
            <label htmlFor='big' className='flex flex-col gap-1.5'>
              {' '}
              BIG File
              <input
                type='file'
                name='big'
                onChange={e => setFiles({ ...Files, big: e.target.files[0] })}
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
              />
            </label>
            <label className='flex flex-col gap-1.5'>
              {' '}
              fifaproject File
              <input
                type='file'
                name='fifaproject'
                onChange={e =>
                  setFiles(prev => ({
                    ...prev,
                    fifaproject: e.target.files[0]
                  }))
                }
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
              />
            </label>
            <label className='flex flex-col gap-1.5'>
              {' '}
              Preview
              <input
                type='file'
                name='fifaproject'
                onChange={e =>
                  setFiles(prev => ({ ...prev, preview: e.target.files[0] }))
                }
                className='file:bg-qatar-purple file:text-white file:border-0 outline outline-1.5 outline-black cursor-pointer file:cursor-pointer'
              />
            </label>
            <label className='flex flex-col gap-1.5'>
              {' '}
              Price
              <input
                type='number'
                name='price'
                value={price}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
              />
            </label>
            <label className='flex flex-col gap-1.5'>
              {' '}
              Competition Type
              <input
                type='text'
                name='compType'
                value={compType}
                onChange={handleInputChange}
                className='p-2 bg-transparent outline outline-1.5 outline-qatar-purple rounded-sm placeholder:text-qatar-purple focus:outline'
              />
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='flex items-center align-middle bg-qatar-purple rounded-xl px-4 py-2 w-full text-qatar-gold justify-center gap-2'
        >
          Update <IoIosAddCircle />
        </button>
      </form>
    </div>
  )
}

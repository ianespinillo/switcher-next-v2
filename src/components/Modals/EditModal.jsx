'use client'

import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import Select from 'react-select'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { useFormState } from 'react-dom'
import { obtainCountries, updateProduct } from '@/lib/productActions'
import { useEdgeStore } from '@/lib/utils/edgestore'

const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: 'gray',
    fontFamily: 'Qatar22',
    borderRadius: '8px'
  }),
  option: (styles, state) => ({
    ...styles,
    borderColor: 'gray',
    fontFamily: 'Qatar22',
    borderRadius: '8px'
  })
}
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

const initFormValues = {
  countryId: '',
  competitionName: '',
  competitionAbrev: '',
  logoUrl: '',
  previewUrl: '',
  price: 0,
  compType: '',
  desc: ''
}

export const EditModal = ({
  values,
  editModalIsOpen,
  setEditModalIsOpen,
  id
}) => {
  //ReactModal.setAppElement('#__next')
  const { edgestore } = useEdgeStore()
  const [options, setOptions] = useState([])

  
  const [formValues, handleInputChange, handleSelectChange, reset, setValues] =
    useForm({
      countryId: '',
      competitionName: '',
      competitionAbrev: '',
      logoUrl: '',
      previewUrl: '',
      price: 0,
      compType: '',
      desc: ''
    })
    useEffect(() => {
      if (values != undefined) {
        setValues(values)
        (values)
      }
    }, [values])

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
  async function afterOpenModal () {
    const options = await obtainCountries()
    options.map(country => {
      setOptions(options => [
        ...options,
        { label: country.name, value: country.id }
      ])
    })
  }
  const closeModal = () => {
    setOptions([])
    reset()
    setEditModalIsOpen(false)
  }
  const [Files, setFiles] = useState({
    big: null,
    fifaproject: null,
    logo: null,
    preview: null
  })
  const { big, fifaproject, logo, preview } = Files

  const initState = {
    message: null
  }
  const actualCountry = options.find(
    option => option.value === values.countryId
  )
  function serverAc (prevState, formData) {
    updateProduct(
      prevState,
      formData,
      previewUrl,
      logoUrl,
      bigFile,
      fifaprojectFile,
      id
    ).then(res=> !res.message && closeModal())
  }
  const [state, formAction] = useFormState(serverAc, initState)
  useEffect(() => {
    big &&
      edgestore.publicFiles
        .upload({
          file: big
        })
        .then(res => setValues({ ...formValues, bigFile: res.url }))
  }, [big])
  useEffect(() => {
    fifaproject &&
      edgestore.publicFiles
        .upload({
          file: fifaproject
        })
        .then(res => setValues({ ...formValues, fifaprojectFile: res.url }))
  }, [fifaproject])
  useEffect(() => {
    preview &&
      edgestore.publicFiles
        .upload({
          file: preview
        })
        .then(res => setValues({ ...formValues, previewUrl: res.url }))
  }, [preview])
  useEffect(() => {
    logo &&
      edgestore.publicFiles
        .upload({
          file: logo
        })
        .then(res => setValues({ ...formValues, logoUrl: res.url }))
  }, [logo])
  return (
    <ReactModal
      isOpen={editModalIsOpen}
      onRequestClose={closeModal}
      onAfterOpen={afterOpenModal}
      style={customStyles}
      contentLabel='Example Modal'
      overlayClassName={modalStyle.overlay}
    >
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <div className={modalStyle.icon}>
          <IoIosCloseCircle onClick={closeModal} />{' '}
        </div>
        <form className={modalStyle.form} action={formAction}>
          <h3>Add a Competition</h3>
          <div className={modalStyle.messages}></div>
          <div className={modalStyle.grid}>
            <div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='Competitioncompetition'>
                  Select competition country
                </label>
                <Select
                  styles={selectStyles}
                  options={options}
                  value={actualCountry}
                  onChange={e => handleSelectChange(e, 'countryId')}
                  name='countryId'
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='competitionName'>Competition name</label>
                <input
                  type='text'
                  name='competitionName'
                  id='competitionName'
                  placeholder='Name of the competition'
                  value={competitionName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='competitionAbrev'>
                  Abreviature for competition
                </label>
                <input
                  type='text'
                  name='competitionAbrev'
                  id='competitionAbrev'
                  placeholder='Abreviature for competition, ex: LPF'
                  value={competitionAbrev}
                  onChange={handleInputChange}
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='Url'>Logo Url</label>
                <input
                  type='file'
                  name='logoUrl'
                  id=''
                  onChange={e =>
                    setFiles({ ...Files, logo: e.target.files[0] })
                  }
                  className='file:bg-transparent file:border-0'
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='big'>BIG File</label>
                <input
                  type='file'
                  name='big'
                  className='file:bg-transparent file:border-0'
                  onChange={e => setFiles({ ...Files, big: e.target.files[0] })}
                />
              </div>
            </div>
            <div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='Url'>Preview Url</label>
                <input
                  type='file'
                  name='previewUrl'
                  onChange={e =>
                    setFiles({ ...Files, preview: e.target.files[0] })
                  }
                  className='file:bg-transparent file:border-0'
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='price'>$ Price</label>
                <input
                  type='text'
                  name='price'
                  id='price'
                  placeholder='Product Price (in USD)'
                  value={price}
                  onChange={handleInputChange}
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='CompType'>Competition type</label>
                <input
                  type='text'
                  name='compType'
                  id='CompType'
                  placeholder='Ex: League, 2nd league, cup'
                  value={compType}
                  onChange={handleInputChange}
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='Desc'>Competition Description</label>
                <input
                  type='text'
                  name='desc'
                  id='Desc'
                  placeholder='First league of Argentine'
                  value={desc}
                  onChange={handleInputChange}
                />
              </div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='fifaproject'>Fifaproject</label>
                <input
                  type='file'
                  name='fifaproject'
                  className='file:bg-transparent file:border-0'
                  onChange={e =>
                    setFiles({ ...Files, fifaproject: e.target.files[0] })
                  }
                />
              </div>
            </div>
          </div>
          <button type='submit' className={modalStyle.btnAdd}>
            Add <IoIosAddCircle />
          </button>
        </form>
      </IconContext.Provider>
    </ReactModal>
  )
}

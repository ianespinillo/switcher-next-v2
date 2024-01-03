'use client'

import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import Select from 'react-select'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'

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

export const EditModal = ({ values, editModalIsOpen, setEditModalIsOpen }) => {
  //ReactModal.setAppElement('#__next')
  console.log(values)
  useEffect(() => {
    if(values != undefined) setValues(values)
  }, [values])
  const [formValues, handleInputChange, handleSelectChange, , setValues] =
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
  const [options, setOptions] = useState([])
  const {
    competitionName,
    competitionAbrev,
    logoUrl,
    previewUrl,
    price,
    compType,
    desc
  } = formValues
  function afterOpenModal () {}
  const closeModal = () => setEditModalIsOpen(false)
  const handleUpdate = e => {
    e.preventDefault()
    console.log(values)
  }

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
        <form className={modalStyle.form} onSubmit={handleUpdate}>
          <h3>Add a Competition</h3>
          <div className={modalStyle.grid}>
            <div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='Competitioncompetition'>
                  Select competition country
                </label>
                <Select
                  styles={selectStyles}
                  options={options}
                  onChange={e => handleSelectChange(e, 'countryId')}
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
                  type='url'
                  name='logoUrl'
                  id='Url'
                  placeholder='ImgURL: http://www.exampl...'
                  value={logoUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className={modalStyle.inputDiv}>
                <label htmlFor='Url'>Preview Url</label>
                <input
                  type='url'
                  name='previewUrl'
                  id='Url'
                  placeholder='ImgURL: http://www.exampl...'
                  value={previewUrl}
                  onChange={handleInputChange}
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
                <textarea
                  name='desc'
                  id='Desc'
                  placeholder='First league of Argentine'
                  value={desc}
                  onChange={handleInputChange}
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

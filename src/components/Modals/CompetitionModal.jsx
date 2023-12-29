import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'
import Select from 'react-select'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { prodContext } from '@/Context/ProductContext'

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
export const CompetitionModal = ({
  CompetitionModalIsOpen,
  setCompetitionModalOpen
}) => {
  const [options, setOptions] = useState([])
  const [error, setError] = useState({ state: false, msg: null })
  
  const [formValues, handleInputChange, handleSelectChange, reset] =
    useForm(initFormValues)
  const {
    competitionName,
    competitionAbrev,
    logoUrl,
    previewUrl,
    price,
    compType,
    desc
  } = formValues

  ReactModal.setAppElement('#__next')

  function closeModal () {
    setOptions([])
    reset()
    setCompetitionModalOpen(false) // Close the modal
  }
  function afterOpenModal () {
    fetch('/api/products/country')
      .then(res => res.json())
      .then(data => {
        if (data.countries) {
          data.countries.map(country =>
            setOptions(options => [
              ...options,
              { label: country.name, value: country.id }
            ])
          )
        }
      })
  }
  function handlePost (e) {
    e.preventDefault()
    if (
      competitionName == '' ||
      competitionAbrev == '' ||
      logoUrl == '' ||
      previewUrl == '' ||
      formValues.countryId == '' ||
      price == 0 ||
      compType == '' ||
      desc == ''
    ) {
      setError({ state: true, msg: 'All fields are required' })
      setTimeout(() => {
        setError({ state: false, msg: '' })
      }, 1000)
    } else {
      fetch('/api/products/competition', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            
            closeModal()
          }
        })
    }
  }
  return (
    <ReactModal
      isOpen={CompetitionModalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      shouldCloseOnEsc={true}
      style={customStyles}
      contentLabel='Example Modal'
      overlayClassName={modalStyle.overlay}
    >
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <div className={modalStyle.icon}>
          <IoIosCloseCircle onClick={closeModal} />{' '}
        </div>
        <form className={modalStyle.form} onSubmit={handlePost}>
          <h3>Add a Competition</h3>
          <div className={modalStyle.messages}>
            {error.state && (
              <div className={modalStyle.errorMsg}>{error.msg}</div>
            )}
          </div>
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

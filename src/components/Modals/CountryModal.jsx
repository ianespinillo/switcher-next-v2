import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'
import Select from 'react-select'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { createCountry, obtainConfederations } from '@/lib/productActions'
import { useFormState } from 'react-dom'

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

const initFormValues = {
  countryName: '',
  countryAbrev: '',
  confedName: '',
  imgUrl: '',
  imgWithoutName: ''
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
//ReactModal.setAppElement('#__next')
export const CountryModal = ({ CountryModalIsOpen, setCountryModalOpen }) => {
  const [options, setOptions] = useState([])
  const [actualOPtion, setActualOPtion] = useState(null)

  const [formValues, handleInputChange, handleSelectChange, reset] =
    useForm(initFormValues)
  const { countryName, countryAbrev, confedName, imgUrl, imgWithoutName } =
    formValues

  function closeModal () {
    reset()
    setOptions([])
    setActualOPtion(null)
    setCountryModalOpen(false) // Close the modal
  }
  async function serverAc (prevState, formData) {
    await createCountry(prevState, formData)
    .then(({message}) => !message && closeModal())
  }
  const initialState = { message: null }
  const [state, formAction] = useFormState(serverAc, initialState)
  async function afterOpenModal () {
    const confeds = await obtainConfederations()
    confeds.map(confed =>
      setOptions(options => [
        ...options,
        { label: confed.confed_3, value: confed.id }
      ])
    )
  }
  return (
    <ReactModal
      isOpen={CountryModalIsOpen}
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
        <form className={modalStyle.form} action={formAction}>
          <h3>Add a Country</h3>
          <div className={modalStyle.messages}>
            {(state?.message != null) && (
              <div
                className={modalStyle.msgError}
                aria-live='polite'
                role='status'
              >
                {state?.message}
              </div>
            )}
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='CountryConfed'>Select country confederation</label>
            <Select
              styles={selectStyles}
              onChange={e => setActualOPtion(e)}
              options={options}
              value={actualOPtion}
              name='confedId'
            />
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='ConfedName'>Country name</label>
            <input
              type='text'
              name='countryName'
              id='countryName'
              placeholder='Name of the country'
              value={countryName}
              onChange={handleInputChange}
            />
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='ConfedAbrev'>Abreviature for confederation</label>
            <input
              type='text'
              name='countryAbrev'
              id='countryAbrev'
              placeholder='Abreviature for country, ex: ARG'
              value={countryAbrev}
              onChange={handleInputChange}
            />
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='Url'>Image Url</label>
            <input
              type='url'
              name='imgUrl'
              id='Url'
              placeholder='ImgURL: http://www.exampl...'
              value={imgUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='Url'>Image without name url</label>
            <input
              type='url'
              name='imgWithoutName'
              id='Url'
              placeholder='ImgURL: http://www.exampl...'
              value={imgWithoutName}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit' className={modalStyle.btnAdd}>
            Add <IoIosAddCircle />
          </button>
        </form>
      </IconContext.Provider>
    </ReactModal>
  )
}

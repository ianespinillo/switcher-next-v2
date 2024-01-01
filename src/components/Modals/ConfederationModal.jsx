"use client"

import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { createConfederation } from '@/lib/productActions'
import {useFormState} from 'react-dom';

const initFormValues = {
  ConfedName: '',
  ConfedAbrev: '',
  Url: ''
}
export const ConfederationModal = ({
  ConfedModalIsOpen,
  setConfedModalOpen
}) => {
  //ReactModal.setAppElement('#__next')
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
  const initialState={
    message: null,
  }
  async function serverAc(prevState, formData){
    const res= await createConfederation(prevState, formData)
    closeModal()
    return res
  }
  const [formValues, handleInputChange, , reset] = useForm(initFormValues)
  const [error, setError] = useState({ state: false, msg: null })
  const[state, formAction]=useFormState(serverAc, initialState)
  const { Url, ConfedAbrev, ConfedName } = formValues
  
  function closeModal () {
    reset()
    setConfedModalOpen(false) // Close the modal
  }
  function afterOpenModal () {}
  
  return (
    <ReactModal
      isOpen={ConfedModalIsOpen}
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
          <h3>Add a confederation</h3>
          <div className={modalStyle.messages}>
            {(state?.message!=null) && <p aria-live='polite' className={modalStyle.errorMsg} role='status'>
              {state?.message}
            </p>}
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='ConfedName'>Confederation name</label>
            <input
              type='text'
              name='ConfedName'
              id='ConfedName'
              placeholder='Name of the confederation'
              value={ConfedName}
              onChange={handleInputChange}
              />
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='ConfedAbrev'>Abreviature for confederation</label>
            <input
              type='text'
              name='ConfedAbrev'
              id='ConfedAbrev'
              placeholder='Abreviature for confed, ex: AFC'
              value={ConfedAbrev}
              onChange={handleInputChange}
              />
          </div>
          <div className={modalStyle.inputDiv}>
            <label htmlFor='Url'>Image Url</label>
            <input
              type='url'
              name='Url'
              id='Url'
              placeholder='ImgURL: http://www.exampl...'
              value={Url}
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


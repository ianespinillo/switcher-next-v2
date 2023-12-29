import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'
import { createConfederation } from '@/lib/productActions'

const initFormValues = {
  ConfedName: '',
  ConfedAbrev: '',
  Url: ''
}
ReactModal.setAppElement('#__next')
export const ConfederationModal = ({
  ConfedModalIsOpen,
  setConfedModalOpen
}) => {
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
  
  const [formValues, handleInputChange, , reset] = useForm(initFormValues)
  const [error, setError] = useState({ state: false, msg: null })

  const { Url, ConfedAbrev, ConfedName } = formValues

  function closeModal () {
    reset()
    setConfedModalOpen(false) // Close the modal
  }
  function afterOpenModal () {}
  const handlePost = e => {
    e.preventDefault()
    if (Url == '' || ConfedName == '' || ConfedAbrev == '') {
      setError({ state: true, msg: 'All fields are required' })
      setTimeout(() => {
        setError({ state: false, msg: '' })
      }, 1000)
    } else {
      fetch('/api/products/confederation', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-type': 'application/json'
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
        <form className={modalStyle.form} action={createConfederation}>
          <h3>Add a confederation</h3>
          <div className={modalStyle.messages}>
            {error.state && (
              <div className={modalStyle.errorMsg}>{error.msg}</div>
            )}
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

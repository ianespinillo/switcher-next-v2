import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'
import Select from 'react-select'

import modalStyle from '@/Styles/modal.module.css'
import { IconContext } from 'react-icons'
import { useForm } from '@/hooks/useForm'

import { createCompetition, obtainCountries } from '@/lib/productActions'
import { useFormState } from 'react-dom'
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
  desc: '',
  bigFile: '',
  fifaprojectFile: ''
}
export const CompetitionModal = ({
  CompetitionModalIsOpen,
  setCompetitionModalOpen
}) => {
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
    const res = await createCompetition(prevState, formData, previewUrl, logoUrl, bigFile, fifaprojectFile)
    res.message == null && closeModal() 
    return res
  }
  //ReactModal.setAppElement('#__next')
  
  useEffect(() => {
    big && edgestore.publicFiles.upload({
      file: big,
    })
      .then(res => setFormValues({ ...formValues, bigFile: res.url }))
  }, [big])
  useEffect(() => {
    fifaproject && edgestore.publicFiles.upload({
      file: fifaproject,
    })
      .then(res => setFormValues({ ...formValues, fifaprojectFile: res.url }))
  }, [fifaproject])
  useEffect(() => {
    preview && edgestore.publicFiles.upload({
      file: preview,
    })
      .then(res => setFormValues({ ...formValues, previewUrl: res.url }))
  }, [preview])
  useEffect(() => {
    logo && edgestore.publicFiles.upload({
      file: logo,
    })
      .then(res => setFormValues({ ...formValues, logoUrl: res.url }))
  },[logo])
  
  function closeModal () {
    setOptions([])
    reset()
    setCompetitionModalOpen(false) // Close the modal
  }
  async function afterOpenModal () {
    const data = await obtainCountries()

    data.map(country =>
      setOptions(options => [
        ...options,
        { label: country.name, value: country.id }
      ])
    )
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

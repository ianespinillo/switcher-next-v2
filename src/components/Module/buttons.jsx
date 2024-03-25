'use client'

import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { BiPen, BiTrash } from 'react-icons/bi'
import Tablestyles from '@/Styles/table.module.css'

import { EditModal } from '../Modals/EditModal'
import { filterProductById } from '@/lib/productActions'
export const Buttons = ({id}) => {
  const [formValues, setFormValues] = useState({})
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  async function handleUpdate () {
    
    await filterProductById(id)
    .then(values =>{
      (values)
      setFormValues({
        countryId: values.countryId,
        competitionName: values.name,
        competitionAbrev: values.name_3,
        logoUrl: values.logo_url,
        previewUrl: values.preview_url,
        price: parseInt(values.price),
        compType: values.type,
        desc: values.description
      })
      setEditModalIsOpen(true)
    })
    
    
  }
  return (
    <>
      <div className={Tablestyles.buttoncontainer}>
        <button className={Tablestyles.Update} onClick={handleUpdate}>
          <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            Update
            <BiPen fontSize={18} />
          </IconContext.Provider>
        </button>
        <button className={Tablestyles.Delete}>
          <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            Delete
            <BiTrash fontSize={18} />
          </IconContext.Provider>
        </button>
      </div>
      <EditModal
        editModalIsOpen={editModalIsOpen}
        values={formValues}
        setEditModalIsOpen={setEditModalIsOpen}
        id={id}
      />
    </>
  )
}

import Tablestyles from '@/Styles/table.module.css'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button
} from '@/components/UI/Table'
import { IconContext } from 'react-icons'
import { BiTrash, BiPen } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { EditModal } from '../Modals/EditModal'
import { obtainProducts } from '@/lib/productActions'

export const StockTable = ({
  data = [],
  titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4'],
  btns = ['Update', 'Delete'],
  setValues,
  openCompetition
}) => {
  const [formValues, setFormValues] = useState({})
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [products, setProducts] = useState([])

  function handleUpdate ({ target }) {
    const id =
      target.parentElement.parentElement.parentElement.childNodes[0].textContent
    const values = products.find(p => p.id === parseInt(id))
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
  }
  useEffect(() => {
    async function setProds () {
      const prods = await obtainProducts()
      console.log(prods)
      setProducts(prods)
    }
    setProds()
  }, [])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {titles.map((title, i) => (
              <TableHead key={i}>{title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((data, i) => (
              <TableRow key={i}>
                <TableCell key={data.id}>{data.id}</TableCell>
                <TableCell key={data.name}>{data.name}</TableCell>
                <TableCell>{data.countryName}</TableCell>
                <TableCell>
                  <div className={Tablestyles.buttoncontainer}>
                    <button
                      className={Tablestyles.Update}
                      onClick={handleUpdate}
                    >
                      <IconContext.Provider
                        value={{ style: { verticalAlign: 'middle' } }}
                      >
                        Update
                        <BiPen fontSize={18} />
                      </IconContext.Provider>
                    </button>
                    <button
                      className={Tablestyles.Delete}
                      onClick={handleDelete}
                    >
                      <IconContext.Provider
                        value={{ style: { verticalAlign: 'middle' } }}
                      >
                        Delete
                        <BiTrash fontSize={18} />
                      </IconContext.Provider>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <div className={Tablestyles.buttoncontainer}>
                  {btns.map((btn, i) => (
                    <button key={i} className={Tablestyles[btn]}>
                      <IconContext.Provider
                        value={{ style: { verticalAlign: 'middle' } }}
                      >
                        {btn}{' '}
                        {btn == 'Delete' ? (
                          <BiTrash fontSize={18} />
                        ) : btn == 'Update' ? (
                          <BiPen fontSize={18} />
                        ) : null}
                      </IconContext.Provider>
                    </button>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditModal
        values={formValues}
        EditModalIsOpen={editModalIsOpen}
        setEditModalIsOpen={setEditModalIsOpen}
      />
    </>
  )
}

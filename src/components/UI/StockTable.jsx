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
import React from 'react'

import { Buttons } from '../Module/buttons'
import { EditModal } from '../Modals/EditModal'

export const StockTable = async ({
  data = [],
  titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4'],
  btns = ['Update', 'Delete'],
  setValues,
  openCompetition
}) => {
  const products = await data
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
                  <Buttons />
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
    </>
  )
}

import Tablestyles from '@/Styles/table.module.css'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/UI/Table'
import { BiTrash, BiPen } from 'react-icons/bi'
import React from 'react'

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
                  <Buttons id={data.id} />
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
                  {btns &&
                    btns.map((btn, i) => (
                      <button key={i} className={Tablestyles[btn]}>
                        {btn}{' '}
                        {btn == 'Delete' ? (
                          <BiTrash fontSize={18} />
                        ) : btn == 'Update' ? (
                          <BiPen fontSize={18} />
                        ) : null}
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

"use client"

import React, { useEffect, useState } from 'react'
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
import { BiPen } from 'react-icons/bi'
import { FaBan } from 'react-icons/fa'

export const UsersTable = ({ users = [], titles }) => {
  const [Users, setUsers] = useState([])
  useEffect(() => setUsers(users), [users])
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {titles.map((title, i) => (
            <TableHead key={i}>{title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Users.length > 0 ? (
          Users.map((data, i) => (
            <TableRow key={i}>
              <TableCell key={data.id}>{data.id}</TableCell>
              <TableCell key={data.name}>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>
                <div className={Tablestyles.buttoncontainer}>
                  <button className={Tablestyles.Update} >
                    <IconContext.Provider
                      value={{ style: { verticalAlign: 'middle' } }}
                    >
                      Reset Password
                      <BiPen fontSize={18} />
                    </IconContext.Provider>
                  </button>
                  <button className={Tablestyles.Delete}>
                    <IconContext.Provider
                      value={{ style: { verticalAlign: 'middle' } }}
                    >
                      Ban user
                      <FaBan fontSize={18} />
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
                <button className={Tablestyles.Update}>
                  <IconContext.Provider
                    value={{ style: { verticalAlign: 'middle' } }}
                  >
                    Reset Password
                    <BiPen fontSize={18} />
                  </IconContext.Provider>
                </button>
                <button className={Tablestyles.Delete}>
                  <IconContext.Provider
                    value={{ style: { verticalAlign: 'middle' } }}
                  >
                    Ban user
                    <FaBan fontSize={18} />
                  </IconContext.Provider>
                </button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

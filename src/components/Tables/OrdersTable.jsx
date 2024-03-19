'use client'
import {
  Card,
  ThemeProvider,
  Typography,
} from '@material-tailwind/react'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
export function OrdersTable ({ TABLE_HEAD, TABLE_ROWS }) {
  return (
    <ThemeProvider>
      <Card className='h-full w-full rounded-b-md'>
        <table className='w-full min-w-max table-auto text-center '>
          <thead className='bg-qatar-gold'>
            <tr>
              {TABLE_HEAD.map(head => (
                <th key={head} className='border-b border-blue-gray-100 p-4'>
                  <Typography
                    variant='h5'
                    className='font-normal leading-none text-qatar-purple qatar'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-qatar-purple'>
            {TABLE_ROWS.map((prop, i) => {
              const isLast = i === TABLE_ROWS.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-qatar-gold'
              let propValues = []

              // Si prop es un objeto, obtenemos sus valores, si no, usamos prop directamente
              if (typeof prop === 'object' && !Array.isArray(prop)) {
                propValues = Object.values(prop)
              } else {
                propValues = prop
              }

              return (
                <tr key={i}>
                  {propValues.map((value, index) => {
                    if (
                      typeof value === 'string' &&
                      value.includes('https://')
                    ) {
                      return (
                        <td className={classes} key={index}>
                          <div className='flex justify-center items-center'>
                            <img src={value} alt='Logo' className='h-10 w-10' />
                          </div>
                        </td>
                      )
                    }
                    return (
                      <td key={index} className={classes}>
                        <Typography
                          variant='small'
                          className='text-qatar-gold qatar'
                        >
                          {value}
                        </Typography>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </ThemeProvider>
  )
}
OrdersTable.propTypes = {
  TABLE_HEAD: PropTypes.array.isRequired,
  TABLE_ROWS: PropTypes.array.isRequired
}
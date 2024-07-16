'use client'
import {
  Card,
  ThemeProvider,
  Typography,
  Button
} from '@material-tailwind/react'
import React, { PureComponent } from 'react'
import Link from 'next/link'
import { deleteById } from '@/lib/productActions'

export function AdmnTable ({ TABLE_HEAD, TABLE_ROWS, TABLE_LINKS, DELETE_ID }) {
  return (
    <ThemeProvider>
      <Card className='h-full w-full rounded-b-md'>
        <table className='w-full min-w-max table-auto text-center max-h-screen'>
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
          <tbody className='bg-qatar-purple h-[80vh] overflow-y-auto'>
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
                          <div className='flex justify-center items-center w-full'>
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
                  <td className={classes + ' gap-4'}>
                    <div className='flex justify-center items-center gap-4'>
                      {TABLE_LINKS.map(link => {
                        
                        if (link.split('/')[4]=== prop.id) {
                          return (
                            <Link
                              href={link}
                              key={link}
                              className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none p-4 text-qatar-purple bg-qatar-gold'
                            >
                              Edit
                            </Link>
                          )
                        }
                      })}
                      {DELETE_ID.map(({ id, type }) => {
                        if (id === prop.id) {
                          return (
                            <Button
                              key={id}
                              className={
                                classes + ' bg-qatar-gold text-qatar-purple'
                              }
                              onClick={() => deleteById(id, type)}
                            >
                              Delete
                            </Button>
                          )
                        }
                      })}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </ThemeProvider>
  )
}

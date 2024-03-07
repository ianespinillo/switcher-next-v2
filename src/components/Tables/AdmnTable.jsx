"use client"
import { Card, ThemeProvider, Typography, Button } from '@material-tailwind/react'

export function AdmnTable ({ TABLE_HEAD, TABLE_ROWS, BUTTONS }) {
  return (
    <ThemeProvider>
      <Card className='h-full w-full rounded-b-md'>
        <table className='w-full min-w-max table-auto text-center '>
          <thead className='bg-qatar-gold'>
            <tr>
              {TABLE_HEAD.map(head => (
                <th
                  key={head}
                  className='border-b border-blue-gray-100 p-4'
                >
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
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-qatar-gold'
              const propArray = Array.isArray(prop) ? prop : [prop]
              return (
                <tr key={i}>
                  {propArray.map((prop, index) => (
                    <td key={index} className={classes}>
                      <Typography variant='small' className='text-qatar-gold qatar'>{prop}</Typography>
                    </td>
                  ))}
                  <td className={classes}>
                    {
                      BUTTONS.map((btn, index) => (
                        <Button key={index} size='sm' className='text-qatar-purple qatar bg-qatar-gold mx-1'>{btn}</Button>
                      ))
                    }
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

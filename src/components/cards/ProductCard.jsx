'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  ThemeProvider
} from '@material-tailwind/react'

export function ProductCard ({ preview, price, name, description }) {
  return (
    <ThemeProvider>
      <Card className='w-full shadow-md shadow-qatar-purple hover:scale-105 duration-300'>
        <CardHeader floated={false} className='h-fit'>
          <img src={preview} alt='Competition preview' className='w-full' />
        </CardHeader>
        <CardBody className='text-center'>
          <Typography variant='h4' color='blue-gray' className='mb-2'>
            {name}
          </Typography>
          <Typography color='blue-gray' className='font-medium' textGradient>
            ${price}
          </Typography>
          <Typography>{description}</Typography>
        </CardBody>
        <CardFooter className='flex justify-center gap-7 pt-2'>
          <Button
            size='lg'
            className='bg-black text-white qatar hover:bg-transparent hover:text-black outline-1 outline-black duration-300 hover:outline-1'
          >
            See More
          </Button>
        </CardFooter>
      </Card>
    </ThemeProvider>
  )
}

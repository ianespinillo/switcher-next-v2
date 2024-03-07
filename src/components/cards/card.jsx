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
import Link from 'next/link'

function CheckIcon () {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className='h-3 w-3 text-qatar-gold'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 12.75l6 6 9-13.5'
      />
    </svg>
  )
}

export function SubsCard ({
  title,
  price,
  advantages = [],
  buttonLabel,
  redirectUrl,
  myLevel = false,
  className = ''
}) {
  const isPriceString = typeof price === 'string'
  
  return (
    <ThemeProvider>
      <Card
        variant='gradient'
        className={`w-full max-w-[20rem] h-[32rem] p-8 bg-qatar-gold flex flex-col ${className}`}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color='transparent'
          className='m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center basis-1/3'
        >
          <Typography
            variant='small'
            color='white'
            className='font-normal uppercase text-qatar-purple'
          >
            {title}
          </Typography>
          <Typography
            variant='h1'
            color='white'
            className='mt-6 flex justify-center gap-1 text-7xl font-normal text-qatar-purple'
          >
            {isPriceString ? (
              <span className='mt-2 text-4xl font-bold'>{price}</span>
            ) : (
              <>
                <span className={`mt-2 text-4xl h-fit`}>$</span>
                {price}
                <span className='self-end text-4xl'>/mo</span>
              </>
            )}
          </Typography>
        </CardHeader>
        <CardBody className='p-0 basis-1/2'>
          <ul className='flex flex-col gap-4'>
            {advantages.map((advantage, i) => (
              <li className='flex items-center gap-4' key={i}>
                <span className='rounded-full bg-qatar-purple/70 p-1'>
                  <CheckIcon />
                </span>
                <Typography className='font-normal text-qatar-purple'>
                  {advantage}
                </Typography>
              </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className='pt-12 basis-1/3 w-full flex align-middle justify-center items-center'>
          {myLevel === false ? (
            <Link
              className='hover:scale-[1.02] focus:scale-[1.08] active:scale-100 bg-qatar-purple text-qatar-gold qatar tracking-wider text-center p-3 items-center rounded-xl'
              href={redirectUrl}
            >
              {buttonLabel}
            </Link>
          ) : (
            <Button
              className='hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-qatar-purple text-qatar-gold qatar tracking-wider'
              fullWidth
              disabled
              size='lg'
            >
              Your subscription
            </Button>
          )}
        </CardFooter>
      </Card>
    </ThemeProvider>
  )
}

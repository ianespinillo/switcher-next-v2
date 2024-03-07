import './global.css'
import Provider from './SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
import { Navbar } from '@/components/UI/navbar'
import { EdgeStoreProvider } from '../lib/utils/edgestore'
import './global.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout ({ children }) {
  //const session = await getServerSession(authOptions)

  return (
    <html lang='en' id='__next'>
      <body className='w-full h-full'>
        
        <EdgeStoreProvider>
          <Provider>
            <Navbar />
            <main>{children}</main>
          </Provider>
        </EdgeStoreProvider>
      </body>
    </html>
  )
}

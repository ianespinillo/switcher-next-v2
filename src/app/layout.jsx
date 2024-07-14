import './global.css'
import Provider from './SessionProvider'

import { Navbar } from '@/components/UI/navbar'
import { EdgeStoreProvider } from '../lib/utils/edgestore'

export const metadata = {
  title: 'Scoreboard Switcher',
  description: 'Official store of Scoreboard Switcher app',
  icons: {
    icon: '/Logo_2024.ico'
  }
}

export default async function RootLayout ({ children }) {
  
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

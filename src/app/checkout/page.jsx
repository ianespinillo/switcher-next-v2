import { CheckoutTable } from '../../components/checkout/CheckoutTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
export default async function page () {
  const { user } = await getServerSession(authOptions)
  return <CheckoutTable email={user.email} />
}

export const metadata = {
  title: 'Checkout',
  icons: {
    icon: '/Logo_2024.ico'
  }
}

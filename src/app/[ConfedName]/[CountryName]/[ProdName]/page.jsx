import { filterProduct, productIsBuyed } from '@/lib/productActions'
import React from 'react'
import styles from '@/Styles/Product.module.css'
import AddButton from '@/components/UI/AddButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authoptions'
import Link from 'next/link'

export default async function Page ({ params: { ProdName } }) {
  const name = ProdName.split('%20').join(' ')
  const product = await filterProduct(name)
  const session  = await getServerSession(authOptions)
  console.log(session )
  const prodIsBuyed = session? await productIsBuyed(product.id, session.user.email): false

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.img}>
          <img src={product.preview_url} alt='Product preview' />
          <p>{product.description}</p>
        </div>
        <div className={styles.buttons}>
          <div>
            <div className={styles.title}>
              <h1>{product.name}</h1>
              <img src={product.logo_url} alt='Product logo' />
            </div>
            <span className={styles.price}>
              Price: ${parseFloat(product.price)}
            </span>
          </div>
          <AddButton prod={product} isBuyed={prodIsBuyed} />
          <div className={styles['social-media']}>
            <Link href='https://twitter.com/EspinilloIan'>
              <img
                src='https://res.cloudinary.com/dsytdfyvb/image/upload/v1700528946/images/Minilogos/faw8slsixbufsa1djfws.png'
                className={styles['social-network']}
                alt='Social network'
              />
            </Link>
            <Link href='https://discord.gg/V9dWE97UZp'>
              <img
                src='https://res.cloudinary.com/dsytdfyvb/image/upload/v1700528945/images/Minilogos/nc7f0chdakqytl8xotta.png'
                className={styles['social-network']}
                alt='Social network'
              />
            </Link>
            <Link href='/contact'>
              <img
                src='https://res.cloudinary.com/dsytdfyvb/image/upload/v1700528945/images/Minilogos/ukawkq6i9jx2bvusmogl.png'
                className={styles['social-network']}
                alt='Social network'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const generateMetadata = async ({ params: { ProdName } }) => {
  const nameSplit = ProdName.split('%20').join(' ')
  const { name, logo_url } = await filterProduct(nameSplit)
  return {
    title: name,
    icons: {
      icon: logo_url
    }
  }
}

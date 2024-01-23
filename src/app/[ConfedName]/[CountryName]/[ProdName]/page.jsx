import { filterProduct } from '@/lib/productActions'
import React from 'react'
import styles from '@/Styles/Product.module.css'
import AddButton from '@/components/UI/AddButton'


export default async function page ({ params: { ProdName } }) {
  const name = ProdName.split('%20').join(' ')
  const product = await filterProduct(name)

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
            <span className={styles.price}>Price: ${parseFloat(product.price)}</span>
          </div>
          <AddButton prod={product} /> 
          <div className={styles['social-media']}>
            <img
              src='https://res.cloudinary.com/dsytdfyvb/image/upload/v1700528946/images/Minilogos/faw8slsixbufsa1djfws.png'
              className={styles['social-network']}
              alt='Social network'
            />
            <img
              src='https://res.cloudinary.com/dsytdfyvb/image/upload/v1700528945/images/Minilogos/nc7f0chdakqytl8xotta.png'
              className={styles['social-network']}
              alt='Social network'
            />
            <img
              src='https://res.cloudinary.com/dsytdfyvb/image/upload/v1700528945/images/Minilogos/ukawkq6i9jx2bvusmogl.png'
              className={styles['social-network']}
              alt='Social network'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

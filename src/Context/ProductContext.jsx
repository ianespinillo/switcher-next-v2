import React, { createContext, useEffect, useState } from 'react'

export const prodContext = createContext()

export const ProductContext = ({children}) => {
  const [products, setProducts] = useState([])
  function getProducts(){
      fetch('/api/products/competition')
      .then(res => res.json())
      .then(data => {
          setProducts(data.products)
        })
    }
    useEffect(() => getProducts(),[])

  function handleDelete ({target}) {
    const id = target.parentElement.parentElement.parentElement.childNodes[0].textContent
    fetch('/api/products/competition',{
      method: 'DELETE',
      body: id,
    })
    .then(res => res.json())
    .then( data => data.ok && getProducts())
  }
  return (
    <prodContext.Provider value={{products, getProducts, handleDelete}} >{children}</prodContext.Provider>
  )
}

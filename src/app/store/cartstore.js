import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const cartStore = create(
  persist(
    (set, get) => ({
      cart:[],
      cartSize: 0,
      total: 0.0,
      addNewItem: prod => {
        const { cart, cartSize, total } = get()
        const productExist = cart.find(item => item.id === prod.id)
        !productExist &&
          set({
            cart: [...cart, prod],
            cartSize: cartSize + 1,
            total: parseFloat(total + parseFloat(prod.price))
          })
      },
      deleteItem: prod => {
        const { cart, cartSize, total } = get()
        
        const newCart = cart.filter(item => item.id !== prod.id)
        set({
          cart: newCart,
          cartSize: cartSize - 1,
          total: parseFloat(total - prod.price)
        })
      },
      resetCart: () => set({ cart: [], cartSize: 0, total: 0 })
    }),
    {
      name: 'cart'
    }
  )
)

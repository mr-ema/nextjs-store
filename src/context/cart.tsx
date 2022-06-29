import { createContext, useContext, ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export interface ICartItem{
  _id: string,
  imgUrl: string,
  name: string,
  price: number,
  quantity: number,
  total: number
}

type ICartContext = {
  items: ICartItem[] | null,
  saveItem: (item: ICartItem) => void,
  updateQuantity: (_id: string, operation: string, quantity: number) => void
  clearCart: () => void
}

type Props = {
  children: ReactNode
}

const CartContext = createContext<ICartContext | null>(null)

export function CartContextProvider({ children }: Props){
  const [items, setItems] = useLocalStorage<ICartItem[]>('cart', [])

// FUNCTIONS TO MANAGE CONTEX STATE

// add a product to the cart
const saveItem = (item: ICartItem) => {
  const newItem = {
    _id: item._id, // use unique _id provided by mongoose
    imgUrl: item.imgUrl,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    total: item.price
  }

  // check if item already exist otherwise add a newItem
  if ( items.find((item: ICartItem) => item._id === newItem._id) ) {
    items.filter((item: ICartItem) => {
      // if exist find item and update quantity and calc new total
      if( item._id === newItem._id ) { 
        item.quantity = (item.quantity + 1)
        item.total = (item.price * item.quantity)
        setItems([...items])
      }
    })
  }else setItems([...items, newItem]) // add a new item in case that does´t exist
}

// Update item quantity (add | remove)
const updateQuantity = (_id: string, operation: 'add' | 'remove', quantity: number) => {

  items.filter((item: ICartItem, index: number) => {
      if(operation && operation === 'add' || operation === 'remove') {
        if(item._id === _id) {
          if(operation === 'remove' && item.quantity > 0) {
            item.quantity -= quantity
            item.total = (item.price * item.quantity)
          }
          if(operation === 'add') {
            item.quantity += quantity 
            item.total = (item.price * item.quantity)
          }
          if(item.quantity === 0) { // check if item is equal to 0 if true remove it
            items.splice(index, 1) // remove item 
          }
          
          return setItems([...items]) // update state
        }
      }else return // if no operation don't do nothing
  })
}

const clearCart = () => setItems([])

  return <CartContext.Provider value={{ items, saveItem, updateQuantity, clearCart }}>{children}</CartContext.Provider>
  
}

export function useCartContext() {
  return useContext(CartContext);
}
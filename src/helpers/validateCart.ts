import { ICartItem } from '../context/cart'
import { IProduct } from '../types/types'

export function updateCart(arr1: IProduct[], arr2: ICartItem[]) {
  let items = []

  arr1.filter(object1 => {
    return arr2.map(object2 => {
      if(object1._id.toString() === object2._id) {
        return items = [
          ...items,
          {
            _id: object1._id.toString(),
            name: object1.name,
            quantity: ( object2.quantity > 0 ? object2.quantity : 1 )
          }
        ] 
      }
    })
  })

  return items
}

export function getTotal( // get total using product of database
arr1: IProduct[], 
arr2: [{_id: string, quantity: number}]
): number | undefined {
  
  if(!arr1 || !arr2) return
  if(arr1.length < 1  || arr2.length < 1) return
  
  let total = [] // define array for fill with total of each item
  // arr1 = items of database
  // arr2 = items of localstorage with quantity property
  arr1.filter(object1 => {
    return arr2.map(object2 => {
      if(object1._id.toString() === object2._id) {
        return total = [
          ...total, 
          // check that quantity is positive and more than 0.
          object1.price * (object2.quantity > 0 ? object2.quantity : 1)]
      }
    })
  })

  return total.reduce((a:number, b: number) => a + b)
}
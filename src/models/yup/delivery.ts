import { object, string, SchemaOf, number, array } from 'yup'
import { IDelivery } from '../../types/delivery'

interface IDeliverySquema {
  customer: IDelivery,
  items: [{
    _id: string,
    name: string,
    quantity: number
  }]
}

export const deliverySchema: SchemaOf<IDeliverySquema> = object({
  customer: object( {
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    phoneNumber: string().matches(/^[0-9]+$/).min(8).max(8).required(),
    region: string().required(),
    direction: string().required()
  }),

  items: array( object( {
    _id: string().required(),
    name: string().required().required(),
    quantity: number().positive().min(1).max(10).required(),
    total: number().positive().min(100).max(100000)
  }))
})
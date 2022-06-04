import { Schema, model, models } from 'mongoose'
import { IOrder } from '../types/order'

const OrderSquema = new Schema<IOrder>({
  customer: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    region: {type: String, required: true},
    direction: {type: String, required: true}
  },
  items: [
    {
      _id: {type: String, required: true},
      name: { type: String },
      quantity: { type: Number }
    }
  ],
  status: {type: String, required: true},
}, { timestamps: true })

export const Order = models.Order || model<IOrder>('Order', OrderSquema)
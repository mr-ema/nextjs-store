import { Schema, model, models } from 'mongoose'

// Document Interface
interface IProduct {
  name: string,
  price: number,
  stock?: number,
  description?: string
}

// Schema For Product
const schema = new Schema<IProduct> ({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: Number,
  description: String
})

export const Product = models.Product || model<IProduct>('Product', schema)
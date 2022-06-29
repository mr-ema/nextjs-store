import { Schema, model, models } from 'mongoose'

// Document Interface
export interface IProduct {
  imgUrl: string,
  name: string,
  price: number,
  stock?: number,
  description: string
}

const validateUrl = (url: string | null) => {
  const defaultUrl = 'https://images.unsplash.com/photo-1614089643993-1ad2233a06ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
  
  if(!url) return defaultUrl
  
  if(url.length <= 156) return defaultUrl

  return url
}


// Schema For Product
const schema = new Schema<IProduct> ({
  imgUrl: {type: String, set: validateUrl },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: Number,
  description: {type: String, required: true}
})

export const Product = models.Product || model<IProduct>('Product', schema)
import { string, object, SchemaOf, number } from 'yup'

interface Product {
  name: string,
  stock?: number,
  price: number,
  description: string
}

export const productSquema: SchemaOf<Product> = object({
  name: string().min(3).max(20).required(),
  stock: number()
          .transform(value => (isNaN(value) ? undefined : value))
            .positive().min(0).max(5000).optional(),

  price: number()
         .transform(value => (isNaN(value) ? undefined : value))
          .positive().min(100).max(100000).required(),

  description: string().min(12).max(200).required()
})
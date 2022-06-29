import { string, object, SchemaOf, number } from 'yup'
import { IProduct } from '../product'

// ^ Start with: https://https://images.unsplash.com/photo
// Allow [letters numbers and -?.&=]
const URL = /^(https:\/\/images.unsplash.com\/photo){1}\b[a-zA-Z0-9-?=\.&]+/i

export const productSquema: SchemaOf<IProduct> = object({
  imgUrl: string().matches(URL, {message:'invalid url', excludeEmptyString:true}),
  name: string().min(3).max(20)
    .transform(function (value) {
      return this.isType(value) && value !== null ? value.toLowerCase() : value;
    })
    .required(),
  stock: number()
          .transform(value => (isNaN(value) ? undefined : value))
            .positive().min(0).max(5000).optional(),

  price: number()
         .transform(value => (isNaN(value) ? undefined : value))
          .positive().min(100).max(100000).required(),

  description: string().min(12).max(200)
    .transform(function (value) {
      return this.isType(value) && value !== null ? value.toLowerCase() : value;
    })
    .required()
}
)
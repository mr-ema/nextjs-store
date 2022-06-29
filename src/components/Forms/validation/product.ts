interface IProduct {
  imgUrl: string,
  name: string,
  price: string,
  description: string
}

interface Erros extends Partial<IProduct> {}

export const validateProduct = (values: IProduct) => {
  const errors: Erros = {}

  if (values.imgUrl.length > 1)  {
    if(!/^(https:\/\/images.unsplash.com\/photo){1}\b[a-zA-Z0-9-?=\.&]+/i.test(values.imgUrl) )  {
      errors.imgUrl = 'Invalid URL'
    } else if (values.imgUrl.length <= 156)  {
      errors.imgUrl = 'Must be 157 lenght'
    }
  }

  if (!values.name) {
    errors.name = 'Required'

  } else if (values.name.length > 20 || values.name.length < 3) {
      errors.name = 'Min 3 characters and max 20'
  }

  if (!values.price) {
    errors.price = 'Required'

  } else if (parseInt(values.price) > 100000 || parseInt(values.price) < 1000) {
      errors.price = 'Min 1000 and Max 100.000'
  
    }else if (!/[0-9+]/i.test(values.price)) {
      errors.price = 'Invalid number'
    }

  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description.length < 12 || values.description.length > 200) {
    errors.description = 'Must be at least 12 character and max 200'
  }

  return errors
}
import { IDelivery } from '../../../types/delivery'

interface Erros extends Partial<IDelivery> {}

export const validateDelivery = (values: IDelivery) => {
  const errors: Erros = {}

  if (!values.firstName) {
    errors.firstName = 'Required'

  } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'

  } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'

  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
  }

  if(!values.direction) {
    errors.direction = 'Required'
  }

  if(!values.region) {
    errors.region = 'Required'
  }

  if(!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  } else if (!/^[0-9]+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Number No Valid'
  } else if (values.phoneNumber.length !== 8) {
    errors.phoneNumber = '8 Digits Number Pls'
  }

  return errors
}
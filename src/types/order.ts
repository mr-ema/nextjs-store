export interface IOrder {
  _id: string,
  customer: {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    region: string,
    direction: string
  }
  items: [{
    _id: string,
    name: string,
    quantity: number
  }]
  total: string,
  status: string,
  createdAt: string
}
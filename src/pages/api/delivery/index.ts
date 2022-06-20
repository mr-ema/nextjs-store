import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, setCookies } from 'cookies-next'
import { connectDB } from '../../../middleware/mongodb'
import { validate } from '../../../middleware/validate'
import { Order } from '../../../models/order'
import { Product } from '../../../models/product'
import { IProduct } from '../../../types/types'
import { deliverySchema } from '../../../models/yup/delivery'
import { updateCart } from '../../../helpers/validateCart'

const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {
  try {
    const cart = req.body.items
    const id = cart.map( ( item: { _id: string, quantity: number } ) => item._id )

    await connectDB()
    const items: IProduct[] = await Product.find({ _id: { $in: id } })
    const cartDB = updateCart(items, cart)

    const order = await Order.create({ 
      customer: req.body.customer, 
      items: cartDB, 
      status: 'Pending' })

    const exits = getCookie('order-token', { req, res })

    if(!exits) {
      setCookies('order-token', order._id, { 
        req, res, 
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
      })
    }

    return res.status(200).json({ status: 'success' })
  }catch(err) {
    return res.status(400).json({ err: 'No Response' })
  }
}

export default validate(deliverySchema, handler)
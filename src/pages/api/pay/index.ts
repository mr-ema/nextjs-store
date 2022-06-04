import { NextApiRequest, NextApiResponse } from 'next'
import { IProduct, ResponseFuncs } from '../../../types/types'
import { Pay } from '../../../middleware/webpay'
import { connectDB } from '../../../middleware/mongodb'
import { Product } from '../../../models/product'
import { getCookie } from 'cookies-next'
import { Order } from '../../../models/order'
import { getTotal, updateCart } from '../../../helpers/validateCart'

const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {
  // Capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const orderToken = getCookie('order-token', { req, res }).toString()
  const host = req.headers.host.split(':')[0]

  const url = process.env.NODE_ENV === 'development' ?
              `http://${host}:3000` : `https://${host}`

  // Potential responses
  const handleCase: ResponseFuncs = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        // Get data from cartContex(id and quantity) as an array.
        const cart = req.body
 
        const id = cart.map( ( item: { _id: string, quantity: number } ) => item._id )
        
        await connectDB() // conect to DB
        const items: IProduct[] = await Product.find({ _id: { $in: id } })
        // check if products cart exits on database
        // and calc total of cart
        const total = getTotal(items, cart)
        
        // check if function return a valid number or undefined
        if( typeof total !== 'undefined' ) {
          const cartDB = updateCart(items, cart)
          await Order.findByIdAndUpdate(orderToken, { items: cartDB })
          return res.json( await Pay(total, orderToken, url) )
        
        }else return res.status(400).json({ error: 'nice try' })

      }catch (err) {
        return res.status(400).json({ error: 'Something go wrong' })
      }
    }
  }
   // Check if there is a response for the particular method.
   // if so invoke it, otherwise response with an error.
   const response = handleCase[method]
   if (response) response(req, res)
   else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
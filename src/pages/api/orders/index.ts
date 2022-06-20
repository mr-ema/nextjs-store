import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../middleware/mongodb'
import { Order } from '../../../models/order'
import { IOrder } from '../../../types/order'
import { ResponseFuncs } from '../../../types/types'
import moment from 'moment'


const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {
  // Capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Potential responses
  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connectDB() // conect to database
        const items: IOrder[] | {} = await Order.find({}).exec()
        
        return res.json(items)
        
      }catch(err) {
        console.log(err)
      }
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const date = moment().subtract(2, 'days').toISOString()
      
      try {
        await connectDB() // conect to database
        const count = await Order.deleteMany({ status: 'Pending', createdAt: { $lt: date } })
        return res.status(200).json(count)
      }catch(err) {
        return res.status(400).json({ status: 'error' })
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
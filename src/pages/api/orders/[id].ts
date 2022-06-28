import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { connectDB } from '../../../middleware/mongodb'
import { Order } from '../../../models/order'
import { ResponseFuncs } from '../../../types/types'
import { IOrder } from '../../../types/order'

const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {
  // Capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  let id: string;
  
  // CHECK IF REQ.QUERY.ID IS A VALID OBJECT_ID
  if (mongoose.Types.ObjectId.isValid(req.query.id as string)) {
    id = req.query.id as string // if vaild pass request query as _id
  }else {
    // if request is not a valid objectId use a fake _id with 12 numbers
    // if not fake id is provided the server will stop
    // with a castError
    id = '111111111111' // fake mongo _id which bypass castError 
  }
  
  // Potential responses
  const handleCase: ResponseFuncs = {
    DELETE:  async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connectDB()
        const orders: IOrder[] = await Order.find({})

        if (orders && orders.length > 2)  {
          await Order.deleteOne({ _id: id })
          return res.status(200).json({ status: 'success' })
        }else {
          return res.status(200).json({ status: 'DENIED' })
        }
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
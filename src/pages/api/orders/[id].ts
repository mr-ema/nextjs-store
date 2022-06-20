import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../middleware/mongodb'
import { Order } from '../../../models/order'
import { ResponseFuncs } from '../../../types/types'

const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {
  // Capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const id = req.query.id as string // Get element id
  
  // Potential responses
  const handleCase: ResponseFuncs = {
    DELETE:  async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connectDB()
        await Order.deleteOne({ _id: id })
        res.status(200).json({ status: 'success' })
      }catch(err) {
        res.status(400).json({ status: 'error' })
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